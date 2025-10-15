import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/SplashScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/LevelSelectionScreen"
        options={{
          headerShown: true,
          title: "Select Levels",
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="screens/GameLevelOneScreen"
        options={{
          headerShown: true,
          title: "Find the Different Color",
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="screens/GameLevelTwoScreen"
        options={{
          headerShown: true,
          title: "Find the Different Shape",
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="screens/GameLevelThreeScreen"
        options={{
          headerShown: true,
          title: "Find the Different Picture",
          headerLeft: () => null,
        }}
      />
    </Stack>
  );
}
