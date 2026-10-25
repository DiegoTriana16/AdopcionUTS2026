import * as SplashScreen from "expo-splash-screen";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    type User
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";

export interface UserProfile {
    uid: string;
    nombre: string;
    cedula: string;
    telefono: string;
    rol: "user" | "admin";
    photoURL?: string;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                setLoading(true);

                if (!firebaseUser) {
                    setUser(null);
                    setProfile(null);
                    return;
                }

                setUser(firebaseUser);

                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    setProfile(userSnapshot.data() as UserProfile);
                } else {
                    setProfile(null);
                }

            } catch (error) {
                console.error("Error obteniendo perfil:", error);
                setProfile(null);
            } finally {
                setLoading(false);
                SplashScreen.hideAsync();
            }
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    const refreshUser = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            setUser(auth.currentUser);

            const userSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
            if (userSnapshot.exists()) {
                setProfile(userSnapshot.data() as UserProfile);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe utilizarse dentro de AuthProvider");
    }

    return context;
}

// adopcionuts@gmail.com
// AdopcionUTS1.

