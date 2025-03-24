import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../assets/Colors/Colors";
import { Menu } from "../../Components/Menu";

type landingProps = {
  setSceen: (input: number) => void;
};

export default function landing({ setSceen }: landingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Text style={styles.typo_logo}>SARI SYSTEM</Text>
        <Text style={styles.sub_title}>Point of Sale System</Text>
      </View>
      <View style={styles.menu_list}>
        <Menu
          bgcolor={Colors.Primary.normal}
          label="Sell Items"
          iconName="shopping-basket"
          onPress={() => setSceen(2)}
        />
        <Menu
          bgcolor={Colors.Primary.normal}
          label="Inventory"
          iconName="archive"
          onPress={() => setSceen(3)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
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
