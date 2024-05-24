import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import CustomButton from "@/components/CustomButton";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);

const Profile = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token retrieved from storage:", token);
        if (token) {
          console.log("front end see a token in profile");
          const response = await fetch(
            "http://192.168.1.8:3000/api/mobileconnection",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setUserName(data.user.name); // Assuming your API returns user data including the name
          } else {
            console.error("Failed to fetch user data:", data.error);
          }
        } else {
          console.log("No token found in storage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <StyledView className="w-full justify-center items-center h-full px-4">
        <Text style={styles.profileText}>Profile</Text>
        {userName ? (
          <Text style={styles.userName}>Welcome, {userName}</Text>
        ) : (
          // not connected
          <CustomButton
            title="Sign In"
            onPress={() => router.push("/sign-in")}
          />
        )}
      </StyledView>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    marginBottom: 16,
  },
});

export default Profile;
