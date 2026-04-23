import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const uiStyles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: hp("2%"),
    textAlign: "center",
    marginBottom: hp("4%"),
    color: "#666",
  },
  sectionTitle: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    marginBottom: hp("1.5%"),
    marginTop: hp("2%"),
    color: "#333",
  },
  genderText: {
    fontSize: hp("1.8%"),
    color: "#666",
    fontWeight: "600",
  },
  genderTextActive: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: hp("2.2%"),
    borderRadius: 12,
    alignItems: "center",
    marginTop: hp("3%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.2%"),
    fontWeight: "bold",
  },
  roleButton: {
    backgroundColor: "#007AFF",
    padding: hp("3%"),
    borderRadius: 15,
    marginBottom: hp("2%"),
    alignItems: "center",
  },
  roleButtonText: {
    color: "#fff",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
  },
  countryCodeText: {
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    color: "#333",
  },
});
