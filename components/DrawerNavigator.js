import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DeliveryScreen from "../screens/DeliveryScreen";
import DrawerContent from "./DrawerContent";
import Tabs from '../components/Tabs';


/*
  The DrawerNavigator component acts as the root stack for the app,
  wrapping around the Tab Navigator and accepting it as props
  So every tab has access to the side drawer component 
*/

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ expoPushToken }) => {
  // pass drawerContent prop to override default behavior of Navigator and render custom elements
  
  // screen options false to prevent header property showing in Navigator
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={(props) => (
        <DrawerContent {...props} {...{ expoPushToken }} />
      )}
    >
      <Drawer.Screen name="App" component={Tabs} />
      <Drawer.Screen name="Delivery" component={DeliveryScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
