import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>OceanSmart</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Bem-vindo ao OceanSmart! Nós nos dedicamos a promover práticas de Reciclagem Inteligente para proteger nosso precioso meio ambiente marinho.</Text>
        </View>
        <Text style={styles.description}>Nosso aplicativo oferece uma ampla gama de recursos para ajudá-lo nessa jornada de sustentabilidade. Você encontrará dicas práticas e informativas sobre como reciclar corretamente os resíduos, com foco especial em materiais como plástico, que representam uma grande ameaça aos oceanos.</Text>
        <Text style={styles.description}>Além disso, fornecemos informações sobre pontos de coleta de recicláveis próximos, tornando mais fácil para você descartar seus resíduos de forma responsável e ajudar a manter nossas praias e oceanos limpos.</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
              title="Explorar Recursos de Sustentabilidade" 
              onPress={() => navigation.navigate('Sustentabilidade')} 
              color="#1565c0" 
            />
          </View>
          <View style={styles.button}>
            <Button 
              title="Encontrar Pontos de Coleta Próximos" 
              onPress={() => navigation.navigate('Pontos de Coleta')} 
              color="#1565c0" 
            />
          </View>
          <View style={styles.button}>
            <Button 
              title="Denunciar Poluição" 
              onPress={() => navigation.navigate('Denúncia')} 
              color="#1565c0" 
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#b3e5fc',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d47a1',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  subtitleContainer: {
    backgroundColor: 'rgba(192, 192, 192, 0.3)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#0d47a1',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#0d47a1',
    fontFamily: 'sans-serif',
    backgroundColor: 'rgba(192, 192, 192, 0.3)',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginBottom: 15,
    width: '80%',
  },
});
