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
import { shapeGameStyles } from "./GameLevelFourScreen.styles";

interface Shape {
  id: number;
  rotation: number;
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

const shapes = ["square", "diamond", "triangle", "rectangle"] as const;

const rainbowColors = [
  "#FF0000",
  "#FF7F00",
  "#fdda0d",
  "#17a817ff",
  "#0000FF",
  "#f412a1ff",
  "#8B00FF",
];

const emojiItems = ["🎈", "🎉", "✨", "⭐", "🎊"];
const winMessages = ["Awesome!", "Well done!", "Super!", "Great job!"];
const tryAgainMessages = ["Try again!", "Almost!", "Keep going!"];

const GameLevelFourScreen: React.FC = () => {
  const router = useRouter();

  const [shapeType, setShapeType] = useState<
    "square" | "diamond" | "triangle" | "rectangle"
  >("square");
  const [shapeColor, setShapeColor] = useState<string>("#FF0000");
  const [shapesSet, setShapesSet] = useState<Shape[]>([]);
  const [score, setScore] = useState(0);
  const [lastLevelUpScore, setLastLevelUpScore] = useState(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [rewardElements, setRewardElements] = useState<RewardAnimation[]>([]);
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
        console.warn("Sound load error:", error);
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
  const playLevelUpSound = () => safePlay(levelUpSound.current);

  useEffect(() => {
    generateShapes();
  }, []);

  const generateShapes = () => {
    const newShapeType =
      shapes[Math.floor(Math.random() * shapes.length)] || "square";
    setShapeType(newShapeType);

    const newColor =
      rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    setShapeColor(newColor);

    const baseRotation = Math.random() > 0.5 ? 0 : 180;

    let diffRotation = 0;
    switch (newShapeType) {
      case "triangle":
        diffRotation = baseRotation === 0 ? 180 : 0;
        break;
      case "square":
        diffRotation = baseRotation === 0 ? 45 : 225;
        break;
      case "rectangle":
        diffRotation = baseRotation === 0 ? 90 : 270;
        break;
      case "diamond":
        diffRotation = baseRotation === 0 ? 45 : 225;
        break;
      default:
        diffRotation = baseRotation === 0 ? 45 : 225;
    }

    const diffIndex = Math.floor(Math.random() * 5);

    const newShapes: Shape[] = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      rotation: i === diffIndex ? diffRotation : baseRotation,
      isDifferent: i === diffIndex,
      isIncorrect: false,
    }));

    setShapesSet(newShapes);
  };

  const handlePress = (index: number) => {
    playClickSound();
    const updated = [...shapesSet];
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
      setFeedbackText(
        winMessages[Math.floor(Math.random() * winMessages.length)]
      );
      setTimeout(() => setFeedbackText(""), 1500);
      setTimeout(generateShapes, 1500);
    } else {
      playWrongSound();
      updated[index].isIncorrect = true;
      setShapesSet(updated);
      setFeedbackText(
        tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)]
      );
      setTimeout(() => setFeedbackText(""), 1500);

      setTimeout(() => {
        const reset = [...updated];
        reset[index].isIncorrect = false;
        setShapesSet(reset);
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
      const fontSize = Math.random() * 40 + 25;
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
    const rotationStyle = { transform: [{ rotate: `${shape.rotation}deg` }] };

    switch (shapeType) {
      case "square":
        return (
          <View
            style={[
              shapeGameStyles.squareShape,
              { backgroundColor: shapeColor },
              rotationStyle,
            ]}
          />
        );
      case "diamond":
        return (
          <View
            style={[
              shapeGameStyles.squareShape,
              {
                backgroundColor: shapeColor,
                transform: [{ rotate: `${45 + shape.rotation}deg` }],
              },
            ]}
          />
        );
      case "triangle":
        return (
          <View
            style={[
              shapeGameStyles.triangleShape,
              { borderBottomColor: shapeColor },
              rotationStyle,
            ]}
          />
        );
      case "rectangle":
        return (
          <View
            style={[
              shapeGameStyles.rectangleShape,
              { backgroundColor: shapeColor },
              rotationStyle,
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
            router.replace("/screens/LevelSelectionScreen");
          }}
          style={shapeGameStyles.backButton}
        >
          <Text style={shapeGameStyles.backButtonText}>Levels</Text>
        </TouchableOpacity>
        <Text style={shapeGameStyles.scoreText}> {score}</Text>
      </View>

      <View style={shapeGameStyles.grid}>
        {shapesSet.map((shape, index) => (
          <TouchableOpacity
            key={shape.id}
            style={shapeGameStyles.shapeContainer}
            onPress={() => handlePress(index)}
          >
            {renderShape(shape)}
            {shape.isIncorrect && (
              <X
                style={shapeGameStyles.crossMark}
                size={70}
                color={"#ffffff"}
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
                  router.push("/screens/GameLevelOneScreen");
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

export default GameLevelFourScreen;
