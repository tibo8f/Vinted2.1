import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import * as Localization from "expo-localization";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(
            "http://172.20.10.4:3000/api/mobileconnection",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setUserName(data.user.name); // API returns user data including the name
          } else {
            console.error("Failed to fetch user data:", data.error);
          }
        } else {
          console.log("No token found in storage");
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Log out, token removed");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [localizationInfo, setLocalizationInfo] = useState("");

  useEffect(() => {
    const getLocalizationInfo = async () => {
      const locales = Localization.getLocales();
      const localeInfo = JSON.stringify(locales[0], null, 2);
      setLocalizationInfo(localeInfo);
    };

    getLocalizationInfo();
  }, []);

  const showAlert = () => {
    Alert.alert(
      "Localization Info",
      localizationInfo,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.profileText}>Profile</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {userName ? (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>Welcome, {userName}</Text>
            <TouchableOpacity
              style={styles.buttonLocalisation}
              onPress={showAlert}
            >
              <Text style={styles.buttonLocalizationText}>
                What's my localization info ?{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // not connected
          <CustomButton
            title="Sign In"
            onPress={() => router.push("/sign-in")}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  profileText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userContainer: {
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    width: "50%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#A52A2A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonLocalisation: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonLocalizationText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Profile;
