import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./HomePage";
import Menu from "./Menu";
const Tab = createBottomTabNavigator();

export default function TabNavigation(){
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} >
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  )
}