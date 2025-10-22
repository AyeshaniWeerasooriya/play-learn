import { StyleSheet } from "react-native";

export const levelStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#059669",

    marginBottom: 25,
  },

  levelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: 900,
  },

  levelButton: {
    width: "35%",
    maxWidth: 400,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  level1: {
    backgroundColor: "#ec4899",
  },
  level2: {
    backgroundColor: "#f59e0b",
  },
  level3: {
    backgroundColor: "#8b5cf6",
  },
  level4: {
    backgroundColor: "#5f9bcbff",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  soonText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    opacity: 0.8,
  },
});
