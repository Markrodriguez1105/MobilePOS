import { Modal, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/assets/Colors/Colors";
import ThemedText from "./ThemedText";
import CustomButton from "./CustomButton";

type EditProps = {
  parentModalVisible: boolean;
  parentSetModalVisible: React.Dispatch<
    React.SetStateAction<{ id: number; state: boolean }>
  >;
  setItemsHandler: (selectedItem: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  }) => void;
  removeItemHandler: (selectedItem: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  }) => void;
  selectItem: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  };
};

export default function Edit({
  parentModalVisible,
  parentSetModalVisible,
  selectItem,
  setItemsHandler,
  removeItemHandler,
}: EditProps) {
  const [item, editItem] = useState(selectItem);

  function closeModal() {
    parentSetModalVisible({ id: item.id, state: false });
    editItem(selectItem);
  }

  return (
    <Modal
      visible={parentModalVisible}
      animationType="slide"
      onRequestClose={closeModal}
      transparent={true}
    >
      <View
        style={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.Text.light,
            padding: 20,
            margin: 50,
            borderRadius: 30,
            gap: 10,
          }}
        >
          <ThemedText typo="header5">Edit Product Info</ThemedText>
          <ThemedText typo="body">Brand Name</ThemedText>
          <TextInput
            onChangeText={(text) => editItem({ ...item, brandName: text })}
            style={styles.input_filled}
            placeholderTextColor={Colors.Text.dark}
            value={item.brandName}
          />
          <ThemedText typo="body">Item Name</ThemedText>
          <TextInput
            onChangeText={(text) => editItem({ ...item, itemName: text })}
            style={styles.input_filled}
            placeholderTextColor={Colors.Text.dark}
            value={item.itemName}
          />
          <ThemedText typo="body">Unit Price (₱)</ThemedText>
          <TextInput
            onChangeText={(text) => editItem({ ...item, price: Number(text) })}
            style={styles.input_filled}
            placeholderTextColor={Colors.Text.dark}
            value={String(item.price)}
            keyboardType="numeric"
          />
          <View style={styles.button_group}>
            <CustomButton
              iconPosition="left"
              title="Remove"
              color={Colors.Text.light}
              name="trash"
              bgColor="#AD0020"
              onPress={() => {
                removeItemHandler(item);
                parentSetModalVisible({ id: item.id, state: false });
              }}
            />
            <CustomButton
              iconPosition="left"
              title="Save"
              color={Colors.Text.light}
              name="save"
              bgColor={Colors.Primary.normal}
              onPress={() => {
                setItemsHandler(item);
                parentSetModalVisible({ id: item.id, state: false });
              }}
            />
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
});
