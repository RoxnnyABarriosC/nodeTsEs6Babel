module.exports = {
    apps : [{
        name: 'nodetses6babel',
        script: './dist/src/app.js',
        error_file: './dist/src/logs/err.log',
        watch: false,
        instances: 1,
        ignore_watch: './dist/src/logs/*',
        instance_var: '0',
        env: {
            NODE_ENV: 'production',
            NODE_CONFIG_STRICT_MODE: true
        }
    }]
};
