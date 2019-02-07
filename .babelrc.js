module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [ require.resolve('babel-plugin-module-resolver'), {
              root: ["./app"],
              alias: {
                "components": "./app/components",
                "containers": "./app/containers",
                "animations": "./app/animations",
                "styles": "./app/styles",
                "config": "./config",
                "assets": "./assets"
              }
            }]
        ] 
    };
}