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
    paddingTop: hp("2%"),
  },
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
  infoText: {
    paddingHorizontal: 20,
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
    textAlign: "center",
  },
});
