import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { levelStyles } from "./LevelSelectionScreen.styles";

const LevelSelectionScreen: React.FC = () => {
  const router = useRouter();

  const clickSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const loadClickSound = async () => {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("@/assets/sounds/click.mp3"));
      clickSound.current = sound;
    };

    loadClickSound();

    return () => {
      if (clickSound.current) clickSound.current.unloadAsync();
    };
  }, []);

  const playClickSound = async () => {
    try {
      if (clickSound.current) {
        await clickSound.current.replayAsync();
      }
    } catch (error) {
      console.log("Error playing click sound:", error);
    }
  };

  const handleLevelPress = async (path: string) => {
    await playClickSound();
    setTimeout(() => router.push(path as any), 150);
  };

  return (
    <View style={levelStyles.container}>
      <Text style={levelStyles.title}>Select Your Level</Text>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level1]}
        onPress={() => handleLevelPress("screens/GameLevelOneScreen")}
      >
        <Text style={levelStyles.levelText}>Level 1 (Colors)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level2]}
        onPress={() => handleLevelPress("screens/GameLevelTwoScreen")}
      >
        <Text style={levelStyles.levelText}>Level 2 (Shapes & Colors)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level3]}
        onPress={() => handleLevelPress("screens/GameLevelThreeScreen")}
      >
        <Text style={levelStyles.levelText}>Level 3 (Images)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LevelSelectionScreen;
