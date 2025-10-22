import { StyleSheet } from "react-native";
export const ICON_SIZE = 40;
export const ICON_COLOR = "#FFFFFF";
export const CIRCLE_DIAMETER = 70;
export const pictureGameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
  },
  textHeader: {
    marginHorizontal: 10,
    marginVertical: 35,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0c0596ff",
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
  errorCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: [
      { translateX: -(CIRCLE_DIAMETER / 2) },
      { translateY: -(CIRCLE_DIAMETER / 2) },
    ],

    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER / 2,

    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderWidth: 3,
    borderColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 10,
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
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
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
  modelImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
