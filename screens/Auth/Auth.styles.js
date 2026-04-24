import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../styles/Colors";

export const authStyles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingTop: hp("5%"),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  whiteCard: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: "100%",
    minHeight: hp("45%"),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  headerContainer: { marginBottom: 25, alignItems: "center" },
  header: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subHeader: { fontSize: 15, color: "#666", marginTop: 5, textAlign: "center" },

  tabContainer: {
    flexDirection: "row",
    width: "100%",
    zIndex: 11,
  },
  loginTabButton: {
    flex: 1,
    paddingVertical: 18,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 0,
  },
  registerTabButton: {
    flex: 1,
    paddingVertical: 18,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
  },
  tabText: { fontSize: 16, fontWeight: "600", color: "#DDD" },
  activeTabText: { color: Colors.green, fontWeight: "bold" },
});
