// App.tsx
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./(tabs)/home";
import ArticlePage from "./(article)/ArticlePage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="ArticlePage"
          component={ArticlePage}
          options={{ title: "Article Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
