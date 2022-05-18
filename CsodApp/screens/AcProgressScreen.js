import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";


export const AcProgressScreen = ({navigation}) => {
    const exercises = useStoreState((state) => state.exercises);

    return (
        <View style={styles.container}>
            <AcFetchData></AcFetchData>
            <ScrollView>
                <Image source={require('../assets/aclogo.png')}></Image>
                <Text style={styles.logoTextParts}>
                    <Text style={styles.logoTextPartsOne}>
                        PROG
                    </Text>
                    <Text style={styles.logoTextPartsTwo}>
                        RESS
                    </Text>
                </Text>
                <Pressable style={styles.button} title="Kezdés">
                    <Text style={styles.text}>Kurzus kezdése</Text>
                </Pressable>
                {/*{exercises.map((title, idx) => (*/}
                {/*  <Text key={idx}>*/}
                {/*    {title.title}: {title.text} : {title.index}*/}
                {/*  </Text>*/}
            </ScrollView>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Library')}}>
                    <Image style={styles.menuItem} source={require('../assets/read.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Image style={styles.menuItem} source={require('../assets/home.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Settings')}}>
                    <Image style={styles.menuItem} source={require('../assets/settings.png')}></Image>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    menuItem: {
        height: 40,
        width: 37
    },
    container: {
        flex: 1,
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        height: "100%",
        backgroundColor: '#F9F9F9'
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
