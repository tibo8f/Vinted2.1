import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ArticlePurchasedExit = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>
            Congratulation on buying your article ! 🎉
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.buttonText}>Back to home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    marginTop: 250,
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },

  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#007782",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  scrollView: {
    height: "100%",
  },
});

export default ArticlePurchasedExit;
