import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../assets/Colors/Colors";
import ThemedText from "@/Components/ThemedText";
import Item from "@/Components/Item";
import ViewQuantity from "@/Components/ViewQuantity";
import { useItemContext } from "@/Context/context";

type sellProps = {
  setSceen: (input: number) => void;
};

export default function sell({ setSceen }: sellProps) {
  const [search, setSearch] = useState("");
  const items = useItemContext();

  const [pickedItems, setPickedItems] = useState<
    {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
      quantity: number;
    }[]
  >(items.map((item) => ({ ...item, quantity: 0 })));

  const [quantityVisible, setQuantityVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setSceen(1);
      return true; // Prevent default behavior (exiting the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

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
        {pickedItems
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
          Items: {pickedItems.filter((item) => item.quantity > 0).length}
        </ThemedText>
        <ThemedText typo="body_bold">
          Total Price: ₱{" "}
          {totalAmount(pickedItems.filter((item) => item.quantity > 0))}
        </ThemedText>
      </TouchableOpacity>
      <ViewQuantity
        parentModalVisible={quantityVisible}
        parentSetQuantityVisible={setQuantityVisible}
        cart={pickedItems.filter((item) => item.quantity > 0)}
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
    setPickedItems(
      pickedItems.map((itemUpdate) =>
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
    setPickedItems(
      pickedItems.map((itemUpdate) =>
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
