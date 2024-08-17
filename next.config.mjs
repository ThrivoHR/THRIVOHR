/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'i.pinimg.com',
              port: '', // Optional but can be included for clarity
              pathname: '/**', // Matches all paths
          },
      ],
  },
};

export default nextConfig;
