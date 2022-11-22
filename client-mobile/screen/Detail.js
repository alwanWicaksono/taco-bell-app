import { ActivityIndicator, Dimensions, Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { GET_ITEM } from "../config/queries";
import { useQuery } from "@apollo/client";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height*0.5
const image = { uri: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/496ecb14589707.562865d064f9e.png" };

export default function Detail({route}) {
  let { id } = route.params;
  console.log(id);
  const { data, loading, error } = useQuery(GET_ITEM, {
    variables: {
      showItemDetailId: id,
    },
  });
  console.log(data);

  if(loading) {
    return <ActivityIndicator size="small" color="black" />
  }

  if(error){
    return <Text>Error</Text>
  }
  const item = data.showItemDetail;

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: item.imgUrl,
            }}
          />
          <Text>
            {item.name}
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    overflow : "hidden",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  card: {
    margin: 1,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 2
  },
  image: {
    width: windowWidth,
    height: windowHeight
  },
  imageBg: {
    flex: 1
  }
})