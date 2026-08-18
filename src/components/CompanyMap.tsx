import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { COMPANY_LOCATIONS } from '@/lib/companyLocations';
import { getCompanyVisual } from '@/lib/companyVisuals';

const CATEGORY_COLORS: Record<string, string> = {
  'Automotriz': '#2563eb',
  'Industria y alimentos': '#059669',
  'Comercio': '#d97706',
  'Banca': '#7c3aed',
  'Salud': '#dc2626',
  'Construcción y materiales': '#92400e',
};

function createMarkerIcon(color: string, isSelected: boolean): L.DivIcon {
  const size = isSelected ? 38 : 30;
  const ring = isSelected ? 'box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.25);' : 'box-shadow: 0 2px 6px rgba(0,0,0,0.3);';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid #fff;
      ${ring}
      display: flex;
      align-items: center;
      justify-content: center;
    "><div style="
      transform: rotate(45deg);
      width: ${size * 0.45}px;
      height: ${size * 0.45}px;
      background: #fff;
      border-radius: 50%;
    "></div></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function CompanyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [9.9350, -84.0950],
      zoom: 11,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    leafletMapRef.current = map;

    const bounds: L.LatLngTuple[] = [];

    COMPANY_LOCATIONS.forEach((loc) => {
      const color = CATEGORY_COLORS[loc.category] || '#334155';
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createMarkerIcon(color, false),
      });

      bounds.push([loc.lat, loc.lng]);

      const visual = getCompanyVisual(loc.name);
      const displayName = visual.name || loc.name;
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;
      const safeName = escapeHtml(displayName);
      const safeAddress = escapeHtml(loc.address);
      const safePhone = escapeHtml(loc.phone);

      marker.bindPopup(`
        <div style="min-width: 240px; padding: 2px;">
          <div style="font-weight: 700; font-size: 15px; color: #1e293b; margin-bottom: 8px; line-height: 1.3;">
            ${safeName}
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
            <div style="display: flex; align-items: flex-start; gap: 6px;">
              <span style="color: #64748b; font-size: 12px;">📍</span>
              <span style="font-size: 12px; color: #475569; line-height: 1.5;">${safeAddress}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="color: #64748b; font-size: 12px;">☎️</span>
              <a href="tel:${safePhone.replace(/\s/g, '')}" style="font-size: 12px; color: #2563eb; text-decoration: none; font-weight: 500;">${safePhone}</a>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="color: #64748b; font-size: 12px;">🌐</span>
              <span style="font-size: 12px; color: #64748b; font-family: monospace;">${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}</span>
            </div>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="color: ${color}; font-size: 11px; font-weight: 600; background: ${color}15; padding: 3px 10px; border-radius: 999px;">
              ${escapeHtml(loc.category)}
            </span>
          </div>
          <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #2563eb; text-decoration: none; border-top: 1px solid #e2e8f0; padding-top: 8px;">
            Ver en Google Maps →
          </a>
        </div>
      `);

      marker.on('click', () => {
        Object.values(markersRef.current).forEach((m) => {
          const locRef = COMPANY_LOCATIONS.find((l) => markersRef.current[l.name] === m);
          if (locRef) {
            const c = CATEGORY_COLORS[locRef.category] || '#334155';
            m.setIcon(createMarkerIcon(c, false));
          }
        });
        marker.setIcon(createMarkerIcon(color, true));
      });

      marker.addTo(map);
      markersRef.current[loc.name] = marker;
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      <div className="relative w-full h-[480px] sm:h-[560px]">
        <div ref={mapRef} className="absolute inset-0 z-0" />

        {/* Leyenda de categorías */}
        <div className="absolute top-3 right-3 z-[400] bg-white/95 backdrop-blur rounded-xl shadow-md p-3 max-w-[180px]">
          <p className="text-[11px] font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <MapPin size={13} className="text-blue-600" />
            Categorías
          </p>
          <div className="flex flex-col gap-1.5">
            {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <span className="text-[10px] text-slate-600 leading-tight">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contador de empresas */}
        <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur rounded-lg shadow-md px-3 py-1.5">
          <span className="text-xs font-semibold text-slate-700">
            {COMPANY_LOCATIONS.length} empresas
          </span>
        </div>
      </div>
    </div>
  );
}
