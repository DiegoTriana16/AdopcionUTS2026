import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentRegister: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 20,
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 7,
    marginTop: 12,
  },

  question: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginTop: 15,
    marginBottom: 10,
  },

  inputContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 5,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  textAreaContainer: {
    minHeight: 110,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 13,
    marginBottom: 5,
  },

  textAreaIcon: {
    marginRight: 10,
    marginTop: 2,
  },

  textArea: {
    flex: 1,
    minHeight: 85,
    fontSize: 15,
    color: "#333",
  },

  error: {
    color: "#E1615F",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },

  optionsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },

  optionButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  optionButtonSelected: {
    backgroundColor: "#E1615F",
    borderColor: "#E1615F",
  },

  optionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },

  optionTextSelected: {
    color: "#fff",
  },

  btn: {
    height: 52,
    backgroundColor: "#E1615F",
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
