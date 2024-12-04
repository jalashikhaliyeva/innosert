/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */

const nextAuthUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://innosert.vercel.app'
    : 'http://localhost:3000';

const nextConfig = {
  env: {
    NEXTAUTH_URL: nextAuthUrl,
    // other environment variables
  },
  reactStrictMode: true,
  images: {
    domains: ["innocert-admin.markup.az"], // Add your external domain here
  },
  i18n: {
    locales: ['az', 'en', 'ru'], // The languages you support
    defaultLocale: 'az', // Your default language
    localeDetection: false, 
    // localeDetection: true, // Detect user's language automatically
  },
};

export default nextConfig;
