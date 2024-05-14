// next.config.mjs
import path from "path";
var nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images-na.ssl-images-amazon.com"]
  },
  sassOptions: {
    includePaths: [path.join(new URL(".", import.meta.url).pathname, "styles")]
  },
  webpack(config) {
    config.module.rules.forEach(
      (rule) => {
        const { oneOf } = rule;
        if (oneOf) {
          oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes("_app"))
              return;
            one.issuer.and = [path.resolve(__dirname)];
          });
        }
      }
    );
    return config;
  }
};
var next_config_default = nextConfig;
export {
  next_config_default as default
};
