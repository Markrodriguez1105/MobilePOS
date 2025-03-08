import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../assets/Colors/Colors";
import ThemedText from "@/Components/ThemedText";
import Item from "@/Components/Item";
import Items from "@/item_data.json";
import ViewQuantity from "@/Components/ViewQuantity";

export default function sell() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<
    {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
      quantity: number;
    }[]
  >(
    Items.map((item) => {
      return {
        ...item,
        quantity: 0,
      };
    })
  );

  const [quantityVisible, setQuantityVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText typo="header4">List of Items</ThemedText>
      <TextInput
        onChangeText={setSearch}
        style={styles.input_filled}
        placeholderTextColor={Colors.Text.dark}
        placeholder="Search item"
      />
      <ThemedText typo="note">
        Note: Click the item to add to cart and increase the quantity.
      </ThemedText>
      <ScrollView contentContainerStyle={styles.container_list}>
        {items
          .filter(
            (item) =>
              item.itemName.toLowerCase().includes(search.toLowerCase()) ||
              item.brandName.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                editQuantityHandler(item, 1);
              }}
            >
              <Item
                label={item.itemName}
                brand={item.brandName}
                price={item.price}
                quantity={item.quantity}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          setQuantityVisible(true);
        }}
        style={styles.total_container}
      >
        <ThemedText typo="body_bold">
          Items: {items.filter((item) => item.quantity > 0).length}
        </ThemedText>
        <ThemedText typo="body_bold">
          Total Price: ₱{" "}
          {totalAmount(items.filter((item) => item.quantity > 0))}
        </ThemedText>
      </TouchableOpacity>
      <ViewQuantity
        parentModalVisible={quantityVisible}
        parentSetQuantityVisible={setQuantityVisible}
        cart={items.filter((item) => item.quantity > 0)}
        parentEditQuantity={editQuantityHandler}
        parentSetQuantity={setQuantityHandler}
      />
    </View>
  );

  function editQuantityHandler(
    item: {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
      quantity: number;
    },
    amount: number
  ) {
    setItems(
      items.map((itemUpdate) =>
        itemUpdate.id === item.id
          ? { ...itemUpdate, quantity: itemUpdate.quantity + amount }
          : itemUpdate
      )
    );
  }
  function setQuantityHandler(
    item: {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
      quantity: number;
    },
    amount: number
  ) {
    setItems(
      items.map((itemUpdate) =>
        itemUpdate.id === item.id
          ? { ...itemUpdate, quantity: amount }
          : itemUpdate
      )
    );
  }
}

function totalAmount(
  cart: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
    quantity: number;
  }[]
) {
  let total = 0;
  cart.map((item) => {
    total += item.price * item.quantity;
  });
  return total;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
    gap: 10,
    backgroundColor: Colors.Primary.light,
  },

  input_filled: {
    color: Colors.Text.dark,
    fontSize: 15,
    backgroundColor: Colors.Primary.light_hover,
    padding: 20,
    borderRadius: 10,
  },

  container_list: {
    gap: 10,
  },

  total_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.Primary.light_hover,
    borderRadius: 10,
  },
});
