
const path = require('path');
const graphql = require('next-plugin-graphql');
const { withPlugins } = require('next-compose-plugins');

const analyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  sassOptions: {
    indentWidth: 4,
    includePaths: [path.join(__dirname, 'src/style')],
  },
  webpack: (config, _options) => {
    config.resolve.fallback = {
      fs: false,
      http: require.resolve('stream-http'),
    };

    config.resolve.alias['@client'] = path.resolve(__dirname, './client');
    config.resolve.alias['@components'] = path.resolve(
      __dirname,
      './components',
    );
    config.resolve.alias['@graphql-documents'] = path.resolve(
      __dirname,
      './graphql-documents',
    );
    config.resolve.alias['@lib'] = path.resolve(__dirname, './lib');

    config.resolve.alias['@styles'] = path.resolve(__dirname, './styles');

    config.resolve.alias['@public'] = path.resolve(__dirname, './public');

    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx',
    ]);

    return config;
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard/tournaments',
        permanent: true,
      },
    ];
  },
};

const config = withPlugins([graphql, analyzer], nextConfig);

module.exports = config;
