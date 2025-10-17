import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Modal,
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

const emojiItems = ["🎈", "🎈", "🎉", "✨", "⭐", "🎊"];
const { width, height } = Dimensions.get("window");
const winMessages = ["Good job!", "Awesome!", "Great!", "Nice!"];
const tryAgainMessages = ["Nice try!", "Try again!", "Almost!"];

const GameLevelOneScreen: React.FC = () => {
  const router = useRouter();
  const [circles, setCircles] = useState<Circle[]>([]);
  const [score, setScore] = useState(0);
  const [lastLevelUpScore, setLastLevelUpScore] = useState(0);

  const [rewardElements, setRewardElements] = useState<RewardAnimation[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [showLevelUp, setShowLevelUp] = useState(false);

  const winSound = useRef<Audio.Sound | null>(null);
  const wrongSound = useRef<Audio.Sound | null>(null);
  const clickSound = useRef<Audio.Sound | null>(null);
  const levelUpSound = useRef<Audio.Sound | null>(null);
  useEffect(() => {
    const backAction = () => {
      router.replace("/screens/LevelSelectionScreen");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const loadSounds = async () => {
      try {
        winSound.current = new Audio.Sound();
        wrongSound.current = new Audio.Sound();
        clickSound.current = new Audio.Sound();
        levelUpSound.current = new Audio.Sound();

        await winSound.current.loadAsync(require("@/assets/sounds/win.mp3"));
        await wrongSound.current.loadAsync(
          require("@/assets/sounds/wrong.mp3")
        );
        await clickSound.current.loadAsync(
          require("@/assets/sounds/click.mp3")
        );
        await levelUpSound.current.loadAsync(
          require("@/assets/sounds/level-up.mp3")
        );
      } catch (error) {
        console.error("🎧 Error loading sounds:", error);
      }
    };

    loadSounds();

    return () => {
      winSound.current?.unloadAsync();
      wrongSound.current?.unloadAsync();
      clickSound.current?.unloadAsync();
      levelUpSound.current?.unloadAsync();
    };
  }, []);

  const safePlay = async (sound: Audio.Sound | null) => {
    try {
      if (!sound) return;
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) return;
      await sound.replayAsync();
    } catch (error) {
      console.log("⚠️ Sound play error:", error);
    }
  };

  const playWinSound = () => safePlay(winSound.current);
  const playWrongSound = () => safePlay(wrongSound.current);
  const playClickSound = () => safePlay(clickSound.current);
  const playLevelUpSound = async () => {
    if (!levelUpSound.current) return;

    try {
      await levelUpSound.current.setStatusAsync({ volume: 1.0 });
      await levelUpSound.current.replayAsync();
    } catch (error) {
      console.log("⚠️ Level-up sound play error:", error);
    }
  };

  const generateColors = () => {
    const [baseColor, diffColor] =
      baseColorSets[Math.floor(Math.random() * baseColorSets.length)];
    const correctIndex = Math.floor(Math.random() * 4);

    const newCircles: Circle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      color: i === correctIndex ? diffColor : baseColor,
      isDifferent: i === correctIndex,
      isIncorrect: false,
    }));

    setCircles(newCircles);
  };

  useEffect(() => {
    generateColors();
  }, []);

  const handlePress = async (index: number) => {
    await playClickSound();

    const updated = [...circles];
    const selected = updated[index];

    if (selected.isDifferent) {
      await playWinSound();

      setScore((prev) => {
        const newScore = prev + 10;

        if (newScore % 100 === 0 && newScore !== lastLevelUpScore) {
          setShowLevelUp(true);
          setLastLevelUpScore(newScore);
          playLevelUpSound();
        }

        return newScore;
      });

      showRewardAnimation();

      const message =
        winMessages[Math.floor(Math.random() * winMessages.length)];
      setFeedbackText(message);
      setTimeout(() => setFeedbackText(""), 1800);

      setTimeout(generateColors, 1500);
    } else {
      await playWrongSound();
      updated[index].isIncorrect = true;
      setCircles(updated);

      const message =
        tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
      setFeedbackText(message);
      setTimeout(() => setFeedbackText(""), 1800);

      setTimeout(() => {
        updated[index].isIncorrect = false;
        setCircles([...updated]);
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
      <View style={gameStyles.textHeader}>
        <Text style={gameStyles.headerText}>Find the Different Color</Text>
      </View>
      <View style={gameStyles.header}>
        <TouchableOpacity
          onPress={async () => {
            await playClickSound();
            router.replace("screens/LevelSelectionScreen" as any);
          }}
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

      <Modal visible={showLevelUp} transparent animationType="fade">
        <View style={gameStyles.modalOverlay}>
          <View style={gameStyles.modalContent}>
            <Text style={gameStyles.modalTitle}>Congratulations!</Text>
            <Image
              source={require("@/assets/firework.png")}
              style={gameStyles.image}
            />
            <Text style={gameStyles.modalMessage}>
              You can upgrade to the next level.
            </Text>

            <View style={gameStyles.modalButtons}>
              <TouchableOpacity
                style={gameStyles.modalButton}
                onPress={async () => {
                  await playClickSound();
                  router.push("/screens/GameLevelTwoScreen");
                  setShowLevelUp(false);
                }}
              >
                <Text style={gameStyles.modalButtonText}>Next Level</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={gameStyles.modalButton}
                onPress={async () => {
                  await playClickSound();
                  setShowLevelUp(false);
                }}
              >
                <Text style={gameStyles.modalButtonText}>Keep Playing</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GameLevelOneScreen;
