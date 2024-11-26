import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col font-gilroy items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Illustration */}
      <div className="w-96 md:w-1/2">
        <Image
          src="/img/notFound.png"
          alt="404 Illustration"
          width={500}
          height={300}
          className="mx-auto"
        />
      </div>

      {/* Text */}
      <h1 className="mt-6 text-4xl font-extrabold text-gray-800">
        Üzr istəyirik!
      </h1>
      <p className="mt-2 text-lg text-gray-600 max-w-lg text-center">
        Görünür, səhifə mövcud deyil və ya silinmişdir. Zəhmət olmasa ana
        səhifəyə qayıdın.
      </p>

      {/* Button */}
      <div className="mt-8">
        <a
          href="/"
          className="px-6 py-3 text-lg font-medium text-neutralWhite transition bg-gradient-to-r from-brandBlue500 to-buttonBlueHover rounded-full shadow hover:scale-105 hover:shadow-lg focus:ring focus:ring-blue400 hover:from-buttonBlueHover hover:to-brandBlue500"
        >
          Ana Səhifəyə Qayıt
        </a>
      </div>
    </div>
  );
}
