import React from "react";
import { View } from "./View";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Button, Text } from "react-native";

export const StepUp = () => {
  const todos = useStoreState((state) => state.todos);
  const progress = useStoreState((state) => state.progress);
  const addTodo = useStoreActions((actions) => actions.addTodo);
  const addProgress = useStoreActions((actions) => actions.addProgress);
  return (
    <View>
      <Text>stepupup</Text>
      {todos.map((todo, idx) => (
        <Text key={idx}>{todo}</Text>
      ))}
      <Text>{`${progress}`}</Text>
      <Button title="Give" onPress={addTodo} />
      <Button title="Step up" onPress={addProgress} />
    </View>
  );
};
