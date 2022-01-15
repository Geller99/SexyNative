import React from "react";
import { StyleSheet, Text, View } from "react-native";

/* 
    Delivery screen pops up after notification is dismissed and displays delivered joke
*/
const DeliveryScreen = ({ route }) => {
  const { delivery } = route.params;
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
  });
  return (
    <View style={styles.container}>
      <Text>{delivery}</Text>
    </View>
  );
};

export default DeliveryScreen;
