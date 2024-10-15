This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).



<img width="388" alt="Screenshot 2024-10-15 at 7 32 01 PM" src="https://github.com/user-attachments/assets/1c0024fb-4218-4c65-ba90-f205aebfb6a1">
<img width="391" alt="Screenshot 2024-10-15 at 7 32 10 PM" src="https://github.com/user-attachments/assets/359566b1-470c-4769-99bd-6e28148dd091">
<img width="381" alt="Screenshot 2024-10-15 at 7 32 23 PM" src="https://github.com/user-attachments/assets/b615d914-824d-444e-8f90-b3ca60277497">
<img width="373" alt="Screenshot 2024-10-15 at 7 32 36 PM" src="https://github.com/user-attachments/assets/1ac2a7df-a1b6-428e-8a5c-19112cfa4ffd">


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Turn on the json-server

```bash
json-server db.json
```
### In constants.js file change the local ip address 
```bash
export const BASEE_URL = 'http://192.168.1.7:3000' // use localhost or local ip address with 
```
