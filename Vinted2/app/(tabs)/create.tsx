import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  launchCamera,
  CameraOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import { router } from "expo-router";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

const SellProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const device = useCameraDevice("back");
  const { hasPermission } = useCameraPermission();

  const handleCamera = async () => {
    const options: CameraOptions = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleSubmit = () => {
    if (!productName || !description || !price || !imageUri) {
      Alert.alert("Input Error", "Please fill in all fields and add an image.");
      return;
    }

    // Submit the product data
    const productData = {
      name: productName,
      description,
      price: parseFloat(price),
      image: imageUri,
    };

    console.log("Product data:", productData);
    Alert.alert("Success", "Product listed successfully!");

    // Reset the form
    setProductName("");
    setDescription("");
    setPrice("");
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        onChangeText={setProductName}
        value={productName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
      />
      <Button title="Take Photo" onPress={handleCamera} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="List Product" onPress={handleSubmit} />
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default SellProduct;
