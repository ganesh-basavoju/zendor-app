export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-gray-200 max-w-2xl text-lg">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8 -mt-20 relative z-10 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              User Responsibilities
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Account Security</h3>
                <p className="text-gray-600">You are responsible for maintaining the confidentiality of your account and password.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Accurate Information</h3>
                <p className="text-gray-600">You must provide accurate and complete information when creating an account or placing orders.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-6">
              Product Information
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We strive to display our products accurately, but we do not warrant that product
                descriptions or other content is accurate, complete, or current.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium">Important Notice</p>
                <p className="text-blue-600 mt-2">
                  Colors may appear slightly different due to screen calibration and lighting conditions.
                  We recommend requesting samples before making large purchases.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}