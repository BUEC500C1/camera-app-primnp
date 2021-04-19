# camera-app-primnp

## Please refer to Video 1, Video 2, and Video 3 embedded below to view demonstration of completed work over a period of time. 

## Due 03/24/21 - DONE
**Step 1:  Setup your REACT Native Environment**

Please note:  If you have an iOS device, you need a Mac computer.  If you don’t have a Mac, please build it as an Android on the emulator.
* I have a mac and have previously worked with react native both using expo CLI and react native CLI. For this project, I will use expo CLI. Note: I already have expo-cli installed on my laptop and also Expo Go application installed on my iPhone (iPhone 11 Pro Max).
* To set up work environment, run the following in terminal:
```
expo init [name]
```

<p align="center">
Figure 1. Set up expo CLI
<br><img src="/Images/init.png" width="65%" />
<br>Note: in the image above, I did have to run <b>npm install -g expo-cli</b> again to get the latest version of expo-cli
</p>
<br />

**Step 2:  Go through REACT native Tutorial**
1. Build Hello Applications (completed; App.js)
2. Run Hello applications on emulator and your phone. It will be great to run it on two phones if you can (iOS and Android)
 * Set up android emulator on mac: https://docs.expo.io/workflow/android-studio-emulator/
```
npm run ios or npm run android
```
<br />

| Hello World App on iOS Simulator| Hello World App on iPhone via Expo Go | Hello World App on Pixel 4 (Android Emulator) | 
|:----:|:---:|:---:|
| <img src="/Images/hello_iossim.png" width="70%" /> | <img src="/Images/hello_iphone.PNG" width="50%" /> | <img src="/Images/hello_pixel.png" width="70%" /> |

---
## Due 03/28/21 - DONE
**Step 3:  Develop use case to display a map.  [react-native-maps](https://github.com/react-native-maps/react-native-maps)**

* Add google maps API key to the info plist so the mobile application can display google maps
* Create a pin and add picture for the location of 'Photonics building'
* View demonstratioin of this feature on 'Video 1' (refer below)

**Step 4:  Develop use case to take a picture  [react-native-camera](https://github.com/react-native-camera/react-native-camera)**

* Take a picture using react native camera and output the file location to console
* View demonstratioin of this feature on 'Video 1' (refer below)

## Due 03/30/2021 - DONE
**Step 5:  Setup your Firebase [react-native-firebase](https://github.com/invertase/react-native-firebase).  Setup authentication, database, and storage**

* Set up authentication and database
* User can now log in to the application using existing username and password or create a new account
  * Users can not access any application features if they do not log in
* View demonstratioin of this feature on 'Video 1' (refer below)

**Step 6:  Store cloud data in the cloud and display as list on the phone**

* Develop a use case for user to add new data entry and automatically add that data entry to cloud firestore
* User can view list of data stored on cloud firestore with real time update
* View demonstratioin of this feature on 'Video 1' (refer below)

*Key takeaways*
* At this point, I realized that expo would not support barcode and face detection of react-native-camera. So I decided to switch to develop with bare react native project. Set up are as follow: https://reactnative.dev/docs/environment-setup (follow the steps for React Native CLI Quickstart).
* I decided to move forward with iOS development for react native as of now. Dependencies/library for android might be added later in the future.
* All files for iOS mobile appliciation are stored inside 'application' folder on this repo.

### Video 1
### Click on the video below to view the demonstration of step 3,4,5,6.

[![IMAGE ALT TEXT](http://img.youtube.com/vi/ebPmC2siB_E/0.jpg)](http://www.youtube.com/watch?v=ebPmC2siB_E "EC500 HW3")

---
## Due 03/01/2021 - DONE
**Step 7: Detect Faces and blur them before you store them**

* I found out that the @react-native-firebase/ml-vision for face detection using react-native-camera is deprecated. Therefore, my bare react native project could not handle face detection.
* I decided to create another **expo** react native project to demonstrate solely the face detection and blurring the face detected feature.
* The code for this is inside [Expo_Facedtector](https://github.com/BUEC500C1/news-analyzer-primnp/tree/main/Secure_File_Uploader) folder
* The expo SDK I used for face detection is FaceDetector (https://docs.expo.io/versions/latest/sdk/facedetector/) and the expo SDK I used for blurring detected face is BlurView (https://docs.expo.io/versions/v41.0.0/sdk/blur-view/). These two SDKs are integrated to Expo Camera SDK (https://docs.expo.io/versions/latest/sdk/camera).
* In addition, since takePictureAsync() from Camera SDK only take a snapshot of the image, and does not include blur filter super-impose on the camera view, I used captureRef (https://docs.expo.io/versions/latest/sdk/captureRef/) to screenshot the camera view with blurred filter area. However, captureRef creates an issue as it screenshots only the blurred filter area and does not include the actual face image.
* Images saved using takePictureAsync() and captureRef are stored inside iPhone photo library.
* In conclusion, work I did in step 7 does not fully demonstrate saving picture of blurred face. Instead, it demonstrates saving an image and blurred area of the face separately into two image files. Future fix could be to screenshot the image with filter super-impose on top of the image, not screenshot directly from the camera.
* View demonstration of this feature on 'Video 2' (refer below) 

### Video 2
### Click on the video below to view the demonstration of step 7.

[![IMAGE ALT TEXT](http://img.youtube.com/vi/wyJC9-axyqk/0.jpg)](http://www.youtube.com/watch?v=wyJC9-axyqk "EC500 HW3 Face Detect")

---
## Due 3/02/2021 - DONE
**Step 8: Scan barcodes and save the data per image**

* Use onBarCodeRead function to scan barcode
* User take a picture of barcode image then the text extracted from barcode and the image of the barcode are stored in firebase storage
* Display barcode image and extracted text as a list
* View demonstration of this feature on 'Video 3' (refer below) - barcode scanner features start at 1.36 minute mark


### Video 3
### Click on the updated video below to view the demonstration of step 3,4,5,6,8,9 (for step 7, view Video 2).

[![IMAGE ALT TEXT](http://img.youtube.com/vi/xbxHcXlJgb0/0.jpg)](http://www.youtube.com/watch?v=xbxHcXlJgb0 "EC500 HW3 updated")


---
## Due 03/04/2021 - DONE
**Step 9: Store images and barcode in Firebase**

* Store barcode image and extracted text in firebase
* If user take a picture of non-barcode image, text extracted field will be 'N/A' 
* View demonstration of this feature on 'Video 3' (refer above) - barcode scanner features and data storage start at 1.36 minute mark




