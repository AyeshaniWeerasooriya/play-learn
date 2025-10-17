import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
    </Stack>
  );
}
