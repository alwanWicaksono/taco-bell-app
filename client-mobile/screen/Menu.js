import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { GET_ITEMS } from "../config/queries";
import { useQuery } from "@apollo/client";
import ItemCard from "../components/ItemCard";

export default function Menu(){
  const { data, loading, error } = useQuery(GET_ITEMS);

  if(loading) {
    return <ActivityIndicator size="small" color="black" />
  }

  if(error){
    return <Text>Error</Text>
  }
  const items = data.showItems;

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <FlatList
        data={items}
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      ></FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    overflow: "hidden",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});