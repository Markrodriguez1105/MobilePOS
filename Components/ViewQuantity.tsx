import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  parentEditQuantity: (
    item: {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
      quantity: number;
    },
    amount: number
  ) => void;
  parentSetQuantity: (
    item: {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
      quantity: number;
    },
    amount: number
  ) => void;
};

export default function ViewQuantity({
  parentModalVisible,
  parentSetQuantityVisible,
  cart,
  parentEditQuantity,
  parentSetQuantity,
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
                {/* <ThemedText typo="body">Unit Price: {item.price}</ThemedText> */}
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={styles.adjustment}
                    onPress={() => parentEditQuantity(item, -1)}
                  >
                    {item.quantity > 1 ? (
                      <FontAwesome name="minus" color={Colors.Text.dark} />
                    ) : (
                      <FontAwesome name="trash" color="red" size={20} />
                    )}
                  </TouchableOpacity>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: Colors.Primary.medium,
                    }}
                    keyboardType="numeric"
                    value={String(item.quantity)}
                    onChangeText={(text) =>
                      parentSetQuantity(item, Number(text))
                    }
                  />
                  <TouchableOpacity
                    style={styles.adjustment}
                    onPress={() => parentEditQuantity(item, 1)}
                  >
                    <FontAwesome
                      name="plus"
                      size={15}
                      color={Colors.Text.dark}
                    />
                  </TouchableOpacity>
                </View>
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

  adjustment: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
  },
});
