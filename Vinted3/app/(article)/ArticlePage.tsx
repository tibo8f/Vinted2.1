import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useNavigation, useLocalSearchParams, router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const ArticlePage = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { id, title, image, content, user, price } = params;

  const handleBuy = () => {
    Alert.alert(
      "Confirm Purchase",
      `Are you sure you want to buy this article?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Buy", onPress: () => handleBuyAction() },
      ],
      { cancelable: false }
    );
  };
  const handleBuyAction = async () => {
    console.log("Item purchased");
    try {
      const response = await fetch(
        `http://172.20.10.4:3000/api/mobiledeletearticle`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      if (response.ok) {
        console.log("Item deleted successfully");
        router.push("/(article)/ArticlePurchasedExit");
      } else {
        console.error("Failed to delete item:", response.statusText);
        Alert.alert("Error", "Failed to delete item. Please try again later.");
      }
    } catch (error) {
      console.error("Error while deleting item:", error);
      Alert.alert(
        "Error",
        "An error occurred while deleting item. Please try again later."
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Image
            source={{ uri: `http://172.20.10.4:3000/${image}` }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.articleDetails}>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.user}>Seller: {user}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleBuy}>
            <Text style={styles.buttonText}>Buy Article</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  image: {
    width: "100%",
    height: 450,
  },
  articleDetails: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007782",
    marginBottom: 20,
  },
  user: {
    fontSize: 16,
    color: "#888",
    marginBottom: 15,
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
});

export default ArticlePage;
