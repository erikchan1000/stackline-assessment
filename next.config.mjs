/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images-na.ssl-images-amazon.com']
  },
  sassOptions: {
      includePaths: [path.join(new URL('.', import.meta.url).pathname, 'styles')],
    },
    webpack(config) {
      config.module.rules.forEach((rule) => {
        const { oneOf } = rule;
        if (oneOf) {
          oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes('_app')) return;
            one.issuer.and = [path.resolve(__dirname)];
          });
        }
      }
      );
      return config
    },
};

export default nextConfig;
