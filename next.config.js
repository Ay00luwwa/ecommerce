/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      allowedDevOrigins: ['http://192.168.178.224:3000'], // or your actual IP/port
    },
  };
  
  module.exports = nextConfig;
  