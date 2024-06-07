import Card from "@/components/Card";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the Article type
type Article = {
  id: number;
  title: string;
  content: string;
  price: number;
  author: {
    name: string;
  };
  image: string;
};

const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Article[]>([]);

  const getItem = async () => {
    try {
      console.log("search");
      const response = await fetch("http://192.168.1.8:3000/api/newproduct", {
        method: "GET",
      });
      const json = await response.json();
      console.log("Got those items from the server", json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(article)/ArticlePage",
                params: {
                  id: item.id,
                  title: item.title,
                  content: item.content,
                  price: item.price,
                  user: item.author.name,
                  image: item.image,
                },
              })
            }
          >
            <Card
              title={item.title}
              content={item.content || ""}
              price={item.price}
              user={item.author.name || ""}
              image={item.image}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default Home;
