import "dotenv/config";

export default {
  expo: {
    name: "CsodApp",
    slug: "csodapp",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/aclogo.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      "bundleIdentifier": "com.csodapp.csodapp"
    },
    android: {
      package: "com.csodapp.csodapp",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
