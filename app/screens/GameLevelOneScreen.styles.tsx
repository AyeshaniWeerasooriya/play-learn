import { StyleSheet } from "react-native";

export const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 55,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 60,
    marginBottom: 30,
  },
  scoreText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#059669",
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  crossMark: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "900",
  },
  rewardItem: {
    position: "absolute",
    top: 0,
    zIndex: 999,
  },
  feedbackText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FF5722",
    marginTop: 50,
    textAlign: "center",
  },
});
