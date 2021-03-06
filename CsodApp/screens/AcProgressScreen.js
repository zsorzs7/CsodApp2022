import React, {useState, useEffect, useRef} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image, TouchableOpacityComponent, Alert} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BlurView} from "expo-blur";
import {Platform} from "react-native";
import {AcTimer} from "../components/AcTimer";
import {Dimensions} from 'react-native';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export const AcProgressScreen = ({navigation}) => {
    const exercises = useStoreState((state) => state.exercises);
    const userProgress = useStoreState((state) => state.progress);
    const [currentlyViewed, setCurrentlyViewed] = useState(userProgress);
    const addProgress = useStoreActions((actions) => actions.addProgress);
    const setCurrentlyViewedExercise = useStoreActions((actions) => actions.setCurrentlyViewedExercise);
    const setLastRouteProgress = useStoreActions((actions) => actions.setLastRouteProgress);
    const resetDoneExercisesToday = useStoreActions((actions) => actions.resetDoneExercisesToday);
    const currentlyViewedState = useStoreState((state) => state.currentlyViewedExercise);
    const useForceUpdate = () => useState()[1];
    const forceUpdate = useForceUpdate();
    const [modalOpen, setModalOpen] = useState(false);
    const [pushNotification, setPushNotification] = useState(false);


    /* region notification */

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const notificationTriggers = [
        { hour: 9, minute: 0, repeats: true },
        { hour: 10, minute: 0, repeats: true },
        { hour: 11, minute: 0, repeats: true },
        { hour: 12, minute: 0, repeats: true },
        { hour: 13, minute: 0, repeats: true },
        { hour: 14, minute: 0, repeats: true },
        { hour: 14, minute: 2, repeats: true },
        { hour: 14, minute: 4, repeats: true },
        { hour: 15, minute: 0, repeats: true },
        { hour: 16, minute: 0, repeats: true },
        { hour: 17, minute: 0, repeats: true },
        { hour: 17, minute: 47, repeats: true },
        { hour: 18, minute: 0, repeats: true },
        { hour: 19, minute: 0, repeats: true },
        { hour: 20, minute: 0, repeats: true },
        { hour: 21, minute: 0, repeats: true }
    ]

    async function schedulePushNotification() {
        try {
            for (const notification of notificationTriggers) {
                // console.log('notification');
                await Notifications.scheduleNotificationAsync({
                    content: {
                        body: `${exercises[currentlyViewed + 1].title}`,
                        title: `CsodApp | ${exercises[currentlyViewed + 1].index + 1}. gyakorlat`,
                        // data: {data: 'goes here'},
                    },
                    trigger: { seconds: 2, repeats: true }
                });
            }
        } catch(e) {
            // console.log(e);
        }
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                // console.log('first not g');
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                // console.log('still not  not g');

                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            // console.log(token);
        } else {
            //
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    /* endregion */

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        navigation.addListener('focus', async () => {
            const viewed = await AsyncStorage.getItem('userProgress');
            const cameFromProgress =  await AsyncStorage.getItem('cameFromSettings');
            // forceUpdate();
            if(JSON.parse(cameFromProgress)) {
                setCurrentlyViewed(viewed);
                viewCurrent(JSON.parse(viewed) - 1);
            }
            await AsyncStorage.setItem('cameFromSettings', JSON.stringify(false));
            if(isMounted) {
                let notificationEnabled = await AsyncStorage.getItem('notificationEnabled');
                if (JSON.parse(notificationEnabled)) {
                    setPushNotification(true);
                }
            }
        });
        if(isMounted) {
            // console.log('register');
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                // console.log(response);
            });
        }

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            isMounted = false;
        };
        // return () => { unsubscribe(); };
    }, [navigation]);

    const togglePushNotification = async () => {
        let notificationEnabled = await AsyncStorage.getItem('notificationEnabled');
        if(JSON.parse(notificationEnabled)) {
            await Notifications.cancelAllScheduledNotificationsAsync();
            await schedulePushNotification();
        }
    }

    const addProgressOnScreen = async () => {
        if (userProgress < exercises.length - 1) {
            addProgress();
            await saveProgressToAsyncStorage(currentlyViewed);
            setCurrentlyViewed(currentlyViewed + 1);
            await togglePushNotification();
            setModalOpen(false);
            resetDoneExercisesToday();
            await setDoneExercisesAsyncStorage(0);
        }
    }

    const saveProgressToAsyncStorage = async (progress) => {
        await AsyncStorage.setItem('userProgress', JSON.stringify(progress + 1));
    }

    const viewPrevious = () => {
        if (currentlyViewed > 0) {
            setCurrentlyViewed(currentlyViewed - 1);
        }
    }

    const viewCurrent = (num) => {
        setCurrentlyViewed(num);
    }

    const viewNext = () => {
        if (currentlyViewed <= exercises.length && currentlyViewed <= userProgress) {
            setCurrentlyViewed(currentlyViewed + 1);
        }
    }

    const expandExercise = () => {
        setCurrentlyViewedExercise(currentlyViewed);
        setLastRouteProgress();
        navigation.navigate('Read');
    }

    const setDoneExercisesAsyncStorage = async (number) => {
        try {
            await AsyncStorage.setItem('doneExercisesToday', JSON.stringify(number));
        }
        catch(e){
            //
        }
    }

    const backIconStyle = {
        width: 42,
        height: 42,
        opacity: currentlyViewed ? 1 : 0.4
    };

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
                        <Text style={styles.modalText}>V??gezt??l m??ra?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity onPress={() => {
                                setModalOpen(false)
                            }} style={styles.modalNoButton}>
                                <Text style={styles.textNoButton}>Nem</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalYesButton} onPress={() => {
                                addProgressOnScreen()
                            }}>
                                <Text style={styles.text}>Igen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </View>
            <View style={styles.alarmContainer}>
                <TouchableOpacity>
                    <Image style={styles.alarmIcon} source={require('../assets/alarm-on.png')}></Image>
                </TouchableOpacity>
            </View>
            <AcFetchData></AcFetchData>
            <ScrollView key={currentlyViewedState + currentlyViewed} contentContainerStyle={{
                marginLeft: 0,
                width: screenWidth,
                justifyContent: 'center',
                alignItems: 'center'
            }} contentInset={{top: 0, left: 0, bottom: 0, right: 0}}>
                {exercises.length ?
                    <Text style={styles.exerciseNumber}>{exercises[currentlyViewed].index + 1}. GYAKORLAT</Text> :
                    <Text></Text>}
                {exercises.length ? <Text style={styles.exerciseTitle}>{exercises[currentlyViewed].title}</Text> :
                    <Text></Text>}
                <View style={styles.exerciseIcons}>
                    <TouchableOpacity onPress={() => viewPrevious()}>
                        <Image style={backIconStyle} source={require('../assets/back.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => expandExercise()}>
                        <Image style={styles.expandIcon} source={require('../assets/expand.png')}></Image>
                    </TouchableOpacity>
                    {currentlyViewed === userProgress ? <TouchableOpacity onPress={() => {
                        if (userProgress === exercises.length - 1) {
                            return;
                        }
                        if (Platform.OS !== 'ios') {
                            setModalOpen(true);
                        } else {
                            addProgressOnScreen();
                        }
                    }}>
                        <Image style={[nextIconStyle]} source={require('../assets/next.png')}></Image>
                    </TouchableOpacity> : <TouchableOpacity onPress={() => {
                        viewNext();
                    }}>
                        <Image style={styles.nextIcon} source={require('../assets/view-next.png')}></Image>
                    </TouchableOpacity>
                    }
                </View>
                {currentlyViewed === userProgress ? <AcTimer></AcTimer> : <View style={{height: screenHeight / 2}}></View>
                }
            </ScrollView>
            <View style={menu}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Library')
                }}>
                    <Image style={styles.menuItem} source={require('../assets/read.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
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
        color: 'black',

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
    alarmContainer: {
        height: 60,
        width: 60,
        position: "absolute",
        right: 20,
        top: 45,
    },
    alarmIcon: {
        height: 60,
        width: 60,
        opacity: 0.4
    },
    exerciseNumber: {
        textAlign: 'center',
        paddingTop: 150,
        fontSize: 20,
        paddingBottom: 18
    },
    exerciseTitle: {
        fontSize: 19,
        fontWeight: '700',
        paddingBottom: 18,
        textAlign: 'center',
        width: 260,
        maxWidth: 260,
        height: 70,
        marginBottom: 10
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
        backgroundColor: 'white'
    },
    exerciseIcons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 260,
        maxWidth: 260
    },
    backIcon: {
        width: 42,
        height: 42
    },
    expandIcon: {
        width: 60,
        height: 60
    },
    nextIcon: {
        width: 42,
        height: 42
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
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textNoButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#9E99ED',
    },
});
