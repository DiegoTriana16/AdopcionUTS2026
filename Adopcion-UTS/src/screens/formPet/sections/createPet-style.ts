import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },

  content: {
    width: "100%",
  },

  inputContainer: {
    width: "100%",
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333333",
  },
  error: {
    color: "#E1615F",
    fontSize: 12,
    fontWeight: "600",
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 5,
  },

  section: {
    marginTop: 4,
    marginBottom: 18,
  },

  label: {
    color: "#444444",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 10,
  },

  genderContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  genderButton: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  genderButtonSelected: {
    backgroundColor: "#E1615F",
    borderColor: "#E1615F",
  },

  genderText: {
    color: "#666666",
    fontSize: 15,
    fontWeight: "700",
  },

  genderTextSelected: {
    color: "#FFFFFF",
  },

  descriptionContainer: {
    height: 110,
    alignItems: "flex-start",
    paddingVertical: 15,
  },

  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },

  imageContainer: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  emptyImage: {
    alignItems: "center",
    justifyContent: "center",
  },

  emptyImageText: {
    color: "#999999",
    fontSize: 14,
    marginTop: 8,
  },

  btnSecondary: {
    width: "100%",
    height: 55,
    borderRadius: 16,
    backgroundColor: "#FDE9E8",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  btnSecondaryText: {
    color: "#E1615F",
    fontSize: 16,
    fontWeight: "800",
  },

  btnContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#E1615F",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  btnText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  suggestionText: {
    fontSize: 15,
    color: "#333",
  },
});
