import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../styles/Colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  whiteCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 25,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 18,
    borderRadius: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  passwordInput: {
    flex: 1,
    padding: 18,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 5,
  },
  rememberMeText: {
    color: "#444",
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  button: {
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: Colors.dark_green,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#777",
    fontSize: 15,
  },
  linkText: {
    color: Colors.green,
    fontSize: 15,
    fontWeight: "bold",
  },
});
