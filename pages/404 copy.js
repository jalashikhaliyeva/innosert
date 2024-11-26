export default function Custom404() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-lightPurpleBg via-brandBlue100 to-lightPurpleBg font-gilroy">
        {/* Disconnected Plug or Broken Illustration */}
        {/* <div className="relative">
            <div className="flex items-center justify-center">
              <img
                src="/images/plug-disconnected.svg"
                alt="Disconnected Plug"
                className="w-56 h-56 animate-float"
              />
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-grayText rounded-full blur-xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-grayText rounded-full blur-lg opacity-30"></div>
          </div> */}
  
        {/* Heading */}
        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-darkBlue md:text-6xl animate-fadeIn">
          404
        </h1>
        <p className="mt-4 text-lg text-white md:text-xl">
          Üzr istəyirik! Görünür, axtardığınız səhifəni tapa bilmirik.
        </p>
  
        {/* Call-to-Action Button */}
        <div className="mt-8">
          <a
            href="/"
            className="px-6 py-3 text-lg font-medium text-neutralWhite transition bg-gradient-to-r from-brandBlue500 to-buttonBlueHover rounded-full shadow hover:scale-105 hover:shadow-lg focus:ring focus:ring-blue400"
          >
            Ana Səhifəyə Qayıt
          </a>
        </div>
  
        {/* Footer Links */}
        <div className="mt-10 space-x-6 text-sm text-neutralWhite md:text-base">
          <a href="/" className="hover:text-buttonPrimaryHover">
            Ana Səhifə
          </a>
          <a href="/kateqoriyalar" className="hover:text-buttonPrimaryHover">
            Kateqoriyalar
          </a>
          <a href="/haqqimizda" className="hover:text-buttonPrimaryHover">
            Haqqımızda
          </a>
        </div>
      </div>
    );
  }
  