import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { gameStyles } from "./GameLevelOneScreen.styles";

interface Circle {
  id: number;
  color: string;
  isDifferent: boolean;
  isIncorrect: boolean;
}

// NEW: Interface for reward animation elements
interface RewardAnimation {
  id: string;
  animValue: Animated.Value;
  emoji: string;
  randomX: number;
  fontSize: number;
}

const baseColorSets = [
  ["#0a38a2ff", "#60A5FA"],
  ["#078c2dff", "#34D399"],
  ["#b10808ff", "#F87171"],
  ["#d47407ff", "#FBBF24"],
];
const emojiItems = ["🎈", "🎈", "🎈", "🎉", "✨", "⭐", "🎊"];
const { width, height } = Dimensions.get("window");
const winMessages = ["Good job!", "Awesome!", "Great!", "Nice!"];
const tryAgainMessages = ["Nice try!", "Try again!", "Almost!"];

const GameScreen: React.FC = () => {
  const router = useRouter();
  const [circles, setCircles] = useState<Circle[]>([]);
  const [score, setScore] = useState(0);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [rewardElements, setRewardElements] = useState<RewardAnimation[]>([]);

  const [feedbackText, setFeedbackText] = useState<string>("");

  useEffect(() => {
    generateColors();
  }, []);

  const generateColors = () => {
    const [baseColor, diffColor] =
      baseColorSets[Math.floor(Math.random() * baseColorSets.length)];

    const newCorrectIndex = Math.floor(Math.random() * 4);

    const newCircles: Circle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      color: i === newCorrectIndex ? diffColor : baseColor,
      isDifferent: i === newCorrectIndex,
      isIncorrect: false,
    }));

    setCircles(newCircles);
    setCorrectIndex(newCorrectIndex);
  };

  const handlePress = (index: number) => {
    const updated = [...circles];
    const selected = updated[index];

    if (selected.isDifferent) {
      setScore(score + 1);
      showRewardAnimation();

      const message =
        winMessages[Math.floor(Math.random() * winMessages.length)];
      setFeedbackText(message);
      setTimeout(() => setFeedbackText(""), 1800);

      setTimeout(generateColors, 1500);
    } else {
      updated[index].isIncorrect = true;
      setCircles(updated);

      const message =
        tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
      setFeedbackText(message);
      setTimeout(() => setFeedbackText(""), 1800);

      setTimeout(() => {
        const resetCircles = [...updated];
        resetCircles[index].isIncorrect = false;
        setCircles(resetCircles);
      }, 800);
    }
  };

  const showRewardAnimation = () => {
    const newAnimations: RewardAnimation[] = [];

    for (let i = 0; i < 10; i++) {
      const animValue = new Animated.Value(0);
      const randomX = Math.random() * (width - 50);
      const duration = 2000 + Math.random() * 1000;
      const emoji = emojiItems[Math.floor(Math.random() * emojiItems.length)];
      const fontSize = Math.random() * 50 + 25;
      const id = `emoji-${Date.now()}-${i}`;

      newAnimations.push({ id, animValue, emoji, randomX, fontSize });

      Animated.timing(animValue, {
        toValue: height,
        duration,
        useNativeDriver: true,
      }).start(() => {
        setRewardElements((current) =>
          current.filter((item) => item.id !== id)
        );
      });
    }

    setRewardElements((current) => [...current, ...newAnimations]);
  };

  return (
    <View style={gameStyles.container}>
      <View style={gameStyles.header}>
        <TouchableOpacity
          onPress={() => router.replace("screens/LevelSelectionScreen" as any)}
          style={gameStyles.backButton}
        >
          <Text style={gameStyles.backButtonText}>Levels</Text>
        </TouchableOpacity>
        <Text style={gameStyles.scoreText}>Score: {score}</Text>
      </View>

      <View style={gameStyles.grid}>
        {circles.map((circle, index) => (
          <TouchableOpacity
            key={circle.id}
            style={[gameStyles.circle, { backgroundColor: circle.color }]}
            onPress={() => handlePress(index)}
          >
            {circle.isIncorrect && <Text style={gameStyles.crossMark}>✖</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {feedbackText !== "" && (
        <Text style={gameStyles.feedbackText}>{feedbackText}</Text>
      )}

      {rewardElements.map((item) => (
        <Animated.Text
          key={item.id}
          style={[
            gameStyles.rewardItem,
            {
              transform: [{ translateY: item.animValue }],
              left: item.randomX,
              fontSize: item.fontSize,
            },
          ]}
        >
          {item.emoji}
        </Animated.Text>
      ))}
    </View>
  );
};

export default GameScreen;
