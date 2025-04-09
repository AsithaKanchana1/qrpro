# QR Pro v1.0

This is a React Native + Expo app that allows users to generate QR codes from text or URLs and save them to their device's gallery.

---

## **Getting Started**

## Download The App 

Use Releses To Download The APK File 


Follow these steps to set up and run the project on your local machine.

### 1. **Clone the Repository**
   - Open a terminal and run:
     ```bash
     git clone 
     ```

   - Navigate into the project directory:
     ```bash
     cd 
     ```

---

### 2. **Install Node.js and npm**
   - Download and install **Node.js** (with npm) from [Node.js Official Website](https://nodejs.org/).
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

---

### 3. **Install Expo CLI**
   - Install Expo CLI globally if you don’t already have it:
     ```bash
     npm install -g expo-cli
     ```
   - Verify Expo CLI installation:
     ```bash
     expo --version
     ```

---

### 4. **Install Dependencies**
   - Inside the project folder, run:
     ```bash
     npm install
     ```
   - This will install all required dependencies listed in `package.json`.
<!-- These are the requierd dependencies  
 "dependencies": {
    "expo": "~52.0.43",
    "expo-dev-client": "^5.0.20",
    "expo-file-system": "~18.0.12",
    "expo-media-library": "^17.0.6",
    "expo-status-bar": "~2.0.1",
    "qrcode": "^1.5.4",
    "react": "18.3.1",
    "react-native": "0.76.9",
    "react-native-paper": "^5.13.1",
    "react-native-qrcode-svg": "^6.3.15",
    "react-native-svg": "^15.11.2",
    "validator": "^13.15.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
   -->
### 6. **Start the Development Server**
   - Run the following command to start the Expo development server:
     ```bash
     npx expo start
     ```
   - This will open a web interface (Metro Bundler) in your default browser.

---
### 7. **Run the App**
You can run the app using one of these methods:

#### 1. **Pre Build APK**

    - Download Pre Build APK inside Releses

#### 2. **Development Build**        
    - I am recommending that run this using Development Build Becouse  file saving and some other funtions are not supported development servers like expo client 
    - some fetures may need for run development build like "adb" ,emulator or USB Debbuging anabled Mobile Device Please do your reserch 
    i cannot include all thigs 

    - if you need quick fix then run prebuild APK file 

     ```bash
     npx expo run:android
     ```
---
## **Features**

- Generate QR codes from text or URLs.
- Save generated QR codes to your device's gallery.
- Input validation to ensure valid text or URLs.

---

## **Permissions**

The app uses `expo-media-library` to save QR codes to your device's gallery. You may need to grant permissions when prompted.

---

## **Common Issues and Solutions**

1. **Missing Dependencies**
   If you encounter errors related to missing dependencies, delete `node_modules` and reinstall dependencies:
   ```
   rm -rf node_modules
   npm install
   ```

2. **Expo Version Mismatch**
   If there are issues related to Expo versions, try upgrading/downgrading Expo CLI or dependencies:
   ```
   npx expo upgrade
   ```

3. **Permission Errors**
   If saving QR codes fails, ensure permissions are granted for accessing media libraries.

---

## **Contributing**

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

---
## **Contact Me**
You can Contact me Via Email :
[Contact Me](mailto:asitha.contact.me@gmail.com?subject=QR%20Pro%20Issue&body=I%20have%20a%20question%20about%20QRPro%20App.)

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
