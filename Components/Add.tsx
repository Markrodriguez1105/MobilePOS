import { Modal, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/assets/Colors/Colors";
import ThemedText from "./ThemedText";
import CustomButton from "./CustomButton";
type AddProps = {
  showAppModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  addItemHandler: (newItem: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  }) => void;
};

export default function Add({
  showAppModal,
  setAddModal,
  addItemHandler,
}: AddProps) {
  const [item, setItem] = useState<{
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  }>({
    id: 0,
    brandName: "",
    itemName: "",
    price: 0,
  });
  return (
    <Modal
      visible={showAppModal}
      transparent={true}
      onRequestClose={() => setAddModal(false)}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <ThemedText typo="header5">Add Item</ThemedText>
          <ThemedText typo="body">Brand Name</ThemedText>
          <TextInput
            onChangeText={(text) => setItem({ ...item, brandName: text })}
            style={styles.input_filled}
            placeholder="Input here"
          />
          <ThemedText typo="body">Item Name</ThemedText>
          <TextInput
            onChangeText={(text) => setItem({ ...item, itemName: text })}
            style={styles.input_filled}
            placeholder="Input here"
          />
          <ThemedText typo="body">Unit Price (₱)</ThemedText>
          <TextInput
            onChangeText={(text) => setItem({ ...item, price: Number(text) })}
            style={styles.input_filled}
            keyboardType="numeric"
            placeholder="Input here"
          />
          <View style={styles.button_group}>
            <CustomButton
              iconPosition="left"
              name="plus"
              title="Add New Item"
              color={Colors.Text.light}
              bgColor={Colors.Primary.normal}
              onPress={() => {
                addItemHandler(item);
                setAddModal(false);
              }}
            ></CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input_filled: {
    color: Colors.Text.dark,
    fontSize: 15,
    backgroundColor: Colors.Primary.light,
    padding: 20,
    borderRadius: 10,
  },
  button_group: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: Colors.Primary.normal,
  },
  modalContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "hsla(208, 26.80%, 86.10%, 0.51)",
  },
  inputContainer: {
    backgroundColor: Colors.Text.light,
    padding: 20,
    margin: 50,
    borderRadius: 20,
    gap: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
});
