import { StyleSheet } from "react-native";

export const shapeGameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  textHeader: {
    marginHorizontal: 10,
    marginVertical: 35,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0c0596ff",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 60,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: "#c3f3daff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,

    justifyContent: "center",
  },
  backButtonText: {
    color: "#047857",
    fontWeight: "bold",
    fontSize: 18,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#059669",
    backgroundColor: "#c3f3daff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  shapeContainer: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  squareShape: {
    width: 95,
    height: 95,
    backgroundColor: "#000",
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  rectangleShape: {
    width: 120,
    height: 70,
    backgroundColor: "#000",
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  diamondShape: {
    width: 95,
    height: 95,
    backgroundColor: "#000",
    margin: 12,
    transform: [{ rotate: "45deg" }],
    borderRadius: 10,
  },

  triangleShape: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#000",
    margin: 12,
  },

  crossMark: {
    position: "absolute",
    fontSize: 60,
    color: "#ffffff",
    fontWeight: "900",
  },

  feedbackText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FF5722",
    marginTop: 20,
    textAlign: "center",
  },

  rewardItem: {
    position: "absolute",
    top: 0,
    zIndex: 999,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#630D70",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#059669",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
