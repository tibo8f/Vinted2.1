import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

// type Item = {
//   id: string;
//   title: string;
//   releaseYear: string;
// };

const App = () => {
  const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState<Item[]>([]);

  const getItem = async () => {
    try {
      console.log("search");
      const response = await fetch("http://192.168.1.8:3000/api/newproduct", {
        method: "GET",
      });
      console.log("Get was made");
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    // <View style={{ flex: 1, padding: 24 }}>
    //   {isLoading ? (
    //     <ActivityIndicator />
    //   ) : (
    //     <FlatList
    //       data={data}
    //       keyExtractor={({ id }) => id}
    //       renderItem={({ item }) => (
    //         <Text>
    //           {item.title}, {item.releaseYear}
    //         </Text>
    //       )}
    //     />
    //   )}
    // </View>
    <Text>Hello</Text>
  );
};

export default App;
