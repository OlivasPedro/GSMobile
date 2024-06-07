import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.title}>Dicas de Sustentabilidade</Text>
      {tips.map((tip, index) => (
        <Text key={index} style={styles.tip}>{tip}</Text>
      ))}
      <Text style={styles.link} onPress={() => openExternalLink('https://seashepherd.org/')}>Saiba mais sobre a Sea Shepherd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tip: {
    fontSize: 18,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
