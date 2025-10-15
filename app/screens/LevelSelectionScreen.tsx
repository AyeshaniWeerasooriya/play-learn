import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { levelStyles } from "./LevelSelectionScreen.styles";

const LevelSelectionScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={levelStyles.container}>
      <Text style={levelStyles.title}>Select Your Level</Text>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level1]}
        onPress={() => router.push("screens/GameLevelOneScreen" as any)}
      >
        <Text style={levelStyles.levelText}>Level 1 (Colors)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level2]}
        onPress={() => router.push("screens/GameLevelTwoScreen" as any)}
      >
        <Text style={levelStyles.levelText}>Level 2 (Shapes & Colors)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[levelStyles.levelButton, levelStyles.level3]}
        onPress={() => router.push("screens/GameLevelThreeScreen" as any)}
      >
        <Text style={levelStyles.levelText}>Level 3 (Images)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LevelSelectionScreen;
