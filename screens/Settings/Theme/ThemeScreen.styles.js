import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: hp("2%"),
  },
  sectionTitle: {
    marginLeft: wp("5%"),
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "bold",
  },
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: hp("3%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
    borderBottomWidth: 1,
  },
  rowText: {
    flex: 1,
    marginLeft: wp("4%"),
    fontSize: hp("1.9%"),
  },
  footerText: {
    paddingHorizontal: wp("5%"),
    fontSize: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
