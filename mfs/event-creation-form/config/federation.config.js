const { dependencies } = require('../package.json');

module.exports = {
    name: '_event_creation_form_',
    filename: 'remoteEntry.js',
    exposes: {
        './EventCreationForm': './src/bootstrap',
    },
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies['react'],
            eager: true,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
            eager: true,
        },
    }
}