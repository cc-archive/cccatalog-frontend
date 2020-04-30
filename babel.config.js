module.exports = (api) => {
  const isTest = api.env('test');

  if (!isTest) {
    return {
      "presets": [
        [
          "@babel/preset-env",
          {
            "modules": false,
            "targets": {
              "browsers": [
                "> 1%",
                "last 2 versions",
                "not ie <= 8",
                "ie >= 11"
              ]
            }
          }
        ]
      ],
      "plugins": [
        "@babel/plugin-syntax-dynamic-import"
      ]
    };
  }
  else {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ]
    }
  }
}
