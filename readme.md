# Creat new project

npx create-expo-app@latest --template blank andyoudhstore

# Install expo minimum dependencies

npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-web react-dom

# Start the project with expo

npx expo start

# Install Nativewind after expo created based on https://www.nativewind.dev/docs/getting-started/installation

npm install nativewind react-native-reanimated react-native-safe-area-context
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo

# Init the taiwindcss from Nativewind

npx tailwindcss init

# Running iOS

npx expo start --ios

# Running android

npx expo start --android
