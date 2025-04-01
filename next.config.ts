import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  env: {
    APP_URL: process.env.APP_URL,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
