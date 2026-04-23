import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const formStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: hp("1.8%"),
    borderRadius: 12,
    marginBottom: hp("1.5%"),
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: hp("1.8%"),
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: hp("1.5%"),
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordInput: {
    flex: 1,
    padding: hp("1.8%"),
    fontSize: hp("1.8%"),
    color: "#333",
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
    gap: 10,
  },
  countryCodeBox: {
    backgroundColor: "#fff",
    padding: hp("1.8%"),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 60,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1%"),
    gap: 10,
  },
  genderBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: hp("1.5%"),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  genderBoxActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
});
