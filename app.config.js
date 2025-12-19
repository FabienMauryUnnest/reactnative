// app.config.js
import "dotenv/config";

export default ({ config }) => {
  const env = process.env.APP_ENV ?? "dev";
  const apiUrl = process.env.API_URL ?? "https://jsonplaceholder.typicode.com";

  const envConfig = {
    dev: {
      name: "RNE (Dev)",
      slug: "RNE",
      bundleIdentifier: "com.entreprise.rne.dev",
      androidPackage: "com.entreprise.rne.dev",
    },
    staging: {
      name: "RNE (Staging)",
      slug: "RNE",
      bundleIdentifier: "com.entreprise.rne.staging",
      androidPackage: "com.entreprise.rne.staging",
    },
    prod: {
      name: "RNE",
      slug: "RNE",
      bundleIdentifier: "com.entreprise.rne",
      androidPackage: "com.entreprise.rne",
    },
  };

  const current = envConfig[env];

  return {
    expo: {
      ...config,

      name: current.name,
      slug: current.slug,
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "rne",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,

      ios: {
        ...config.ios,
        supportsTablet: true,
        bundleIdentifier: current.bundleIdentifier,
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false,
        },
      },

      android: {
        ...config.android,
        package: current.androidPackage,
        adaptiveIcon: {
          backgroundColor: "#E6F4FE",
          foregroundImage: "./assets/images/android-icon-foreground.png",
          backgroundImage: "./assets/images/android-icon-background.png",
          monochromeImage: "./assets/images/android-icon-monochrome.png",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
      },

      web: {
        output: "static",
        favicon: "./assets/images/favicon.png",
      },

      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
            dark: {
              backgroundColor: "#000000",
            },
          },
        ],
      ],

      experiments: {
        typedRoutes: true,
        reactCompiler: true,
      },

      extra: {
        router: {},
        APP_ENV: env,
        API_URL: apiUrl,
        eas: {
          projectId: "6ec7d012-622a-4a4a-bb6b-3f52bcd5096d",
        },
      },
    },
  };
};
