import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef } from "react";
import {
  BackHandler,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getLevelStyles } from "./LevelSelectionScreen.styles";

const LevelSelectionScreen: React.FC = () => {
  const router = useRouter();
  const clickSound = useRef<Audio.Sound | null>(null);

  const { width } = useWindowDimensions();
  const isPortrait = width < 700;

  const levelStyles = getLevelStyles(isPortrait);

  useEffect(() => {
    const allowBoth = async () => {
      await ScreenOrientation.unlockAsync();
    };
    allowBoth();
    return () => {};
  }, []);

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
        <Text style={levelStyles.levelText}>Level 2 (Shapes)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level3]}
        onPress={() => handleLevelPress("screens/GameLevelThreeScreen")}
      >
        <Text style={levelStyles.levelText}>Level 3 (Images)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level4]}
        onPress={() => handleLevelPress("screens/GameLevelFourScreen")}
      >
        <Text style={levelStyles.levelText}>Level 4 (Angles)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LevelSelectionScreen;
