import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../styles/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: hp("3%"),
  },
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: hp("4%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("2.5%"),
    paddingHorizontal: wp("6%"),
    borderBottomWidth: 1,
  },
  rowText: {
    flex: 1,
    marginLeft: wp("4%"),
    fontSize: hp("2.2%"),
  },
  logoutText: {
    color: Colors.danger,
    fontWeight: "600",
  },
});
