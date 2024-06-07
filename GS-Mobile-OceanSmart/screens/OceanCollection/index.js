import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { collection, addDoc, updateDoc, deleteDoc, doc } from '@firebase/firestore';
import { db } from '../../firebaseConfig';
import { fetchCollectionPoints, addCollectionPoint, updateCollectionPoint, deleteCollectionPoint } from '../../api';

export default function OceanCollectionPointsScreen() {
  const [points, setPoints] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCollectionPoints();
      setPoints(data);
    }
    fetchData();
  }, []);

  const handleEditPoint = (point) => {
    setSelectedPoint(point);
    setName(point.name);
    setAddress(point.address);
    setModalVisible(true);
  };
  
  const handleAddPoint = async () => {
    if (name && address) {
      if (selectedPoint) {
        await saveEditedPoint();
      } else {
        const newPoint = { name, address };
        const docId = await addCollectionPoint(newPoint);
        if (docId) {
          setPoints([...points, { id: docId, ...newPoint }]);
          setName('');
          setAddress('');
          setModalVisible(false);
        } else {
          alert('Erro ao adicionar ponto de coleta.');
        }
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const saveEditedPoint = async () => {
    const updatedPoint = { name, address };
    const success = await updateCollectionPoint(selectedPoint.id, updatedPoint);
    if (success) {
      const updatedPoints = points.map(p => (p.id === selectedPoint.id ? { ...p, ...updatedPoint } : p));
      setPoints(updatedPoints);
      setModalVisible(false);
    } else {
      alert('Erro ao atualizar ponto de coleta.');
    }
  };

  const handleDeletePoint = async (id) => {
    const success = await deleteCollectionPoint(id);
    if (success) {
      const updatedPoints = points.filter(p => p.id !== id);
      setPoints(updatedPoints);
    } else {
      alert('Erro ao excluir ponto de coleta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pontos de Coleta Oceânica</Text>
      <FlatList
        data={points}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pointContainer}>
            <Text style={styles.pointName}>{item.name}</Text>
            <Text>{item.address}</Text>
            <TouchableOpacity onPress={() => handleEditPoint(item)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletePoint(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Adicionar Ponto de Coleta" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Ponto de Coleta"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={address}
            onChangeText={setAddress}
          />
          <Button title="Salvar" onPress={selectedPoint ? saveEditedPoint : handleAddPoint} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pointContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  pointName: {
    fontSize: 18,
    fontWeight: 'bold',
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
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});
