import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { pictureGameStyles } from "./GameLevelThreeScreen.styles";

interface PictureItem {
  id: number;
  image: any;
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

const winMessages = ["Good job!", "Awesome!", "You did it!", "Nice work!"];
const tryAgainMessages = ["Try again!", "Almost!", "Keep going!"];
const emojiItems = ["🎉", "⭐", "✨", "🎈", "🌟", "🎊"];

const pictureSet = [
  require("@/assets/tree.png"),
  require("@/assets/flower.png"),
  require("@/assets/house.png"),
  require("@/assets/sun.png"),
  require("@/assets/bird.png"),
  require("@/assets/ant.png"),
  require("@/assets/pencil.png"),
  require("@/assets/birthday-cake.png"),
  require("@/assets/clouds.png"),
];

const GameLevelThreeScreen: React.FC = () => {
  const router = useRouter();
  const [pictures, setPictures] = useState<PictureItem[]>([]);
  const [score, setScore] = useState(0);
  const [rewardElements, setRewardElements] = useState<RewardAnimation[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");

  useEffect(() => {
    generatePictures();
  }, []);

  const generatePictures = () => {
    const baseIndex = Math.floor(Math.random() * pictureSet.length);
    let diffIndex = Math.floor(Math.random() * pictureSet.length);

    while (diffIndex === baseIndex) {
      diffIndex = Math.floor(Math.random() * pictureSet.length);
    }

    const diffPosition = Math.floor(Math.random() * 4);

    const newSet: PictureItem[] = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      image: i === diffPosition ? pictureSet[diffIndex] : pictureSet[baseIndex],
      isDifferent: i === diffPosition,
      isIncorrect: false,
    }));

    setPictures(newSet);
  };

  const handlePress = (index: number) => {
    const updated = [...pictures];
    const selected = updated[index];

    if (selected.isDifferent) {
      setScore(score + 1);
      showRewardAnimation();

      const message =
        winMessages[Math.floor(Math.random() * winMessages.length)];
      setFeedbackText(message);
      setTimeout(() => setFeedbackText(""), 1800);
      setTimeout(generatePictures, 1500);
    } else {
      updated[index].isIncorrect = true;
      setPictures(updated);

      const message =
        tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
      setFeedbackText(message);
      setTimeout(() => setFeedbackText(""), 1800);

      setTimeout(() => {
        updated[index].isIncorrect = false;
        setPictures([...updated]);
      }, 700);
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
    <View style={pictureGameStyles.container}>
      <View style={pictureGameStyles.header}>
        <TouchableOpacity
          onPress={() => router.replace("screens/LevelSelectionScreen" as any)}
          style={pictureGameStyles.backButton}
        >
          <Text style={pictureGameStyles.backButtonText}>Levels</Text>
        </TouchableOpacity>
        <Text style={pictureGameStyles.scoreText}>Score: {score}</Text>
      </View>

      <View style={pictureGameStyles.grid}>
        {pictures.map((pic, index) => (
          <TouchableOpacity
            key={pic.id}
            style={pictureGameStyles.imageBox}
            onPress={() => handlePress(index)}
          >
            <Image source={pic.image} style={pictureGameStyles.image} />
            {pic.isIncorrect && (
              <Text style={pictureGameStyles.crossMark}>✖</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {feedbackText !== "" && (
        <Text style={pictureGameStyles.feedbackText}>{feedbackText}</Text>
      )}

      {rewardElements.map((item) => (
        <Animated.Text
          key={item.id}
          style={[
            pictureGameStyles.rewardItem,
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

export default GameLevelThreeScreen;
