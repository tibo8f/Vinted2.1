import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';

const WelcomePage = () => {
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            source={require("../assets/images/vinted.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to Vinted </Text>
          <Text style={styles.description}>
            Please sign in to access the application{" "}
          </Text>
          <CustomButton
            title="Sign In"
            onPress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  scrollView: {
    height: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    marginTop: 50,
  },
});

export default WelcomePage;
