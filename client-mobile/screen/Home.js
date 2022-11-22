import { Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeight2 = Dimensions.get('window').height*0.5;



export default function Home({navigation}){
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')}>
        <Button
          title="Click to continue"
        />
        <Image
          style={styles.logo}
          source={{
            uri: 'https://i.pinimg.com/originals/fc/3a/c4/fc3ac410c4d41dca9871db884c5845eb.jpg',
          }}
        />
      </TouchableOpacity>
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
  userStyle:{
    fontSize:18,
    color:'white',
    fontWeight:'bold',
    textAlign: 'center',
    position: 'absolute'
  },
  logo: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover",
  },
  image: {
    width: windowWidth,
    height: windowHeight2
  }
});