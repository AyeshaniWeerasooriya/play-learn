import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { levelStyles } from "./LevelSelectionScreen.styles";

const LevelSelectionScreen: React.FC = () => {
  const router = useRouter();

  // --- Sound reference ---
  const clickSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    // Preload click sound once
    const loadClickSound = async () => {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("@/assets/sounds/click.mp3"));
      clickSound.current = sound;
    };

    loadClickSound();

    // Cleanup on unmount
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

  // --- Navigation handlers with click sound ---
  const handleLevelPress = async (path: string) => {
    await playClickSound();
    setTimeout(() => router.push(path as any), 150); // small delay for sound
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
