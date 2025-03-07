import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Colors } from "../assets/Colors/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export type MenuProps = TouchableOpacityProps & {
  label?: string;
  bgcolor?: string;
  iconName?: "shopping-cart" | "shopping-basket";
};

export function Menu({ label, bgcolor, iconName, ...rest }: MenuProps) {
  return (
    <TouchableOpacity
      style={[styles.menu_icon, { backgroundColor: bgcolor }]}
      {...rest}
    >
      <FontAwesome name={iconName} color={Colors.Text.light} size={70} />
      <Text style={styles.menu_text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menu_icon: {
    gap: 20,
    backgroundColor: Colors.Primary.normal,
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: Colors.Text.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menu_text: {
    color: Colors.Text.light,
    fontSize: 20,
  },
});
