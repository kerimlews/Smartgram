module.exports = function() {
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [ "babel-plugin-module-resolver", {
              "root": ["./app"],
              "alias": {
                "components": "./app/components",
                "containers": "./app/containers",
                "styles": "./app/styles"
              }
            }]
    }
}