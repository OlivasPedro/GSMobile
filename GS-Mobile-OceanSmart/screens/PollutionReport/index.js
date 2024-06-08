import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { collection, addDoc, updateDoc, deleteDoc, doc } from '@firebase/firestore';
import { db } from '../../firebaseConfig';
import { fetchData } from '../../api';

export default function PollutionReportScreen() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reports, setReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    async function fetchReports() {
      const data = await fetchData();
      setReports(data);
    }
    fetchReports();
  }, []);

  const handleAddReport = async () => {
    if (description && location) {
      try {
        await addDoc(collection(db, 'pollution_reports'), {
          description,
          location,
          timestamp: new Date().toISOString(),
        });
        alert('Denúncia enviada com sucesso!');
        setDescription('');
        setLocation('');
        const updatedReports = await fetchData();
        setReports(updatedReports);
      } catch (error) {
        console.error("Erro ao enviar denúncia: ", error);
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleEditReport = (report) => {
    setSelectedReport(report);
    setNewDescription(report.description);
    setNewLocation(report.location);
    setModalVisible(true);
  };

  const saveEditedReport = async () => {
    try {
      await updateDoc(doc(db, "pollution_reports", selectedReport.id), {
        description: newDescription,
        location: newLocation,
      });
      alert('Denúncia atualizada com sucesso!');
      const updatedReports = await fetchData();
      setReports(updatedReports);
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar denúncia: ", error);
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await deleteDoc(doc(db, "pollution_reports", id));
      const updatedReports = reports.filter(report => report.id !== id);
      setReports(updatedReports);
      alert('Denúncia excluída com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir denúncia: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Denunciar Poluição</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Enviar Denúncia" onPress={handleAddReport} color="#1565c0" />

      <Text style={styles.subtitle}>Lista de Denúncias</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportContainer}>
            <Text style={styles.reportDescription}>{item.description}</Text>
            <Text style={styles.reportLocation}>{item.location}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => handleEditReport(item)} style={styles.button}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteReport(item.id)} style={styles.button}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedReport ? 'Editar Denúncia' : 'Adicionar Denúncia'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova Descrição"
              value={newDescription}
              onChangeText={setNewDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Nova Localização"
              value={newLocation}
              onChangeText={setNewLocation}
            />
            <Button title="Salvar" onPress={saveEditedReport} color="#1565c0" />
            <View style={styles.cancelButton}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#1565c0" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3e5fc',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d47a1',
    textAlign: 'center',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0d47a1',
    textAlign: 'center',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  input: {
    borderWidth: 1,
    borderColor: '#1565c0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  reportContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#1565c0',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  reportDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    fontFamily: 'sans-serif', //Usando uma fonte genérica
  },
  reportLocation: {
    fontSize: 16,
    color: '#0d47a1',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginRight: 10,
  },
  editButton: {
    color: '#1565c0',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  deleteButton: {
    color: 'red',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d47a1',
    textAlign: 'center',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  cancelButton: {
    marginTop: 10,
  },
});

