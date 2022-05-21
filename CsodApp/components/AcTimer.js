import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image, TouchableOpacityComponent} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BlurView} from "expo-blur";
import {Platform} from "react-native";
import {Dimensions} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export const AcTimer = () => {
    const exercises = useStoreState((state) => state.exercises);
    const userProgress = useStoreState((state) => state.progress);
    const doneExercisesToday = useStoreState((state) => state.doneExercisesToday);
    const [stateDoneExercises, setStateDoneExercises] = useState(doneExercisesToday);
    const addDoneExercise = useStoreActions((actions) => actions.addDoneExercise);
    const [isPlaying, setIsPlaying] = useState(false);

    const stepUpToday = () => {
        addDoneExercise();
        setStateDoneExercises(stateDoneExercises + 1);
    }


    return (<View style={[styles.timer, {height: screenHeight / 2}]}>
        <View style={{backgroundColor: 'white', borderRadius: 100, padding: 10, elevation: 1}}>
            <View style={{borderRadius: 100, padding: 0, borderWidth: 0, borderStyle: 'dashed'}}>
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={60}
            colors={['#9E99ED', '#F7C4D5']}
            strokeWidth={18}
            trailColor={'white'}
            strokeLinecap={'butt'}
        >
            {({ remainingTime }) =><View style={{height: 143, width: 143, backgroundColor: 'white', borderRadius: 100, alignItems: 'center', justifyContent: 'center', elevation: 1}}>
                { isPlaying ?
                    <TouchableOpacity onPress={() => {setIsPlaying(false)}}>
                        <Image style={{height: 36.73, width: 36}} source={require('../assets/stop.png')}></Image>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => {setIsPlaying(true)}}>
                    <Image style={{height: 39.73, width: 36}} source={require('../assets/start.png')}></Image>
                </TouchableOpacity> }
            </View>}
        </CountdownCircleTimer>
            </View>
        </View>
        <View style={styles.checkboxContainer}>
            {[1, 2, 3, 4, 5].map((todo, idx) => (
                idx + 1 <= doneExercisesToday ?
                    <Image style={styles.checkbox} key={idx} source={require('../assets/checkbox-checked.png')}></Image>
                    :
                    <TouchableOpacity key={idx} onPress={() => stepUpToday()}>
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
        flexDirection: 'row',
        marginTop: 15
    },
    checkbox: {
        width: 20,
        height: 20,
        margin: 8
    }
});
