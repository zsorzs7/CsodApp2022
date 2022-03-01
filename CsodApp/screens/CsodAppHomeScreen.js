import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, ScrollView } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { StepUp } from "../components/StepUp";

export const CsodAppHomeScreen = () => {
  const [titles, setTitles] = useState([]);

  const getTitles = async () => {
    const db = getFirestore();
    const table = collection(db, "test4");
    const titleCollection = await getDocs(table);
    const titles = titleCollection.docs.map((doc) => doc.data());
    titles.map((title, idx) => (title.index = idx));
    setTitles(titles);
  };

  useEffect(() => {
    getTitles();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title="Sign Out" onPress={async () => getTitles()} />
        {titles.map((title, idx) => (
          <Text key={idx}>
            {title.title}: {title.text} : {title.index}
          </Text>
        ))}
        <StepUp></StepUp>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
});
