module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "root": [ "./" ],
        "alias": {
            "@assets":"./src/assets",
            "@components":"./src/components",
            "@containers":"./src/containers",
            "@context":"./src/context",
            "@hooks":"./src/hooks",
            "@router":"./src/router",
            "@screens":"./src/screens",
            "@services":"./src/services",
            "@ui":"./src/ui",
            "@utils":"./src/utils"
        }
      }],
    ],
  };
};
