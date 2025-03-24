// import { StyleSheet, Text, View } from "react-native";
import { createContext, useContext } from "react";

export const ProductContext = createContext<
  | {
      id: number;
      brandName: string;
      itemName: string;
      price: number;
    }[]
  | undefined
>(undefined);

export function useItemContext() {
  const item = useContext(ProductContext);

  if (item === undefined) {
    throw new Error("useItemContext must be use in ProductContext");
  }

  return item;
}
