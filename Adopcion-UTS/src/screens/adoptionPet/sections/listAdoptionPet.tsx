import { useAuth } from '@/contexts/AuthContext';
import FormularioItem from '@/screens/adoptionPet/sections/FormularioItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, View } from 'react-native';
import { db } from '../../../../firebase';
import FormularioDetalle from './FormularioDetalle';

interface FormularioAdopcion {
  id: string;
  coleccion: string;
  [key: string]: unknown;
}


export function ListaFormulario() {
  const { user, profile, loading: authLoading } = useAuth();
  const [formularios, setFormularios] = useState<FormularioAdopcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState<FormularioAdopcion | null>(null);

  useEffect(() => {
    if (authLoading || !user || !profile) return;

    const buscarListaDeFormulario = async () => {
      setLoading(true);
      try {
        const colecciones = ['formularioAdopcion', 'formularioTest'];
        const documentos = await Promise.all(
          colecciones.flatMap((nombreColeccion) => {
            const referencia = collection(db, nombreColeccion);

            if (profile.rol === 'admin') {
              return [getDocs(query(referencia)).then((querySnapshot) => ({
                querySnapshot,
                coleccion: nombreColeccion,
              }))];
            }

            const consultas = [
              query(referencia, where('uid', '==', user.uid)),
              query(referencia, where('email', '==', user.email)),
            ];

            if (profile.cedula) {
              consultas.push(query(referencia, where('cedula', '==', profile.cedula)));
            }

            return consultas.map((consulta) => getDocs(consulta).then((querySnapshot) => ({
              querySnapshot,
              coleccion: nombreColeccion,
            })));
          }),
        );

        const formulariosUnicos = new Map<string, FormularioAdopcion>();
        documentos.forEach(({ querySnapshot, coleccion }) => {
          querySnapshot.docs.forEach((documento) => {
            formulariosUnicos.set(documento.id, {
              id: documento.id,
              coleccion,
              ...documento.data(),
            });
          });
        });

        setFormularios(Array.from(formulariosUnicos.values()));
      } catch (error) {
        console.error('Error al buscar la lista de formularios:', error);
        setFormularios([]);
      } finally {
        setLoading(false);
      }
    };

    buscarListaDeFormulario();
  }, [authLoading, profile, user]);

  const handleFormularioPress = (formulario: FormularioAdopcion) => {
    setFormularioSeleccionado(formulario);
    setModalVisible(true);
  };

  if (authLoading || loading) {
    return <ActivityIndicator size="large" color="#E1615F" />;
  }

  return (
    <ScrollView>
      {formularios.length === 0 && (
        <View style={{ padding: 20 }}>
          <Text>No hay formularios de adopción para mostrar.</Text>
        </View>
      )}
      {formularios.map((formulario) => (
        <FormularioItem
          key={formulario.id}
          formulario={formulario}
          esAdministrador={profile?.rol === 'admin'}
          onPress={() => handleFormularioPress(formulario)}
        />
      ))}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <FormularioDetalle
          formularioSeleccionado={formularioSeleccionado}
          closeModal={() => setModalVisible(false)}
          rol={profile?.rol}
          onSaved={(revision) => {
            setFormularios((formulariosActuales) => formulariosActuales.map((formulario) => (
              formulario.id === formularioSeleccionado?.id
                ? { ...formulario, ...revision }
                : formulario
            )));
          }}
        />
      </Modal>
    </ScrollView>
  );
}
