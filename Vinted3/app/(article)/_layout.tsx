import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ArticleLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="ArticlePage" options={{ headerShown: false }} />

        <Stack.Screen
          name="ArticlePurchasedExit"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default ArticleLayout;
