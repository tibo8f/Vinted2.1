import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

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

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Article[]>([]);

  const getItem = async () => {
    try {
      console.log("search");
      const response = await fetch("http://192.168.1.8:3000/api/newproduct", {
        method: "GET",
      });
      console.log("Get was made");
      const json = await response.json();
      console.log(json);
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
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            content={item.content || ""}
            price={item.price}
            user={item.author.name || ""}
            image={item.image}
          />
        )}
      />
    </View>
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

export default App;
