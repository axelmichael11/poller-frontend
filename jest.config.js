require('dotenv').config();



module.exports = {
    // verbose: false,
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/assetsTransformer.js",
        "\\.(css)$": "<rootDir>/test/assetsTransformer.js"
      },
    globals: {
        __DEBUG__: JSON.stringify("production"),
      __API_URL__: JSON.stringify(process.env.API_URL),
      __AUTH0_AUDIENCE__: JSON.stringify(process.env.AUTH0_AUDIENCE),
      __AUTH0_CLIENT_ID__: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      __AUTH0_CLIENT_DOMAIN__: JSON.stringify(process.env.AUTH0_CLIENT_DOMAIN),
      __POLLER_APP__: JSON.stringify(process.env.POLLER_APP),
      __AUTH0_REDIRECT_URI__:JSON.stringify(process.env.AUTH0_REDIRECT_URI),
      __ORIGIN__: JSON.stringify(process.env.ORIGIN)
      }
  };