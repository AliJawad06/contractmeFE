import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform({
    bindings: {
      contractme_db: {
        binding: 'contractme_db',
        id: '5d86cc53-d086-4900-864d-949e276748cf', // from wrangler.toml
      },
    },
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.simpleicons.org', 'localhost', 'paddle-billing.vercel.app'],
  },
};

export default nextConfig;
