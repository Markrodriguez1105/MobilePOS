import { StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Colors } from "../assets/Colors/Colors";
import { ProductContext } from "@/Context/context";
import Items from "@/item_data.json";
import Landing from "./(pages)/landing";
import Sell from "./(pages)/sell";
import Inventory from "./(pages)/inventory";

export default function Index() {
  const [items, setItems] = useState<
    {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
    }[]
  >(Items);

  const [screen, setScreen] = useState<React.JSX.Element>(
    <Landing setSceen={changeScreen} />
  );

  function changeScreen(input: number) {
    switch (input) {
      case 1:
        setScreen(<Landing setSceen={changeScreen} />);
        break;
      case 2:
        setScreen(<Sell setSceen={changeScreen} />);
        break;
      case 3:
        setScreen(<Inventory setSceen={changeScreen} setItems={setItems} />);
        break;
    }
  }

  return (
    <ProductContext.Provider value={items}>
      <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
    </ProductContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary.light,
  },

  logo_container: {
    height: 300,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  typo_logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.Primary.normal,
  },

  sub_title: {
    fontSize: 20,
    color: Colors.Primary.medium,
  },

  menu_list: {
    flex: 1,
    alignItems: "center",
    gap: 30,
  },
});
