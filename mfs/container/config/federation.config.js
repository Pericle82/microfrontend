const { dependencies } = require('../package.json');

module.exports = {
    name: '_container_',
    filename: 'remoteEntry.js',
    remotes: {
        event_creation_form: '_event_creation_form_@[window.event_creation_form]',
        dashboard: '_dashboard_@[window.dashboard]',
        core: '_core_@[window.core]',
    },
    shared: {
        ...dependencies,
        react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies.react
        },
        'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['react-dom']
        },
    }
}