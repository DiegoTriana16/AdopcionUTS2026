import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc
} from "firebase/firestore";

import { MascotaModel } from "@/models/Mascota-model";
import { db } from "../../firebase";

interface MascotaContextType {
    mascotas: MascotaModel[];
    loading: boolean;

    getMascotas: () => Promise<void>;

    createMascota: (
        mascota: Omit<MascotaModel, "id">
    ) => Promise<string>;

    updateMascota: (
        id: string,
        mascota: Partial<Omit<MascotaModel, "id">>
    ) => Promise<void>;

    deleteMascota: (id: string) => Promise<void>;
}

const MascotaContext = createContext<MascotaContextType | undefined>(
    undefined
);

interface MascotaProviderProps {
    children: ReactNode;
}

export function MascotaProvider({
    children,
}: MascotaProviderProps) {
    const [mascotas, setMascotas] = useState<MascotaModel[]>([]);
    const [loading, setLoading] = useState(false);

    const getMascotas = async () => {
        try {
            setLoading(true);

            const mascotasQuery = query(
                collection(db, "Animales"),
                orderBy("createdAt", "desc")
            );

            const querySnapshot = await getDocs(mascotasQuery);

            const docs: MascotaModel[] = querySnapshot.docs.map(
                (document) => {
                    const data = document.data();

                    return {
                        id: document.id,
                        nombre: data.nombre,
                        edad: data.edad,
                        genero: data.genero,
                        raza: data.raza,
                        ubicacion: data.ubicacion,
                        descripcion: data.descripcion,
                        tipo: data.tipo,
                        disponibilidad: data.disponibilidad,
                        foto: data.foto,
                        createdAt: data.createdAt,
                    };
                }
            );

            setMascotas(docs);
        } catch (error) {
            console.error(
                "Error obteniendo mascotas:",
                error
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createMascota = async (
        mascota: Omit<MascotaModel, "id">
    ) => {
        try {
            setLoading(true);

            const mascotaRef = doc(
                collection(db, "Animales")
            );

            const newMascota: MascotaModel = {
                id: mascotaRef.id,
                ...mascota,
            };

            await setDoc(mascotaRef, newMascota);

            setMascotas((prev) => [
                ...prev,
                newMascota,
            ]);

            return mascotaRef.id;
        } catch (error) {
            console.error(
                "Error creando mascota:",
                error
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateMascota = async (
        id: string,
        mascota: Partial<Omit<MascotaModel, "id">>
    ) => {
        try {
            setLoading(true);

            const mascotaRef = doc(
                db,
                "Animales",
                id
            );

            await updateDoc(mascotaRef, mascota);

            setMascotas((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            ...mascota,
                        }
                        : item
                )
            );
        } catch (error) {
            console.error(
                "Error actualizando mascota:",
                error
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteMascota = async (id: string) => {
        try {
            setLoading(true);

            const mascotaRef = doc(
                db,
                "Animales",
                id
            );

            await deleteDoc(mascotaRef);

            setMascotas((prev) =>
                prev.filter(
                    (mascota) => mascota.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Error eliminando mascota:",
                error
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <MascotaContext.Provider
            value={{
                mascotas,
                loading,
                getMascotas,
                createMascota,
                updateMascota,
                deleteMascota,
            }}
        >
            {children}
        </MascotaContext.Provider>
    );
}

export function useMascotas() {
    const context = useContext(MascotaContext);

    if (!context) {
        throw new Error(
            "usemascotas debe utilizarse dentro de mascotaProvider"
        );
    }

    return context;
}