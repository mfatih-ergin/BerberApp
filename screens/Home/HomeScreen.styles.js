import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("1%"),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    paddingHorizontal: wp("4%"),
    height: hp("6%"),
  },
  searchInput: {
    flex: 1,
    marginLeft: wp("2%"),
    fontSize: hp("1.8%"),
    color: "#333",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("10%"),
  },
  welcomeText: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subText: {
    fontSize: hp("1.8%"),
    color: "#666",
    textAlign: "center",
    marginTop: hp("1%"),
  },
  bottomNavbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: hp("8%"),
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#fff",
    paddingBottom: hp("1%"),
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp("2%"),
  },
  navText: {
    fontSize: 9,
    marginTop: 2,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp("1.8%"),
  },
});
