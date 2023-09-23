import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Routes } from "./src/routes";
import { Login } from "./src/screens/Login";

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" translucent backgroundColor="#242a32" />
      {userLoggedIn ? <Routes /> : <Login setUserLoggedIn={setUserLoggedIn} />}
    </View>
  );
}
