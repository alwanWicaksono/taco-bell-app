import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height*0.5

function ItemCard({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card}
      onPress={() =>
      navigation.navigate("Detail", {
        id: item.id,
      })
    }>
      <Image
        style={styles.image}
        source={{
          uri: item.imgUrl,
        }}
      />
      <Text>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 1,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 2
  },
  image: {
    width: windowWidth,
    height: windowHeight
  }
})
export default ItemCard