import { View, Text, Button, Alert, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);

const Profile = () => {
  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <StyledView className="w-full justify-center items-center h-full px-4">
        <Text style={styles.profileText}>Profile</Text>
        <Button
          onPress={() => Alert.alert("Button with adjusted color pressed")}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <CustomButton title="Sign In" onPress={() => router.push("/sign-in")} />
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
});

export default Profile;
