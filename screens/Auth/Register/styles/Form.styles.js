import { StyleSheet } from "react-native";
import { Colors } from "../../../../styles/Colors";

export const form = StyleSheet.create({
  formWrapper: {
    paddingVertical: 10,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    color: "#333",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  genderBox: {
    flex: 0.48,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  genderBoxActive: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  genderText: {
    color: "#666",
    fontWeight: "600",
  },
  genderTextActive: {
    color: "#FFF",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  countryCodeBox: {
    backgroundColor: "#EEE",
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    justifyContent: "center",
  },
  countryCodeText: {
    color: "#333",
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    color: "#333",
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: Colors.green,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
