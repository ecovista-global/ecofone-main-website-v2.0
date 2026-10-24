/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compendium Invariant: Strict requirement for AWS ECS Graviton ARM64 Container Portability
  output: 'standalone',
  reactStrictMode: false,
  async rewrites() {
    const backendHost = process.env.BACKEND_URL || process.env.INTERNAL_BACKEND_URL || 'https://nextjs-642200683.kloudbeansite.com';
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendHost}/api/v1/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/articles',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/articles/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

// Fail-fast assertion: Prevent deployment failures if output is ever removed
if (nextConfig.output !== 'standalone') {
  throw new Error("Compendium Invariant Error: nextConfig.output MUST remain 'standalone' for AWS container deployment.");
}

module.exports = nextConfig;
