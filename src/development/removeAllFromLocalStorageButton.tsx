import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "tasks";

export default function RemoveAllFromLocalStorageButton() {
  const clearAllTasks = async () => {
    try {
      // First, get current tasks count for confirmation
      const existingTasks = await AsyncStorage.getItem(TASKS_KEY);
      const tasksCount = existingTasks ? JSON.parse(existingTasks).length : 0;

      if (tasksCount === 0) {
        Alert.alert("Info", "No tasks found in storage to remove", [
          { text: "OK" },
        ]);
        return;
      }

      // Show confirmation dialog
      Alert.alert(
        "Confirm Deletion",
        `Are you sure you want to remove all ${tasksCount} tasks from storage? This action cannot be undone.`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete All",
            style: "destructive",
            onPress: async () => {
              try {
                // Remove the tasks key from AsyncStorage
                await AsyncStorage.removeItem(TASKS_KEY);

                Alert.alert(
                  "Success!",
                  `Removed all ${tasksCount} tasks from localStorage`,
                  [{ text: "OK" }]
                );

                console.log(
                  `Successfully removed ${tasksCount} tasks from localStorage`
                );
              } catch (error) {
                console.error("Error removing tasks from localStorage:", error);
                Alert.alert(
                  "Error",
                  "Failed to remove tasks from localStorage",
                  [{ text: "OK" }]
                );
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error checking localStorage:", error);
      Alert.alert("Error", "Failed to access localStorage", [{ text: "OK" }]);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={clearAllTasks}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>🗑️</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E74C3C",
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
  },
});
