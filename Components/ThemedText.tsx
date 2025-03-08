import { StyleSheet, Text, type TextProps } from "react-native";
import React from "react";
import { Colors } from "@/assets/Colors/Colors";

export type ThemedTextProps = TextProps & {
  typo:
    | "header1"
    | "header2"
    | "header3"
    | "header4"
    | "header5"
    | "body"
    | "body_bold"
    | "button"
    | "note";
};

export default function ThemedText({ typo, style, ...rest }: ThemedTextProps) {
  return <Text style={[styles[typo], style]} {...rest} />;
}

const styles = StyleSheet.create({
  header1: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.Text.dark,
  },
  header2: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.Text.dark,
  },
  header3: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.Text.dark,
  },
  header4: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.Text.dark,
  },
  header5: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Text.dark,
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    color: Colors.Text.dark,
  },
  body_bold: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Text.dark,
  },
  button: {
    fontSize: 16,
    fontWeight: "semibold",
    color: Colors.Text.dark,
  },
  note: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "italic",
    color: Colors.Text.dark,
  },
});
