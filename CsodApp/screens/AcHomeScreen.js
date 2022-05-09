import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, ScrollView } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useStoreState, useStoreActions } from "easy-peasy";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AcFetchData} from "../components/AcFetchData";


export const AcHomeScreen = () => {
  const exercises = useStoreState((state) => state.exercises);

  return (
    <View style={styles.container}>
      <ScrollView>
        <AcFetchData></AcFetchData>
        {exercises.map((title, idx) => (
          <Text key={idx}>
            {title.title}: {title.text} : {title.index}
          </Text>
        ))}
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
