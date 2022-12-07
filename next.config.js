/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'kz'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig;
// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/en',
//         permanent: true,
//       },
//     ]
//   },
// }