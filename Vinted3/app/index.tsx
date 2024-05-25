import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const WelcomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Vinted2 !</Text>
      <Text style={styles.description}>
        Please sign in to access the application{" "}
      </Text>
      <CustomButton title="Sign In" onPress={() => router.push("/sign-in")} />
    </View>
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
    marginBottom: 20,
  },
});

export default WelcomePage;
