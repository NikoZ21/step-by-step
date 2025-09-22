import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dummyTasks } from "../temporary/dummydata";

const TASKS_KEY = "tasks";

export default function AddAllToLocalStorageButton() {
  const addAllDummyTasks = async () => {
    try {
      // Convert the dummy tasks to include createdAt and updatedAt dates
      const tasksWithDates = dummyTasks.map((task) => ({
        ...task,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Store all dummy tasks in AsyncStorage
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasksWithDates));

      Alert.alert(
        "Success!",
        `Added ${dummyTasks.length} tasks to localStorage`,
        [{ text: "OK" }]
      );

      console.log(
        `Successfully added ${dummyTasks.length} dummy tasks to localStorage`
      );
    } catch (error) {
      console.error("Error adding tasks to localStorage:", error);
      Alert.alert("Error", "Failed to add tasks to localStorage", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={addAllDummyTasks}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>📥</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2",
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
  },
});
