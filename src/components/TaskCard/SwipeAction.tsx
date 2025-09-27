import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import Reanimated, {
  SharedValue,
  useDerivedValue,
} from "react-native-reanimated";

interface Props {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  icon: string;
  text: string;
  actionStyle: StyleProp<ViewStyle>;
  onProgress?: (progress: number) => void;
}

export default function SwipeAction({
  prog,
  drag,
  icon,
  text,
  actionStyle,
  onProgress,
}: Props) {
  const _ = useDerivedValue(() => {
    "worklet"; // This function runs on UI thread

    // Call the callback to update parent's shared value
    if (onProgress) {
      onProgress(prog.value);
    }

    return prog.value; // Return value (we don't use it, but useDerivedValue needs a return)
  }, [prog]);

  return (
    <Reanimated.View style={styles.container}>
      <View style={[actionStyle, styles.innercontainer]}>
        <Text style={styles.actionIcon}>{icon}</Text>
        <Text style={styles.actionText}>{text}</Text>
      </View>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 16,
  },
  innercontainer: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  action: {
    width: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
