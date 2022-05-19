import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";


export const AcLibraryScreen = ({navigation}) => {
    const exercises = useStoreState((state) => state.exercises);
    const setCurrentlyViewedExercise = useStoreActions((actions) => actions.setCurrentlyViewedExercise);
    const setLastRouteRead = useStoreActions((actions) => actions.setLastRouteRead);

    const navigateToExercise = (id) => {
        setCurrentlyViewedExercise(id);
        setLastRouteRead();
        navigation.navigate('Read');
    }

    return (
        <View style={styles.container}>
            <AcFetchData></AcFetchData>
            <ScrollView>
                <View style={styles.pageContent}>
                    <Text style={styles.screenTitle}>Könyvtár</Text>
                    {exercises.map((title, idx) => (
                        title.title ?
                            <TouchableOpacity key={idx + '-library'} onPress={() => {navigateToExercise(idx)}} style={(idx === exercises.length - 1) ? styles.borderlessTitleContainer : styles.titleContainer }>
                                <Text style={styles.titleItemId}>
                                    {title.index + 1}.
                                </Text>
                                <Text style={styles.titleItemText}>
                                    {title.title}
                                </Text>
                            </TouchableOpacity> : <Text></Text>))}
                </View>
            </ScrollView>
            <View style={styles.menu}>
                <TouchableOpacity>
                    <Image style={styles.menuItem} source={require('../assets/read.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Progress')
                }}>
                    <Image style={styles.menuItem} source={require('../assets/home.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Settings')
                }}>
                    <Image style={styles.menuItem} source={require('../assets/settings.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        alignSelf: "stretch",
        minWidth: 300
    },
    borderlessTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 15,
        marginBottom: 10,
        borderBottomWidth: 0,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        alignSelf: "stretch",
        minWidth: 300
    },
    titleItemId: {
        paddingRight: 12,
        color: '#9E99ED'
    },
    titleItemText: {
        fontWeight: '700',

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
        paddingBottom: 30,
        paddingTop: 30
    },
    menuItem: {
        height: 40,
        width: 37
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#9E99ED',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
