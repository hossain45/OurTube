import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";


export default function App() {
  return (
    <View style={styles.container}>
      <Text className="text-xl bg-yellow-300 w-full text-center">Hello world!</Text>
      <StatusBar style="auto" />
      <Link href="./profile" style={{ color: "blue", paddingTop: 20 }}>
        Go To Profile
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
