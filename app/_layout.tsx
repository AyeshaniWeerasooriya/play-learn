import { Stack } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const lockLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    lockLandscape();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/LevelSelectionScreen"
          options={{ headerShown: false, title: "Select Levels" }}
        />
        <Stack.Screen
          name="screens/GameLevelOneScreen"
          options={{ headerShown: false, title: "Find the Different Color" }}
        />
        <Stack.Screen
          name="screens/GameLevelTwoScreen"
          options={{ headerShown: false, title: "Find the Different Shape" }}
        />
        <Stack.Screen
          name="screens/GameLevelThreeScreen"
          options={{ headerShown: false, title: "Find the Different Picture" }}
        />
        <Stack.Screen
          name="screens/GameLevelFourScreen"
          options={{ headerShown: false, title: "Find the Rotated Picture" }}
        />
      </Stack>
    </>
  );
}
