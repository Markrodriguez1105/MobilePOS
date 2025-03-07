import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import ThemedText from "./ThemedText";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/assets/Colors/Colors";

type ViewQuantityProps = {
  parentModalVisible?: boolean;
  parentSetQuantityVisible: React.Dispatch<React.SetStateAction<boolean>>;
  cart: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
    quantity: number;
  }[];
};

export default function ViewQuantity({
  parentModalVisible,
  parentSetQuantityVisible,
  cart,
}: ViewQuantityProps) {
  return (
    <Modal
      animationType="slide"
      visible={parentModalVisible}
      onRequestClose={() => {
        parentSetQuantityVisible(false);
      }}
    >
      <View style={styles.container}>
        <ThemedText typo="header4">Inside the Cart</ThemedText>
        {cart.length > 0 ? (
          cart.map((item) => (
            <View
              key={item.id}
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <View style={{ flexDirection: "column" }}>
                <ThemedText typo="header5">{item.brandName}</ThemedText>
                <ThemedText typo="body">{item.itemName}</ThemedText>
              </View>
              <View style={{ flexDirection: "column" }}>
                <ThemedText typo="body">Unit Price: {item.price}</ThemedText>
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ThemedText
              typo="header1"
              style={{
                color: Colors.Primary.medium,
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              ?
            </ThemedText>
            <FontAwesome
              name="shopping-basket"
              size={100}
              color={Colors.Primary.medium}
            ></FontAwesome>
            <ThemedText typo="body">No item</ThemedText>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    gap: 20,
  },
});
