import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";


export const AcReadScreen = ({navigation}) => {
    const exercises = useStoreState((state) => state.exercises);
    const currentlyViewedExercise = useStoreState((state) => state.currentlyViewedExercise);
    const lastRoute = useStoreState((state) => state.lastRoute);

    return (
        <View style={styles.container}>
            <AcFetchData></AcFetchData>
            <ScrollView>
                <View style={styles.pageContent}>
                    <Text style={styles.screenTitle}>{currentlyViewedExercise + 1}. gyakorlat</Text>
                    <Text style={styles.exerciseTitle}>{exercises[currentlyViewedExercise].title}</Text>
                    {exercises[currentlyViewedExercise].text.split(/[0-9]|[0-9][0-9]|[1-9]0+/).filter(title => title.length).map((title, idx) => (
                            <Text key={idx + '-part'} style={styles.exercisePart}>{idx + 1}{title}</Text>
                            ))}
                </View>
            </ScrollView>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => {
                    if(lastRoute === 'read') {
                        navigation.navigate('Library');
                    } else {
                        navigation.navigate('Progress');
                    }
                }}>
                    <Image style={styles.menuItem} source={require('../assets/back.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    exerciseTitle: {
      fontWeight: '700',
      fontSize: 16,
      paddingBottom: 10,
    },
    exercisePart: {
      paddingBottom: 12
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-around",
        paddingTop: 12,
        height: 64,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
        backgroundColor: 'white',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
    pageContent: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 80,
        flex: 1,
        width: '100%',
        alignSelf: "stretch"
    },
    screenTitle: {
        textTransform: 'uppercase',
        fontSize: 26,
        fontStyle: 'normal',
        paddingBottom: 20,
        paddingTop: 30
    },
    menuItem: {
        height: 40,
        width: 40
    },
    container: {
        flex: 1,
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#F9F9F9',
        height: '100%',
        alignSelf: "stretch"
    },
    scrollContainer: {
        flex: 1,
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        alignSelf: "stretch"
    },
});
