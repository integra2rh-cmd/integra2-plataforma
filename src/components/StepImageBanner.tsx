// Banner decorativo con imagen para los pasos del proceso
interface StepImageBannerProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export function StepImageBanner({ imageUrl, alt, className = '' }: StepImageBannerProps) {
  return (
    <div className={`relative mb-6 overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        className="h-40 w-full object-cover sm:h-52"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
    </div>
  );
}
