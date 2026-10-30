import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Home() {
  async function enviarNotificacao(): Promise<void> {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Atividade Concluída!",
        body: "Você recebeu uma nova notificação!",
        sound: true, // Habilita o som no iOS
      },
      trigger: null,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.descricao}>
        Clique no botão abaixo para receber uma notificação.
      </Text>

      <TouchableOpacity style={styles.botao} onPress={enviarNotificacao}>
        <Text style={styles.textoBotao}>Enviar notificação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  descricao: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  botao: {
    backgroundColor: "#84065a",
    padding: 16,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
