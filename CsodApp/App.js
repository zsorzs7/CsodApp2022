import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";

export default function App() {
  const component = (
    <Text style={styles.subTitle}>developed by CsodApp team</Text>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CsodApp</Text>
      <StatusBar style="auto" />
      {component}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    color: "#74bcc4",
  },
});
