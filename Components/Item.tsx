import { StyleSheet, View } from "react-native";
import React from "react";
import ThemedText from "./ThemedText";
import { Colors } from "@/assets/Colors/Colors";

type ItemProps = {
  label?: string;
  brand?: string;
  price?: number;
  quantity?: number;
};

export default function Item({
  label = "unknown",
  brand = "unknown",
  price = 0,
  quantity = 0,
}: ItemProps) {
  return (
    <View
      style={[
        styles.list,
        quantity > 0
          ? { backgroundColor: Colors.Primary.light_hover, borderRadius: 10 }
          : null,
      ]}
    >
      <View>
        <ThemedText typo="body_bold">{brand}</ThemedText>
        <ThemedText typo="body">{label}</ThemedText>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <ThemedText typo="body">₱ {price}</ThemedText>
        {quantity > 0 ? (
          <ThemedText typo="body_bold">Qty: {quantity}</ThemedText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
