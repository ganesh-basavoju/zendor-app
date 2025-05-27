export default function CookiePolicy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/wall.png"
            alt="Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-200 max-w-2xl text-lg">
            Learn how we use cookies to enhance your browsing experience and improve our services
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8 -mt-20 relative z-10 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              What Are Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and
              understanding how you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600">Required for the website to function properly. These cookies ensure basic functionalities and security features of the website.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-600">Help us understand how visitors interact with our website. This data helps us improve our website's structure and content.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Preference Cookies</h3>
                <p className="text-gray-600">Remember your settings and preferences to enhance your browsing experience on future visits.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              Managing Cookies
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                You can control and/or delete cookies as you wish. You can delete all cookies that are
                already on your computer and you can set most browsers to prevent them from being placed.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium">Important Note</p>
                <p className="text-blue-600 mt-2">
                  Please be aware that disabling certain cookies may impact the functionality of our website.
                  Essential cookies are required for basic site operations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}