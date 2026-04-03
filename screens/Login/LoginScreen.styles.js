import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp("8%"),
    justifyContent: "center",
    paddingBottom: hp("5%"),
  },
  headerContainer: {
    marginBottom: hp("4%"),
    alignItems: "center",
  },
  header: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("1%"),
  },
  subHeader: {
    fontSize: hp("1.8%"),
    color: "#666",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: hp("2%"),
  },
  input: {
    backgroundColor: "#fff",
    padding: hp("1.8%"),
    borderRadius: 12,
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
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: hp("3%"),
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
    marginTop: hp("1%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("4%"),
  },
  footerText: {
    fontSize: hp("1.7%"),
    color: "#666",
  },
  linkText: {
    fontSize: hp("1.7%"),
    color: "#007AFF",
    fontWeight: "bold",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingLeft: 5,
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
});
