
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AcNavigator } from "./navigation";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";

const App = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <AcNavigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
