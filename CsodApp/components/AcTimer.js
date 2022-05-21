import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image, TouchableOpacityComponent} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BlurView} from "expo-blur";
import {Platform} from "react-native";
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export const AcTimer = () => {
    const exercises = useStoreState((state) => state.exercises);
    const userProgress = useStoreState((state) => state.progress);
    const [stateDoneExercises, setStateDoneExercises] = useState(doneExercisesToday);
    const doneExercisesToday = useStoreState((state) => state.doneExercisesToday);
    const addDoneExercise = useStoreActions((actions) => actions.addDoneExercise);

    const stepUpToday = () => {
        addDoneExercise();
        setStateDoneExercises(stateDoneExercises + 1);
    }


    return (<View style={[styles.timer, {height: screenHeight / 2}]}>
        <View style={styles.checkboxContainer}>
            {[1, 2, 3, 4, 5].map((todo, idx) => (
                idx + 1 <= doneExercisesToday ?
                    <Image style={styles.checkbox} source={require('../assets/checkbox-checked.png')}></Image>
                    :
                    <TouchableOpacity onPress={() => stepUpToday()}>
                        <Image style={styles.checkbox} source={require('../assets/checkbox.png')}></Image>
                    </TouchableOpacity>
            ))}
        </View>
    </View>);
};

const styles = StyleSheet.create({
    timer: {
        marginTop: 40,
        backgroundColor: '#F9F9F9',
        width: '100%',
        padding: 25,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
    },
    checkboxContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    checkbox: {
        width: 20,
        height: 20,
        margin: 8
    }
});
