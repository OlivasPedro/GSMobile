import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

export default function SustainabilityTipsScreen() {
  const tips = [
    "Reduza o uso de plásticos descartáveis.",
    "Participe de limpezas de praias para ajudar a remover resíduos plásticos e outros detritos.",
    "Recicle sempre que possível para reduzir o desperdício e conservar recursos naturais.",
    "Use produtos biodegradáveis, como sacolas reutilizáveis e produtos de limpeza e higiene pessoal ecológicos.",
    "Apoie organizações de conservação marinha, como a Sea Shepherd, que trabalham para proteger os oceanos e a vida marinha.",
    "Mantenha-se informado sobre questões ambientais e participe de campanhas de conscientização para promover a sustentabilidade.",
    "Evite o desperdício de água, adotando práticas de uso eficiente e reutilizando a água sempre que possível.",
    "Compartilhe seu conhecimento sobre sustentabilidade com amigos e familiares, inspirando-os a adotar hábitos mais eco-friendly.",
    "Considere a pegada de carbono ao fazer compras e escolha produtos e serviços que tenham um impacto ambiental reduzido.",
    "Explore alternativas de transporte sustentável, como caminhar, andar de bicicleta ou usar o transporte público sempre que possível.",
    "Faça parte de iniciativas de reflorestamento e conservação de habitats naturais para ajudar a mitigar as mudanças climáticas e preservar a biodiversidade.",
    "Contribua para a ciência cidadã participando de projetos de monitoramento ambiental e coleta de dados sobre ecossistemas marinhos."
  ];

  const openExternalLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dicas de Sustentabilidade</Text>
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipContainer}>
          <Text style={styles.tip}>{tip}</Text>
        </View>
      ))}
      <Text style={styles.link} onPress={() => openExternalLink('https://seashepherd.org/')}>Saiba mais sobre a Sea Shepherd</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3e5fc', // Azul oceano
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0d47a1', // Tom mais escuro de azul
    textAlign: 'center',
    fontFamily: 'sans-serif', // Fonte genérica sans-serif, pode variar de acordo com o dispositivo
  },
  tipContainer: {
    backgroundColor: 'rgba(192, 192, 192, 0.3)', // Fundo acinzentado com transparência
    padding: 10, // Adicionando um espaço de preenchimento ao redor do texto
    borderRadius: 5, // Adicionando bordas arredondadas
    marginBottom: 15, // Adicionando margem inferior para separar do próximo parágrafo
  },
  tip: {
    fontSize: 18,
    color: '#0d47a1', // Tom mais escuro de azul
    textAlign: 'center',
    fontFamily: 'sans-serif', // Fonte genérica sans-serif, pode variar de acordo com o dispositivo
  },
  link: {
    fontSize: 16,
    color: '#1565c0', // Azul mais escuro para links
    textDecorationLine: 'underline',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif', // Fonte genérica sans-serif, pode variar de acordo com o dispositivo
  },
});
