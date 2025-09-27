import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TasksProvider from "./providers/TasksProvider";
import Tasks from "./pages/Tasks";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TasksProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A1E" }}>
          <StatusBar style="light" />
          <Tasks />
        </SafeAreaView>
      </TasksProvider>
    </GestureHandlerRootView>
  );
}
