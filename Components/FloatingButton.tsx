import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/assets/Colors/Colors";

type FloatingButtonProps = TouchableOpacityProps & {
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  iconName: keyof typeof FontAwesome.glyphMap;
  size?: number;
};

export default function FloatingButton({
  position = "bottomRight",
  iconName,
  size = 20,
  ...rest
}: FloatingButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, styles[position]]} {...rest}>
      <FontAwesome
        name={iconName}
        size={size}
        color={Colors.Text.light}
      ></FontAwesome>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colors.Primary.normal,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topLeft: {
    top: 50,
    left: 50,
  },
  topRight: {
    top: 50,
    right: 50,
  },
  bottomLeft: {
    bottom: 50,
    left: 50,
  },
  bottomRight: {
    bottom: 50,
    right: 50,
  },
});
