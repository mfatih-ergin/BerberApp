import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: wp("5%"),
    paddingTop: hp("12%"),
    paddingBottom: hp("10%"),
  },

  // --- Profil Kartı ---
  profileHeaderCard: {
    padding: wp("6%"),
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: hp("4%"),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  avatarContainer: {
    width: wp("26%"),
    height: wp("26%"),
    borderRadius: wp("13%"),
    borderWidth: 4,
    position: "absolute",
    top: -wp("13%"),
    elevation: 10,
    backgroundColor: "#EEE",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    marginTop: wp("10%"),
    alignItems: "center",
    width: "100%",
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    fontWeight: "500",
  },

  // --- Butonlar ---
  editButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 100,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
    width: "100%",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
});
