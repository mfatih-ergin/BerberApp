import { StyleSheet } from "react-native";

export const header = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: -5,
    width: "100%",
  },
  headerBackButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginRight: 24,
  },
});
