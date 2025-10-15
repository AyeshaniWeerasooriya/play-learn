import { StyleSheet } from "react-native";

export const pictureGameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    paddingVertical: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 40,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: "#c3f3daff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#047857",
    fontWeight: "bold",
    fontSize: 18,
  },
  scoreText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#059669",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: 25,
  },
  imageBox: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  crossMark: {
    position: "absolute",
    fontSize: 70,
    color: "#ffffff",
    fontWeight: "900",
  },
  feedbackText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#FF5722",
    marginTop: 50,
    textAlign: "center",
  },
  rewardItem: {
    position: "absolute",
    top: 0,
    zIndex: 999,
  },
});
