module.exports = {
    assumptions: {
        setPublicClassFields: true
    },
    sourceMaps: 'both',
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        'module-resolver',
        '@babel/plugin-transform-typescript',
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-class-properties'
    ],
    env: {
        production: {
            plugins: [
                'source-map-support'
            ]
        }
    }
};
