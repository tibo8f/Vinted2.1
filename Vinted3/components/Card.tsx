import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

type NProp = {
  title: String;
  content: String;
  price: number;
  user: String;
  image: string;
};

const CardItem = (props: NProp) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `http://172.20.10.4:3000/${props.image}`, // "http://192.168.1.8:3000/images/Chaussure.jpg/boots.jpeg"
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.content}>{props.content}</Text>
        <Text style={styles.price}>${props.price}</Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    width: width - 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 450,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
    color: "#444",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
  },
});

export default CardItem;
