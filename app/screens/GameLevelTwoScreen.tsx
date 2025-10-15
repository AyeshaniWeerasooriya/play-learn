import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { shapeGameStyles } from "./GameLevelTwoScreen.styles";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle" | "rectangle";
  isDifferent: boolean;
  isIncorrect: boolean;
}

interface RewardAnimation {
  id: string;
  animValue: Animated.Value;
  emoji: string;
  randomX: number;
  fontSize: number;
}

const { width, height } = Dimensions.get("window");

const shapes = ["circle", "square", "triangle", "rectangle"] as const;
const emojiItems = ["🎈", "🎉", "✨", "⭐", "🎊"];
const winMessages = ["Great job!", "Awesome!", "Super!", "Well done!"];
const tryAgainMessages = ["Nice try!", "Try again!", "Almost!"];

const GameLevelTwoScreen: React.FC = () => {
  const router = useRouter();
  const [shapeSet, setShapeSet] = useState<Shape[]>([]);
  const [score, setScore] = useState(0);
  const [rewardElements, setRewardElements] = useState<RewardAnimation[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");

  useEffect(() => {
    generateShapes();
  }, []);

  const generateShapes = () => {
    const baseShape = shapes[Math.floor(Math.random() * shapes.length)];

    let diffShape = baseShape;
    while (diffShape === baseShape) {
      diffShape = shapes[Math.floor(Math.random() * shapes.length)];
    }

    const diffIndex = Math.floor(Math.random() * 4);

    const newShapes: Shape[] = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      type: i === diffIndex ? diffShape : baseShape,
      isDifferent: i === diffIndex,
      isIncorrect: false,
    }));

    setShapeSet(newShapes);
  };

  const handlePress = (index: number) => {
    const updated = [...shapeSet];
    const selected = updated[index];

    if (selected.isDifferent) {
      setScore((prev) => prev + 1);
      showRewardAnimation();

      const msg = winMessages[Math.floor(Math.random() * winMessages.length)];
      setFeedbackText(msg);
      setTimeout(() => setFeedbackText(""), 1500);

      setTimeout(generateShapes, 1500);
    } else {
      updated[index].isIncorrect = true;
      setShapeSet(updated);

      const msg =
        tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
      setFeedbackText(msg);
      setTimeout(() => setFeedbackText(""), 1500);

      setTimeout(() => {
        const reset = [...updated];
        reset[index].isIncorrect = false;
        setShapeSet(reset);
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
        setRewardElements((curr) => curr.filter((a) => a.id !== id));
      });
    }

    setRewardElements((curr) => [...curr, ...newAnimations]);
  };

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return <View style={shapeGameStyles.circleShape} />;
      case "square":
        return <View style={shapeGameStyles.squareShape} />;
      case "rectangle":
        return <View style={shapeGameStyles.rectangleShape} />;
      case "triangle":
        return <View style={shapeGameStyles.triangleShape} />;
      default:
        return null;
    }
  };

  return (
    <View style={shapeGameStyles.container}>
      <View style={shapeGameStyles.header}>
        <TouchableOpacity
          onPress={() => router.replace("screens/LevelSelectionScreen" as any)}
          style={shapeGameStyles.backButton}
        >
          <Text style={shapeGameStyles.backButtonText}>Levels</Text>
        </TouchableOpacity>
        <Text style={shapeGameStyles.scoreText}>Score: {score}</Text>
      </View>

      <View style={shapeGameStyles.grid}>
        {shapeSet.map((shape, index) => (
          <TouchableOpacity
            key={shape.id}
            style={shapeGameStyles.shapeContainer}
            onPress={() => handlePress(index)}
          >
            {renderShape(shape)}
            {shape.isIncorrect && (
              <Text style={shapeGameStyles.crossMark}>✖</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {feedbackText !== "" && (
        <Text style={shapeGameStyles.feedbackText}>{feedbackText}</Text>
      )}

      {rewardElements.map((item) => (
        <Animated.Text
          key={item.id}
          style={[
            shapeGameStyles.rewardItem,
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

export default GameLevelTwoScreen;
