import React, {useEffect} from "react";
import {View, StyleSheet} from "react-native";
import {getFirestore, collection, getDocs} from "firebase/firestore/lite";
import {useStoreActions} from "easy-peasy";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AcFetchData = () => {
    const setExercises = useStoreActions((actions) => actions.setExercises);
    const setProgress = useStoreActions((actions) => actions.setProgress);
    const setDoneExercisesToday = useStoreActions((actions) => actions.setDoneExercisesToday);
    const getTitles = async () => {
        const db = getFirestore();
        const table = collection(db, "test4");
        const titleCollection = await getDocs(table);
        const titles = titleCollection.docs.map((doc) => doc.data());
        titles.map((title, idx) => (title.index = idx));
        // setTitles(titles);
        if (titles.length) {
            try {
                await AsyncStorage.setItem('titles', JSON.stringify(titles));
            } catch (e) {
                // saving error
            }
        }
        const exercises = await AsyncStorage.getItem('titles');
        if (exercises !== null) {
            setExercises(titles);
        }
        const userProgress = await AsyncStorage.getItem('userProgress');
        if (userProgress !== null) {
            setProgress(JSON.parse(userProgress));
        } else {
            setProgress(0);
        }

        const doneExercisesToday = await AsyncStorage.getItem('doneExercisesToday');
        if (doneExercisesToday !== null) {
            setDoneExercisesToday(JSON.parse(doneExercisesToday));
        } else {
            setDoneExercisesToday(0);
        }
    };

    useEffect(() => {
        getTitles();
    }, []);

    return (
        <View style={styles.fetch}>
        </View>
    );
};

const styles = StyleSheet.create({
    fetch: {
        display: 'none',
    },
});
