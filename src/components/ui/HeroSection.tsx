interface HeroSectionProps {
  title: string;
  subtitle: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    active?: boolean;
  }>;
  stepIndicator?: {
    icon: React.ReactNode;
    text: string;
  };
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  breadcrumbs,
  stepIndicator,
  className = '',
}: HeroSectionProps) {
  return (
    <section
      className={`relative pt-20 pb-16 overflow-hidden ${className}`}
      style={{ backgroundColor: '#E4EDEC80' }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          {breadcrumbs && (
            <div className="flex items-center justify-center mb-8 text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className={crumb.active ? 'text-gray-900 font-medium' : ''}
                  >
                    {crumb.label}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <svg
                      className="w-4 h-4 mx-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>

          {stepIndicator && (
            <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-600 mb-6 border border-white/30 shadow-sm">
              {stepIndicator.icon}
              {stepIndicator.text}
            </div>
          )}

          <div className="w-16 h-1 bg-gray-900 mx-auto rounded-full opacity-20"></div>
        </div>
      </div>
    </section>
  );
}
