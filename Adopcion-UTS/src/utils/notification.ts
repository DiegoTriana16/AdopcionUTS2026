import Toast from "react-native-toast-message";

type ToastPosition = 'top' | 'bottom';

export const notificationSuccess = (position: ToastPosition = "top", message: string) => {
    return Toast.show({
        type: "success",
        position: position,
        text1: message,
    });
};

export const notificationError = (position: ToastPosition = "top", message: string) => {
    return Toast.show({
        type: "error",
        position: "top",
        text1: message,
    });
};

export const notificationWarning = (position: ToastPosition = "top", message: string) => {
    return Toast.show({
        type: "info",
        position: "top",
        text1: message,
    });
};
