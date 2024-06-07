// PollutionReportScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from '@firebase/firestore';
import { db } from '../../firebaseConfig';
import { fetchData } from '../../api'; // Importe a função fetchData

export default function PollutionReportScreen() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reports, setReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    // UseEffect para buscar as denúncias ao inicializar o componente
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
        // Atualizar a lista de denúncias após adicionar uma nova
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
      // Atualizar a lista de denúncias após atualizar
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
      // Atualizar a lista de denúncias após excluir
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
      <Button title="Enviar Denúncia" onPress={handleAddReport} />

      <Text style={styles.title}>Lista de Denúncias</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportContainer}>
            <Text style={styles.reportDescription}>{item.description}</Text>
            <Text>{item.location}</Text>
            <TouchableOpacity onPress={() => handleEditReport(item)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteReport(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal para editar denúncia */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
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
          <Button title="Salvar" onPress={saveEditedReport} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  reportContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  reportDescription: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
