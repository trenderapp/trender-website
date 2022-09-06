const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const path = require('path');
const loaderUtils = require('loader-utils');

const hashOnlyIdent = (context, _, exportName) => loaderUtils.getHashDigest(Buffer.from(`filePath:${path.relative(context.rootContext, context.resourcePath).replace(/\\+/g, '/')}#className:${exportName}`,), 'md4', 'hex', 8,).replace(/^(-?\d|--)/, 'css-$1');

const config = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  swcMinify: true,
  webpack(config, { dev }) {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

 
    if(!dev)
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes('css-loader') &&
            !moduleLoader.loader?.includes('postcss-loader')
          )
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
        });
      });
      return config;
  },
  images: {
    domains: [
      'cdn.trenderapp.com',
      'cdn.boteric.fr'
    ],
  }
}

module.exports = withBundleAnalyzer(config);