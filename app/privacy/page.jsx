export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-200 max-w-2xl text-lg">
            We value your privacy and are committed to protecting your personal information
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8 -mt-20 relative z-10 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">Name, email address, phone number, and shipping address when you create an account or place an order.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Usage Data</h3>
                <p className="text-gray-600">Information about how you use our website, including browsing patterns and preferences.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Process and fulfill your orders</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Send order updates and shipping notifications</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Improve our website and services</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Communicate about promotions and updates</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              Data Security
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="text-blue-800 font-medium">Your Security Matters</p>
              <p className="text-blue-600 mt-2">
                We implement appropriate security measures to protect your personal information
                from unauthorized access, alteration, or disclosure.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}