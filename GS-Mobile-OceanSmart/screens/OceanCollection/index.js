import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
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
          alert('Ponto de Coleta adicionado com sucesso!');
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
      alert('Ponto de Coleta atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar ponto de coleta.');
    }
  };

  const handleDeletePoint = async (id) => {
    const success = await deleteCollectionPoint(id);
    if (success) {
      const updatedPoints = points.filter(p => p.id !== id);
      setPoints(updatedPoints);
      alert('Ponto de Coleta excluído com sucesso!');
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
            <Text style={styles.pointAddress}>{item.address}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => handleEditPoint(item)} style={styles.button}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePoint(item.id)} style={styles.button}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.addButtonContainer}>
        <Button title="Adicionar Ponto de Coleta" onPress={() => setModalVisible(true)} color="#1565c0" />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedPoint ? 'Editar Ponto de Coleta' : 'Adicionar Ponto de Coleta'}</Text>
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
            <Button title="Salvar" onPress={selectedPoint ? saveEditedPoint : handleAddPoint} color="#1565c0" />
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
  pointContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pointName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  pointAddress: {
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
  addButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent:'center',
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    fontFamily: 'sans-serif', // Usando uma fonte genérica
  },
  cancelButton: {
    marginTop: 10,
  },
});

