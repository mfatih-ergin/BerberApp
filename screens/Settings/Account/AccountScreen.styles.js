import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingTop: hp("2%") },
  sectionTitle: {
    marginLeft: wp("5%"),
    marginBottom: hp("1%"),
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: hp("3%"),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    height: hp("7%"),
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: wp("3%"),
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    height: hp("7%"),
  },
  rowText: {
    flex: 1,
    marginLeft: wp("3%"),
    fontSize: 16,
  },
  updateButton: {
    marginHorizontal: wp("5%"),
    height: hp("6.5%"),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("2%"),
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
