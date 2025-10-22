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
import {
  ICON_COLOR,
  ICON_SIZE,
  pictureGameStyles,
} from "./GameLevelThreeScreen.styles";

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
        console.warn("Error loading sounds:", error);
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
    playClickSound();
    const updated = [...pictures];
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

      const message =
        winMessages[Math.floor(Math.random() * winMessages.length)];
      setFeedbackText(message);
      setTimeout(() => setFeedbackText(""), 1800);
      setTimeout(generatePictures, 1500);
    } else {
      playWrongSound();
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
        setRewardElements((curr) => curr.filter((item) => item.id !== id));
      });
    }
    setRewardElements((curr) => [...curr, ...newAnimations]);
  };

  return (
    <View style={pictureGameStyles.container}>
      <View style={pictureGameStyles.header}>
        <TouchableOpacity
          onPress={async () => {
            await playClickSound();
            router.replace("screens/LevelSelectionScreen" as any);
          }}
          style={pictureGameStyles.backButton}
        >
          <Text style={pictureGameStyles.backButtonText}>Levels</Text>
        </TouchableOpacity>
        <Text style={pictureGameStyles.scoreText}> {score}</Text>
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
              <View style={pictureGameStyles.errorCircle}>
                <X size={ICON_SIZE} color={ICON_COLOR} />
              </View>
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

      {/* Level-up Modal */}
      <Modal visible={showLevelUp} transparent animationType="fade">
        <View style={pictureGameStyles.modalOverlay}>
          <View style={pictureGameStyles.modalContent}>
            <Text style={pictureGameStyles.modalTitle}>Congratulations!</Text>
            <Image
              source={require("@/assets/firework.png")}
              style={pictureGameStyles.modelImage}
            />
            <Text style={pictureGameStyles.modalMessage}>
              You can upgrade to the first level again.
            </Text>

            <View style={pictureGameStyles.modalButtons}>
              <TouchableOpacity
                style={pictureGameStyles.modalButton}
                onPress={async () => {
                  await playClickSound();
                  // Example: push to Level Four if exists
                  router.push("/screens/GameLevelFourScreen");
                  setShowLevelUp(false);
                }}
              >
                <Text style={pictureGameStyles.modalButtonText}>
                  First Level
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={pictureGameStyles.modalButton}
                onPress={async () => {
                  await playClickSound();
                  setShowLevelUp(false);
                }}
              >
                <Text style={pictureGameStyles.modalButtonText}>
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

export default GameLevelThreeScreen;
