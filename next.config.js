/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'kz'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        // this will match `/english(default)/something` being requested
        source: '/:slug(^[a-zA-z0-9]{8}$)',
        destination: '/api/vcards/:slug',
        permanent: false,
      },
    ]
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