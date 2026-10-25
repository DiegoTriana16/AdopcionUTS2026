import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentRegister: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },

  image: {
    resizeMode: "contain",
    width: "65%",
    height: 145,
    alignSelf: "center",
    marginBottom: 5,
  },

  formContainer: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    color: "#E1615F",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
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

  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333333",
    marginLeft: 10,
  },

  icon: {
    marginRight: 2,
  },

  btnContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#E1615F",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,

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

  textRegister: {
    color: "#666666",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  btnRegister: {
    color: "#E1615F",
    fontSize: 15,
    fontWeight: "900",
    textDecorationLine: "underline",
  },

  error: {
    color: "#E1615F",
    fontSize: 12,
    fontWeight: "600",
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 5,
  },
});
