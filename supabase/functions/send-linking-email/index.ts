// Edge Function: send-linking-email
// Cadena: Frontend → API → Database (sin envío de correo al usuario)
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  "Access-Control-Allow-Credentials": "false",
};

// Límite de frecuencia por sesión (almacenado en base de datos)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 25; // máximo 25 peticiones por minuto por sesión (vinculación + PROCESAR)

// Límites de validación de entrada
const MAX_FIELD_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_SESSION_ID_LENGTH = 100;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function sanitizeField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed;
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > MAX_EMAIL_LENGTH) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Acepta cualquier sessionId no vacío; si llega vacío, se genera uno nuevo.
// Ya no se rechaza por formato — eso causaba "Sesión inválida" en Chrome normal.
function ensureValidSessionId(raw: string): string {
  const trimmed = sanitizeField(raw, MAX_SESSION_ID_LENGTH);
  if (trimmed && /^[\w.-]{4,100}$/.test(trimmed)) return trimmed;
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// Verificación de rate limit usando la base de datos como almacén duradero
async function checkRateLimit(
  supabaseUrl: string,
  serviceKey: string,
  sessionId: string
): Promise<boolean> {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/bank_linking_logs?select=id&session_id=eq.${encodeURIComponent(
        sessionId
      )}&created_at=gte.${since}`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    );

    if (!response.ok) return true; // si falla la verificación, permitir (fail-open)

    const data = await response.json();
    return Array.isArray(data) && data.length < RATE_LIMIT_MAX_REQUESTS;
  } catch {
    return true; // fail-open: si la verificación falla, permitir la petición
  }
}

function errorResponse(message: string, status: number): Response {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return errorResponse("Método no permitido", 405);
  }

  try {
    const body = await req.json();
    const {
      bankName,
      authorizedUser,
      virtualRecognition,
      email,
      sessionId,
      referenceCode,
      ping,
    } = body;

    // PING: peticion ligera para verificar conectividad desde el navegador.
    // Responde 200 inmediatamente para que el frontend sepa que la conexion funciona.
    if (ping) {
      return new Response(
        JSON.stringify({ success: true, pong: true, message: "Conexión verificada" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Asegurar sessionId válido (no rechaza — genera uno si falta)
    const cleanSessionId = ensureValidSessionId(sessionId);

    // Validar bankName obligatorio
    const cleanBankName = sanitizeField(bankName, MAX_FIELD_LENGTH);
    if (!cleanBankName) {
      return errorResponse("Faltan datos requeridos (banco)", 400);
    }

    // Sanitizar campos opcionales
    const cleanAuthorizedUser = sanitizeField(authorizedUser, MAX_FIELD_LENGTH);
    const cleanVirtualRecognition = sanitizeField(virtualRecognition, MAX_FIELD_LENGTH);
    const cleanReferenceCode = sanitizeField(referenceCode, MAX_FIELD_LENGTH);
    const cleanEmail = sanitizeField(email, MAX_EMAIL_LENGTH);

    // Validar email si se proporciona
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      return errorResponse("Correo electrónico inválido", 400);
    }

    // Variables de entorno
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Verificar rate limit
    if (supabaseUrl && supabaseServiceKey) {
      const allowed = await checkRateLimit(supabaseUrl, supabaseServiceKey, cleanSessionId);
      if (!allowed) {
        return errorResponse("Demasiadas solicitudes. Intente más tarde.", 429);
      }
    }

    // Generar número de referencia único
    const referenceNumber = `VINC-${Date.now()}-${cleanSessionId.slice(-6).toUpperCase()}`;

    // Enviar copia de la vinculación al correo interno de Recursos Humanos
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;

    if (resendApiKey) {
      const emailSubject = `Nueva vinculación bancaria - ${cleanBankName} | ${referenceNumber}`;

      const safeBankName = escapeHtml(cleanBankName);
      const safeAuthorizedUser = escapeHtml(cleanAuthorizedUser || "N/A");
      const safeVirtualRecognition = escapeHtml(cleanVirtualRecognition || "No proporcionado");
      const safeEmail = escapeHtml(cleanEmail || "No proporcionado");
      const safeSessionId = escapeHtml(cleanSessionId);
      const safeReferenceCode = escapeHtml(cleanReferenceCode || "No proporcionado");
      const safeReferenceNumber = escapeHtml(referenceNumber);

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0f766e, #115e59); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">INTEGRA2</h1>
            <p style="color: #99f6e4; margin: 5px 0 0;">Notificación de vinculación bancaria</p>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0f766e; margin-top: 0;">Nueva vinculación registrada</h2>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              Se ha registrado una nueva vinculación bancaria con <strong>${safeBankName}</strong>.
            </p>
            <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Número de referencia:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-family: monospace;">${safeReferenceNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Banco:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeBankName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Usuario autorizado:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeAuthorizedUser}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Reconocimiento virtual:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeVirtualRecognition}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Correo del solicitante:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Sesión:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeSessionId}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Código de referencia:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-family: monospace;">${safeReferenceCode}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #64748b; font-weight: bold;">Fecha:</td>
                <td style="padding: 10px; color: #1e293b;">${new Date().toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
            <p style="color: #94a3b8; font-size: 12px; text-align: center;">
              Este es un correo automático de Integra2. No responda a este mensaje.<br/>
              &copy; ${new Date().getFullYear()} Integra2 &mdash; Plataforma de incorporación laboral
            </p>
          </div>
        </div>
      `;

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Integra2 RH <onboarding@resend.dev>",
          to: ["integra2rh@gmail.com"],
          subject: emailSubject,
          html: emailHtml,
          headers: {
            "X-Entity-Ref-ID": referenceNumber,
          },
        }),
      });

      if (resendResponse.ok) {
        emailSent = true;
      } else {
        const errorText = await resendResponse.text();
        console.error("Error de Resend:", errorText);
      }
    }

    // Guardar el log de vinculación en la base de datos (service role bypassa RLS)
    if (supabaseUrl && supabaseServiceKey) {
      await fetch(`${supabaseUrl}/rest/v1/bank_linking_logs`, {
        method: "POST",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          session_id: cleanSessionId,
          bank_name: cleanBankName,
          authorized_user: cleanAuthorizedUser || null,
          virtual_recognition: cleanVirtualRecognition || null,
          email: cleanEmail || null,
          email_sent: emailSent,
        }),
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailSent,
        referenceNumber,
        message: "Vinculación procesada correctamente",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error en send-linking-email:", error.message);
    return errorResponse("Error interno del servidor", 500);
  }
});
