import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    height: 60,
    backgroundColor: "#f5f5f5",
    zIndex: 10,
  },
  headerBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: -1,
  },
  selectionContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp("5%"),
    marginTop: -hp("5%"),
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 40,
  },
});
