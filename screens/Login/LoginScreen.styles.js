import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp("8%"),
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: hp("4%"),
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: hp("1%"),
  },
  subHeader: {
    fontSize: hp("2%"),
    textAlign: "center",
    marginBottom: hp("5%"),
    color: "#666",
  },
  inputContainer: {
    marginBottom: hp("2%"),
  },
  input: {
    backgroundColor: "#fff",
    padding: hp("2%"),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: hp("2%"),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: hp("3%"),
  },
  passwordInput: {
    flex: 1,
    padding: hp("2%"),
    fontSize: hp("2%"),
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: hp("2%"),
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.2%"),
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("4%"),
  },
  footerText: {
    fontSize: hp("1.8%"),
    color: "#666",
  },
  linkText: {
    fontSize: hp("1.8%"),
    color: "#007AFF",
    fontWeight: "bold",
  },
});
