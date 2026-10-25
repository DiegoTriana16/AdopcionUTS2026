import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentLogin: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },

  image: {
    resizeMode: "contain",
    width: "65%",
    height: 150,
    marginBottom: 5,
  },

  formContainer: {
    width: "100%",
    alignItems: "center",
  },

  content: {
    width: "100%",
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

  inputContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 15,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
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

  error: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: -7,
    marginBottom: 10,
    paddingLeft: 5,
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
});
