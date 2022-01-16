import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as Notifications from "expo-notifications";
import { jokeAPI } from "../api/FetchJokes";
import { sendPushNotification } from "../utilities/sendPushNotification";

const DrawerContent = ({
  state,
  navigation,
  descriptors,
  progress,
  expoPushToken,
}) => {
  const [joke, setJoke] = useState({ setup: "", delivery: "" });
  const responseListener = useRef();

  // some response jokes only return 'delivery' so check if joke has both setup and delivery...
  // if it doesn't, fetch another...

  const fetchJoke = async () => {
    const response = await jokeAPI.get();
    const hasSetupAndDelivery =
      "setup" in response.data && "delivery" in response.data;

    if (hasSetupAndDelivery) {
      const { setup, delivery } = response.data;
      setJoke({ setup, delivery });
    } else {
      fetchJoke();
    }
  };

  useEffect(() => {
    // this useEffect only runs when a new joke is fetched...
    const { setup, delivery } = joke;
    if (setup.length > 0 && delivery.length > 0) {
      sendPushNotification({ expoPushToken, setup });
    }


/*
    listen for push notification, then close Drawer after responding to push notification

    navigation.navigate checks stack history to see if <Drawer.Screen name="Delivery" /> exists
    then creates one if it doesn't...
    then accepts params as second prop item
*/
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.closeDrawer();
        navigation.navigate("Delivery", { delivery });
      });

    return () => {
      // cleanup function to unsubscribe from listener
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [joke]);

  return (
    <DrawerContentScrollView {...{ state, navigation, descriptors, progress }}>
      <Button title="show me a joke" onPress={fetchJoke} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
