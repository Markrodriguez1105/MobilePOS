import {
  BackHandler,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/assets/Colors/Colors";
import ThemedText from "@/Components/ThemedText";
import Item from "@/Components/Item";
import Edit from "@/Components/Edit";
import FloatingButton from "@/Components/FloatingButton";
import Add from "@/Components/Add";
import { useItemContext } from "@/Context/context";

type inventoryProps = {
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        brandName: string;
        itemName: string;
        price: number;
      }[]
    >
  >;
  setSceen: (input: number) => void;
};

export default function inventory({ setItems, setSceen }: inventoryProps) {
  const [search, setSearch] = useState("");

  const items = useItemContext();

  const [modalVisible, setModalVisible] = useState<{
    id: number;
    state: boolean;
  }>({ id: 0, state: false });

  const [showAppModal, setAddModal] = useState(false);

  function addItemHandler(newItem: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  }) {
    setItems([...items, { ...newItem, id: randomizeId() }]);
  }

  function randomizeId() {
    let id: number;
    let hasDuplicate = true;
    do {
      id = Math.floor(Math.random() * 100);
      hasDuplicate = items.some((item) => item.id === id);
    } while (hasDuplicate);
    console.log(id);

    return id;
  }

  function setItemsHandler(selectedItem: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  }) {
    setItems(
      items.map((item) => (item.id == selectedItem.id ? selectedItem : item))
    );
  }

  function removeItemsHandler(selectedItem: {
    id: number;
    brandName: string;
    itemName: string;
    price: number;
  }) {
    setItems(items.filter((item) => item.id != selectedItem.id));
  }

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
      <ThemedText typo="header4">Inventory</ThemedText>
      <TextInput
        onChangeText={setSearch}
        style={styles.input_filled}
        placeholderTextColor={Colors.Text.dark}
        placeholder="Search item"
      />
      <ThemedText typo="note">Note: Click the item to edit</ThemedText>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {items
          .filter(
            (item) =>
              item.itemName.toLowerCase().includes(search.toLowerCase()) ||
              item.brandName.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setModalVisible({ id: item.id, state: true });
                }}
              >
                <Item
                  label={item.itemName}
                  brand={item.brandName}
                  price={item.price}
                />
                <Edit
                  parentModalVisible={
                    item.id == modalVisible.id ? modalVisible.state : false
                  }
                  parentSetModalVisible={setModalVisible}
                  selectItem={item}
                  setItemsHandler={setItemsHandler}
                  removeItemHandler={removeItemsHandler}
                ></Edit>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <FloatingButton
        iconName="plus"
        onPress={() => setAddModal(true)}
      ></FloatingButton>
      <Add
        showAppModal={showAppModal}
        setAddModal={setAddModal}
        addItemHandler={addItemHandler}
      ></Add>
    </View>
  );
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
});
