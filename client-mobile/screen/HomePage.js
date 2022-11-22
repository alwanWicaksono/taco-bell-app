import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight2 = Dimensions.get("window").height * 0.5
const windowHeight = Dimensions.get("window").height * 0.1;
const image = { uri: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/496ecb14589707.562865d064f9e.png" };


export default function HomePage() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.borderImage}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://cdn.concreteplayground.com/content/uploads/2019/09/2016_TacoBellLogo_HorizontalCenter_Clr_Blk.png",
            }}
          />
        </View>
        <Image
          style={styles.image1}
          source={{
            uri: "https://assets.turbologo.com/blog/en/2020/02/19084615/Taco-Bell-958x575.png",
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    overflow: "hidden",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    flex: 1,
  },
  logo: {
    width: windowWidth,
    height: windowHeight,
  },
  image1: {
    marginTop: 100,
    width: windowWidth,
    height: windowHeight2,
  },
  borderImage: {
    marginTop: 10,
    borderBottomColor: "black",
    borderBottomWidth: 5,
    padding: 10
  }
});
