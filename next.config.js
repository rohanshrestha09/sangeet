/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         { protocol: 'https', hostname: 'robohash.org' },
         { protocol: 'https', hostname: 'c.saavncdn.com' },
      ],
   },
};

module.exports = nextConfig;
