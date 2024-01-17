/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    NEXT_PUBLIC_STUDIOASA: process.env.NEXT_PUBLIC_STUDIOASA,
  },
};

module.exports = 
{
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dash.studioasa.id',
        pathname: '/**'
      },
    ],
  },
}
