import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image, TouchableOpacityComponent} from "react-native";
import {useStoreState, useStoreActions} from "easy-peasy";
import {AcFetchData} from "../components/AcFetchData";
import {TouchableOpacity} from "react-native-gesture-handler";


export const AcProgressScreen = ({navigation}) => {
    const exercises = useStoreState((state) => state.exercises);
    const userProgress = useStoreState((state) => state.progress);
    const [currentlyViewed, setCurrentlyViewed] = useState(userProgress);
    const addProgress = useStoreActions((actions) => actions.addProgress);
    const setCurrentlyViewedExercise = useStoreActions((actions) => actions.setCurrentlyViewedExercise);
    const setLastRouteProgress = useStoreActions((actions) => actions.setLastRouteProgress);

    const addProgressOnScreen = () => {
        if (userProgress < exercises.length - 1) {
            addProgress();
            setCurrentlyViewed(currentlyViewed + 1)
        }
    }

    const viewPrevious = () => {
        if (currentlyViewed > 0) {
            setCurrentlyViewed(currentlyViewed - 1);
        }
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

    const backIconStyle = {
        width: 42,
        height: 42,
        opacity: currentlyViewed ? 1 : 0.2
    };

    return (
        <View style={styles.container}>
            <View style={styles.alarmContainer}>
                <TouchableOpacity>
                    <Image style={styles.alarmIcon} source={require('../assets/alarm-on.png')}></Image>
                </TouchableOpacity>
            </View>
            <AcFetchData></AcFetchData>
            <ScrollView>
                {exercises.length ?
                    <Text style={styles.exerciseNumber}>{exercises[currentlyViewed].index + 1}. GYAKORLAT {currentlyViewed} {userProgress} {exercises.length} </Text> :
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
                        addProgressOnScreen();
                    }}>
                        <Image style={styles.nextIcon} source={require('../assets/next.png')}></Image>
                    </TouchableOpacity> : <TouchableOpacity onPress={() => {
                        viewNext();
                    }}>
                        <Image style={styles.nextIcon} source={require('../assets/view-next.png')}></Image>
                    </TouchableOpacity>
                    }
                </View>

                {/*<Image></Image>*/}
                {/*<Text style={styles.logoTextParts}>*/}
                {/*    <Text style={styles.logoTextPartsOne}>*/}
                {/*        PROG*/}
                {/*    </Text>*/}
                {/*    <Text style={styles.logoTextPartsTwo}>*/}
                {/*        RESS*/}
                {/*    </Text>*/}
                {/*</Text>*/}
                {/*<Pressable style={styles.button} title="Kezdés">*/}
                {/*    <Text style={styles.text}>Kurzus kezdése</Text>*/}
                {/*</Pressable>*/}
                {/*{exercises.map((title, idx) => (*/}
                {/*  <Text key={idx}>*/}
                {/*    {title.title}: {title.text} : {title.index}*/}
                {/*  </Text>*/}
            </ScrollView>
            <View style={styles.menu}>
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
        paddingTop: 200,
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
        height: 70
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
    exerciseIcons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 28,
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
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
