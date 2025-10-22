import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { X } from "lucide-react-native";
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
import { shapeGameStyles } from "./GameLevelTwoScreen.styles";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle";
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
const shapes = ["circle", "square", "triangle"] as const;
const emojiItems = ["🎈", "🎉", "✨", "⭐", "🎊"];
const winMessages = ["Great job!", "Awesome!", "Super!", "Well done!"];
const tryAgainMessages = ["Nice try!", "Try again!", "Almost!"];

const rainbowColors = [
  "#FF0000",
  "#FF7F00",
  "#fdda0d",
  "#17a817ff",
  "#0000FF",
  "#f412a1ff",
  "#8B00FF",
];

const GameLevelTwoScreen: React.FC = () => {
  const router = useRouter();

  const [shapeSet, setShapeSet] = useState<Shape[]>([]);
  const [shapeColor, setShapeColor] = useState<string>("#FF0000");
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
    const lockLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    lockLandscape();
  }, []);

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
        console.warn("🎧 Error loading sounds:", error);
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
      console.warn("Audio play error:", error);
    }
  };

  const playClickSound = () => safePlay(clickSound.current);
  const playWinSound = () => safePlay(winSound.current);
  const playWrongSound = () => safePlay(wrongSound.current);
  const playLevelUpSound = async () => {
    if (!levelUpSound.current) return;
    try {
      await levelUpSound.current.setStatusAsync({ volume: 1.0 });
      await levelUpSound.current.replayAsync();
    } catch (error) {
      console.warn("Level-up sound play error:", error);
    }
  };

  useEffect(() => {
    generateShapes();
  }, []);

  const generateShapes = () => {
    const baseShape = shapes[Math.floor(Math.random() * shapes.length)];
    let diffShape = baseShape;
    while (diffShape === baseShape) {
      diffShape = shapes[Math.floor(Math.random() * shapes.length)];
    }
    const diffIndex = Math.floor(Math.random() * 5);

    const newColor =
      rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    setShapeColor(newColor);

    const newShapes: Shape[] = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      type: i === diffIndex ? diffShape : baseShape,
      isDifferent: i === diffIndex,
      isIncorrect: false,
    }));

    setShapeSet(newShapes);
  };

  const handlePress = (index: number) => {
    playClickSound();
    const updated = [...shapeSet];
    const selected = updated[index];

    if (selected.isDifferent) {
      playWinSound();

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

      const msg = winMessages[Math.floor(Math.random() * winMessages.length)];
      setFeedbackText(msg);
      setTimeout(() => setFeedbackText(""), 1500);

      setTimeout(generateShapes, 1500);
    } else {
      playWrongSound();
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
        return (
          <View
            style={[
              shapeGameStyles.circleShape,
              { backgroundColor: shapeColor },
            ]}
          />
        );
      case "square":
        return (
          <View
            style={[
              shapeGameStyles.squareShape,
              { backgroundColor: shapeColor },
            ]}
          />
        );
      case "triangle":
        return (
          <View
            style={[
              shapeGameStyles.triangleShape,
              { borderBottomColor: shapeColor },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={shapeGameStyles.container}>
      <View style={shapeGameStyles.header}>
        <TouchableOpacity
          onPress={async () => {
            await playClickSound();
            router.replace("screens/LevelSelectionScreen" as any);
          }}
          style={shapeGameStyles.backButton}
        >
          <Text style={shapeGameStyles.backButtonText}>Levels</Text>
        </TouchableOpacity>
        <Text style={shapeGameStyles.scoreText}> {score}</Text>
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
              <X
                style={shapeGameStyles.crossMark}
                color={"#ffffff"}
                size={70}
              />
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

      <Modal visible={showLevelUp} transparent animationType="fade">
        <View style={shapeGameStyles.modalOverlay}>
          <View style={shapeGameStyles.modalContent}>
            <Text style={shapeGameStyles.modalTitle}>Congratulations!</Text>
            <Image
              source={require("@/assets/firework.png")}
              style={shapeGameStyles.image}
            />
            <Text style={shapeGameStyles.modalMessage}>
              You can upgrade to the next level.
            </Text>

            <View style={shapeGameStyles.modalButtons}>
              <TouchableOpacity
                style={shapeGameStyles.modalButton}
                onPress={async () => {
                  await playClickSound();
                  router.push("/screens/GameLevelThreeScreen");
                  setShowLevelUp(false);
                }}
              >
                <Text style={shapeGameStyles.modalButtonText}>Next Level</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={shapeGameStyles.modalButton}
                onPress={async () => {
                  await playClickSound();
                  setShowLevelUp(false);
                }}
              >
                <Text style={shapeGameStyles.modalButtonText}>
                  Keep Playing
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GameLevelTwoScreen;
