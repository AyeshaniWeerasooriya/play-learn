import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { indexStyles } from "./index.styles";

const SplashScreen: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/screens/LevelSelectionScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={indexStyles.container}>
      <Image
        source={require("../assets/Logo.png")}
        style={indexStyles.logo}
        resizeMode="contain"
      />
      <Text style={indexStyles.title}>PlayLearn</Text>
      <Text style={indexStyles.subtitle}>Learn with Fun!</Text>
    </View>
  );
};

export default SplashScreen;
