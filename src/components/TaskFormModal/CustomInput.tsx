import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function CustomInput({
  label,
  value,
  placeholder,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
}: Props) {
  return (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, multiline && { textAlignVertical: "top" }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  inputContainer: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  textInput: {
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4E",
    paddingVertical: 8,
  },
});
