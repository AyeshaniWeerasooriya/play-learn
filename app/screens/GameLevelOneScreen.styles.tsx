import { StyleSheet } from "react-native";

export const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 60,
    marginBottom: 30,
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    marginTop: 20,
    textAlign: "center",
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
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
