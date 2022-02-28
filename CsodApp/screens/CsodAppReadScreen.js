import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export const CsodAppReadScreen = () => {
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
      <Text>Read</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
