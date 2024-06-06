// import { View, StyleSheet } from "react-native";
// import { Camera } from "expo-camera";
// import { useState, useEffect, useRef } from "react";
// import * as MediaLibrary from "expo-media-library";

// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] = useState<
//     boolean | null
//   >(null);
//   const [image, setImage] = useState<string | null>(null);
//   const cameraRef = useRef(null);

//   // Ask for camera permission
//   useEffect(() => {
//     (async () => {
//       await MediaLibrary.requestPermissionsAsync();
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === "granted");
//     })();
//   }, []);

//   return (
//     <View>
//       {/* <Camera
//       // style={styles.camera}
//       ref={cameraRef}
//     >

//     </Camera> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
// });

import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.

    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Take a picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
