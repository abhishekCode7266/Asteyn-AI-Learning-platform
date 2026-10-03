import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // GitHub Pages static export ke liye zaroori hai
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Aapki repo ka exact naam yahan update kar diya gaya hai
  basePath: process.env.GITHUB_ACTIONS ? '/Asteyn-AI-Learning-platform' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/Asteyn-AI-Learning-platform' : '',
  trailingSlash: false,
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
