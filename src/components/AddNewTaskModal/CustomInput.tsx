import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface CustomInputProps {
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
}: CustomInputProps) {
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
    backgroundColor: "#4A4A4E",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#4A4A4E",
  },
  textInput: {
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 20,
  },
});
