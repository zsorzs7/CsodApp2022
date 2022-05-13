import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";


export const AcHomeScreen = ({ navigation }) => {
    const exercises = useStoreState((state) => state.exercises);

    return (
        <View style={styles.container}>
            <AcFetchData></AcFetchData>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('../assets/aclogo.png')}></Image>
                <Text style={styles.logoTextParts}>
                    <Text style={styles.logoTextPartsOne}>
                        CSOD
                    </Text>
                    <Text style={styles.logoTextPartsTwo}>
                        APP
                    </Text>
                </Text>
                <Pressable style={styles.button} onPress={() => {navigation.navigate('Progress')}}>
                    <Text style={styles.text}>Kurzus kezdése</Text>
                </Pressable>
                {/*{exercises.map((title, idx) => (*/}
                {/*  <Text key={idx}>*/}
                {/*    {title.title}: {title.text} : {title.index}*/}
                {/*  </Text>*/}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        height: "100%",
        backgroundColor: 'white'
    },
    logoTextParts: {
      paddingBottom: 40
    },
    logoTextPartsOne: {
        fontSize: 40,
        fontWeight: '700',
        color: '#9E99ED'
    },
    logoTextPartsTwo: {
        fontSize: 40,
        fontWeight: '700',
        color: '#F7C4D5'
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
