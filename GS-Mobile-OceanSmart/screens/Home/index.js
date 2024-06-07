import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OceanSmart</Text>
      <Text style={styles.subtitle}>Bem-vindo ao OceanSmart! Nós nos dedicamos a promover práticas de Reciclagem Inteligente para proteger nosso precioso meio ambiente marinho.</Text>
      <Text style={styles.description}>Reciclagem Inteligente é mais do que apenas separar os resíduos. É sobre compreender o impacto que nossas escolhas têm no oceano e adotar medidas conscientes para reduzir a poluição e preservar a vida marinha.</Text>
      <Text style={styles.description}>Nosso aplicativo oferece uma ampla gama de recursos para ajudá-lo nessa jornada de sustentabilidade. Você encontrará dicas práticas e informativas sobre como reciclar corretamente os resíduos, com foco especial em materiais como plástico, que representam uma grande ameaça aos oceanos.</Text>
      <Text style={styles.description}>Além disso, fornecemos informações sobre pontos de coleta de recicláveis próximos, tornando mais fácil para você descartar seus resíduos de forma responsável e ajudar a manter nossas praias e oceanos limpos.</Text>
      <Button title="Explorar Recursos de Sustentabilidade" onPress={() => navigation.navigate('Sustainability')} />
      <Button title="Encontrar Pontos de Coleta Próximos" onPress={() => navigation.navigate('CollectionPoints')} />
      <Button title="Denunciar Poluição" onPress={() => navigation.navigate('Report')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
