module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // Replace with your image domains
      },
    ],
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL, // Example of an environment variable
  },
};