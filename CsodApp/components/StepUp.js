/* DEPRECATED */

import React, {useEffect, useState} from "react";
import { View } from "./View";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const StepUp = () => {
    const [progressFromStorage, setProgressFromStorage] = useState('nothing set yet');
    const [tryCounter, setTryCounter] = useState(0);
    const [titles, setTitles] = useState({})

  const todos = useStoreState((state) => state.todos);
  const progress = useStoreState((state) => state.progress);
  const addTodo = useStoreActions((actions) => actions.addTodo);
  const addProgress = useStoreActions((actions) => actions.addProgress);


    const storeData = async () => {
        try {
            await AsyncStorage.setItem('progress', JSON.stringify(progress));
        } catch (e) {
            // saving error
        }
    }
    let savedProgress = 'nothing here so far';
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('progress');
            if(value !== null) {
                savedProgress = 'no progress saved'
                setProgressFromStorage(value);
            }
            const titles = await AsyncStorage.getItem('titles');
            if(titles !== null) {
                savedProgress = 'no progress saved'
                setTitles(JSON.parse(titles));
            }
        } catch(e) {
            // error reading value
        } finally {
            setTryCounter(tryCounter + 1);
        }
    }

    //  useEffect(async () => {
    //     await getData();
    // }, []);

  return (
    <View>
      <Text>stepupup</Text>
      {todos.map((todo, idx) => (
        <Text key={idx}>{todo}</Text>
      ))}
      <Text>{`${progress}`}</Text>
      <Button title="Give" onPress={addTodo} />
        <Text>savedProgress = {`${progressFromStorage}  ${tryCounter}`}</Text>
      <Button title="Step up" onPress={addProgress} />
        <Button title="Save data" onPress={storeData} />
        <Button title="Get data" onPress={getData} />
        <Text>{`${titles[0]?.text ? titles[0].text : ''}`}</Text>
        <Text>{`${titles[1]?.text ? titles[1].text : ''}`}</Text>
    </View>
  );
};
