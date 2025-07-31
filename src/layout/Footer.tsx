import { LABELS } from '../labels';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              {LABELS.BRAND.FULL_NAME}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {LABELS.BRAND.TAGLINE}
            </p>
            <div className="flex space-x-4">
              {[
                LABELS.FOOTER.SOCIAL.TWITTER,
                LABELS.FOOTER.SOCIAL.INSTAGRAM,
                LABELS.FOOTER.SOCIAL.LINKEDIN,
                LABELS.FOOTER.SOCIAL.YOUTUBE,
              ].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="text-sm font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">
              {LABELS.FOOTER.CONTACT.TITLE}
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{LABELS.FOOTER.CONTACT.EMAIL}</p>
              <p>{LABELS.FOOTER.CONTACT.PHONE}</p>
              <p>{LABELS.FOOTER.CONTACT.HOURS_WEEKDAY}</p>
              <p>{LABELS.FOOTER.CONTACT.HOURS_WEEKEND}</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">
              {LABELS.FOOTER.LOCATIONS.TITLE}
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{LABELS.FOOTER.LOCATIONS.DALLAS}</p>
              <p>{LABELS.FOOTER.LOCATIONS.FORT_WORTH}</p>
              <p>{LABELS.FOOTER.LOCATIONS.COMING_SOON}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">{LABELS.FOOTER.COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}
