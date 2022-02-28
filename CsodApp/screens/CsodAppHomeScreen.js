import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export const CsodAppHomeScreen = () => {
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
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={async () => getTitles()} />
      <Text>{JSON.stringify(titles)}</Text>
      <Button title="Bigyo" onPress={async () => setTitles(12)} />
      <Text>-----</Text>
      <Button title="CsodAppHomeScreen" onPress={async () => setTitles(12)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
});
