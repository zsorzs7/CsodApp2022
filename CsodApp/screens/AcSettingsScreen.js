import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image, TextInput} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BlurView} from "expo-blur";


export const AcSettingsScreen = ({navigation}) => {
    const exercises = useStoreState((state) => state.exercises);
    const setCurrentlyViewedExercise = useStoreActions((actions) => actions.setCurrentlyViewedExercise);
    const setLastRouteRead = useStoreActions((actions) => actions.setLastRouteRead);
    const userProgress = useStoreState((state) => state.progress);
    const addProgress = useStoreActions((actions) => actions.addProgress);
    const resetDoneExercisesToday = useStoreActions((actions) => actions.resetDoneExercisesToday);
    const setProgress = useStoreActions((actions) => actions.setProgress);


    const [darkMode, setDarkMode] = useState(false);
    const [pushNotification, setPushNotification] = useState(false);

    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState(userProgress + 1);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const togglePushNotification = () => {
        setPushNotification(!pushNotification)
    }

    const [modalOpen, setModalOpen] = useState(false);

    const addProgressOnScreen = async () => {
        // if (userProgress < exercises.length - 1) {
            const saveToAsync = Number(number) - 1;
            setProgress(saveToAsync);
            await saveProgressToAsyncStorage(saveToAsync);
            setModalOpen(false);
            resetDoneExercisesToday();
            await setDoneExercisesAsyncStorage(0);
        // }
    }

    const setDoneExercisesAsyncStorage = async (number) => {
        try {
            await AsyncStorage.setItem('doneExercisesToday', JSON.stringify(number));
        }
        catch(e){
            //
        }
    }

    const saveProgressToAsyncStorage = async (progress) => {
        await AsyncStorage.setItem('userProgress', JSON.stringify(progress + 1));
    }


    const modalStyle = {
        position: modalOpen ? 'absolute' : 'relative',
        left: 0,
        top: 0,
        bottom: 0,
        padding: 0,
        zIndex: 10,
        display: 'none',
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    }

    const modalDisplay = {
        display: modalOpen ? 'none' : 'flex',
        position: modalOpen ? 'absolute' : 'relative',
        left: 0,
        top: 0,
        bottom: 0,
        width: '100%'
    }

    const nextIconStyle = {
        width: 42,
        height: 42,
        opacity: userProgress === exercises.length - 1 ? 0.4 : 1
    };

    const menu = {
        display: modalOpen ? 'none' : 'flex',
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
        position: modalOpen ? 'relative' : 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    };

    return (
        <View style={styles.container}>
            <View style={modalDisplay}>
                <BlurView intensity={100} tint="light" style={modalStyle}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>Biztosan a {number}. gyakorlattól folytatod tovább?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity onPress={() => {
                                setModalOpen(false)
                            }} style={styles.modalNoButton}>
                                <Text style={styles.textNoButton}>Nem</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalYesButton} onPress={() => {
                                addProgressOnScreen();
                            }}>
                                <Text style={styles.text}>Igen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </View>
            <AcFetchData></AcFetchData>
            <ScrollView>
                <View style={styles.pageContent}>
                    <Text style={styles.screenTitle}>BEÁLLÍTÁSOK</Text>
                    <View style={[styles.titleContainer]}>
                        <Text style={[{opacity: 0.3},styles.titleItemText]}>
                            Sötét mód
                        </Text>
                        {/* @TODO <TouchableOpacity */}
                        <View style={[styles.titleItemText, {opacity: 0.3}]} onPress={() => toggleDarkMode()}>
                            {darkMode ?
                                <Image style={{height: 38, width: 66}} source={require('../assets/radio-checked.png')}></Image> :
                                <Image style={{height: 38, width: 66}} source={require('../assets/radio.png')}></Image>}
                        </View>
                    </View>
                    <View style={[styles.titleContainer]}>
                        <Text style={styles.titleItemText}>
                            Értesítések
                        </Text>
                        <TouchableOpacity style={styles.titleItemText} onPress={() => togglePushNotification()}>
                            {pushNotification ?
                                <Image style={{height: 38, width: 66}} source={require('../assets/radio-checked.png')}></Image> :
                                <Image style={{height: 38, width: 66}} source={require('../assets/radio.png')}></Image>}
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.titleContainer]}>
                        <Text style={styles.titleItemText}>
                            Aktuális gyakorlat
                        </Text>
                        <TouchableOpacity style={styles.titleItemText}>
                            <TextInput
                                style={{height: 38, width: 66, backgroundColor: 'white', borderRadius: 4, borderWidth: 1, borderColor: '#cccccc', borderStyle: 'solid', textAlign: 'center'}}
                                onEndEditing={text => { onChangeNumber(text.nativeEvent.text); setModalOpen(true); }}
                                keyboardType="numeric"
                                placeholder={(userProgress + 1) + ''}
                                // editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.borderlessTitleContainer, {opacity: 0.3}]}>
                        <Text style={styles.titleItemText}>
                            Értesítési hang
                        </Text>
                        {/* @TODO <TouchableOpacity> */}
                        <View style={[styles.titleItemText]}>
                            <Text style={{color: '#9E99ED'}}>
                                Alapértelmezett
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={menu}>
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
    modalBox: {
        bottom: 0,
        padding: 20,
        paddingBottom: 30,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
        borderRadius: 0,
        position: "absolute"
    },
    modalText: {
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        color: 'black'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        alignSelf: "stretch",
        minWidth: 300,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300
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
        minWidth: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleItemId: {
        paddingRight: 12,
        color: '#9E99ED'
    },
    titleItemText: {
        color: 'black',
        fontWeight: '400'

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
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center'
    },
    modalYesButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#9E99ED',
        marginLeft: 7,
        borderColor: '#9E99ED',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    modalNoButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        borderColor: '#9E99ED',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        marginRight: 7
    },
    // text: {
    //     fontSize: 16,
    //     lineHeight: 21,
    //     fontWeight: 'bold',
    //     letterSpacing: 0.25,
    //     color: 'white',
    // },
    textNoButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#9E99ED',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
