const { dependencies } = require('../package.json');

module.exports = {
    name: '_dashboard_',
    filename: 'remoteEntry.js',
    exposes: {
        './Dashboard': './src/bootstrap',
    },
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies['react'],
            eager: true
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
            eager: true
        },
    }
}