module.exports = function(api) {
    api.cache(true);
    return {
        presets: [
            'babel-preset-expo'
        ],
        env: {
            production: {
                plugins: ['react-native-paper/babel'],
            },
        },
        plugins: [
            [ require.resolve('babel-plugin-module-resolver'), {
              root: ["./app"],
              alias: {
                "components": "./app/components",
                "containers": "./app/containers",
                "animations": "./app/animations",
                "headers": "./app/headers",
                "styles": "./app/styles",
                "config": "./config",
                "assets": "./assets",
                "routes": "./routes"
              }
            }]
        ] 
    };
}