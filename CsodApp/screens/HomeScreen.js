/* DEPRECATED */

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { auth } from "../config";

export const HomeScreen = () => {
  const [titles, setTitles] = useState(0);

  const getTitles = async () => {
    const db = getFirestore();
    const table = collection(db, "media");
    const titleCollection = await getDocs(table);
    const titles = titleCollection.docs.map((doc) => doc.data());
    setTitles(titles);
  };

  useEffect(() => {
    getTitles();
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={async () => getTitles()} />
      <Text>{JSON.stringify(titles)}</Text>
      <Button title="Bigyo" onPress={async () => setTitles(12)} />
      <Text>CsodApp 2022</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
