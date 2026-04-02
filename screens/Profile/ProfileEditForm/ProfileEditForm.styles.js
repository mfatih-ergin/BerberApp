import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  editForm: {
    width: "100%",
    marginTop: 10,
    gap: 12,
    position: "relative",
  },
  cameraButtonOverlay: {
    position: "absolute",
    top: -wp("16%"),
    right: wp("25%"),
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    zIndex: 1000,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  editInput: {
    flex: 1,
    fontSize: 15,
    height: "100%",
  },
});
