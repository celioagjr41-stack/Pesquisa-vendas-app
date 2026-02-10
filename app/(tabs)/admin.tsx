import { View, Text, Pressable, ScrollView, TextInput, Share } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import type { SurveySession, Interested } from "@/lib/survey-types";
import { groupByLocation, formatLocation } from "@/lib/geolocation";

const ADMIN_PASSWORD = "admin123";

export default function AdminScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [sessions, setSessions] = useState<SurveySession[]>([]);
  const [interested, setInterested] = useState<Interested[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "interested" | "locations">("overview");

  const handleLogin = async () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setPassword("");
      if (Platform.OS !== "web") {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      await loadData();
    } else {
      if (Platform.OS !== "web") {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const sessionsData = await AsyncStorage.getItem("survey_sessions");
      if (sessionsData) {
        setSessions(JSON.parse(sessionsData));
      }

      const interestedData = await AsyncStorage.getItem("interested_contacts");
      if (interestedData) {
        setInterested(JSON.parse(interestedData));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setSessions([]);
    setInterested([]);
    setPassword("");
    setActiveTab("overview");
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleExportCSV = async () => {
    if (interested.length === 0) {
      alert("Nenhum interessado para exportar");
      return;
    }

    const headers = ["Nome", "E-mail", "WhatsApp", "Data de Registro", "Dispositivo", "Localidade"];
    const rows = interested.map((item) => [
      item.name,
      item.email,
      item.whatsapp,
      new Date(item.registeredAt).toLocaleString("pt-BR"),
      item.deviceType,
      formatLocation(item.location || {}),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    if (Platform.OS !== "web") {
      try {
        await Share.share({
          message: csv,
          title: "Interessados em Teste - CSV",
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "interessados.csv";
      a.click();
    }
  };

  const completedSessions = sessions.filter((s) => s.completed);
  const conversionRate =
    sessions.length > 0 ? ((completedSessions.length / sessions.length) * 100).toFixed(1) : "0";
  const interestedRate =
    completedSessions.length > 0
      ? ((interested.length / completedSessions.length) * 100).toFixed(1)
      : "0";

  if (!isLoggedIn) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-between">
            <View className="flex-1" />

            <View className="gap-6">
              <View className="gap-2">
                <Text className="text-3xl font-bold text-foreground text-center">
                  Painel Administrativo
                </Text>
                <Text className="text-sm text-muted text-center">
                  Digite a senha para acessar
                </Text>
              </View>

              <View className="gap-4">
                <TextInput
                  placeholder="Senha"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                  placeholderTextColor="#687076"
                />

                <Pressable
                  onPress={handleLogin}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.9 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                    },
                  ]}
                >
                  <View className="bg-primary rounded-lg py-4 px-6 items-center">
                    <Text className="text-base font-semibold text-background">Entrar</Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <View className="flex-1" />
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-foreground">Painel de Controle</Text>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-sm font-semibold text-primary">Sair</Text>
          </Pressable>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setActiveTab("overview")}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "overview" ? "bg-primary" : "bg-surface border border-border"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    activeTab === "overview" ? "text-background" : "text-foreground"
                  }`}
                >
                  Visao Geral
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("interested")}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "interested" ? "bg-primary" : "bg-surface border border-border"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    activeTab === "interested" ? "text-background" : "text-foreground"
                  }`}
                >
                  Interessados ({interested.length})
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("locations")}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "locations" ? "bg-primary" : "bg-surface border border-border"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    activeTab === "locations" ? "text-background" : "text-foreground"
                  }`}
                >
                  Localidades
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Indicators */}
            <View className="gap-3 mb-6">
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Total de Acessos</Text>
                <Text className="text-3xl font-bold text-foreground">{sessions.length}</Text>
              </View>

              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Respostas Completas</Text>
                <Text className="text-3xl font-bold text-foreground">{completedSessions.length}</Text>
              </View>

              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Taxa de Conversao</Text>
                <Text className="text-3xl font-bold text-primary">{conversionRate}%</Text>
              </View>

              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Taxa de Interesse em Teste</Text>
                <Text className="text-3xl font-bold text-success">{interestedRate}%</Text>
                <Text className="text-xs text-muted mt-1">
                  {interested.length} de {completedSessions.length} respondentes
                </Text>
              </View>

              {completedSessions.length > 0 && (
                <View className="bg-surface rounded-lg p-4 border border-border mt-3">
                  <Text className="text-sm text-muted mb-2">Principais Localidades</Text>
                  {Array.from(groupByLocation(completedSessions))
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([location, count]) => (
                      <View key={location} className="flex-row justify-between items-center py-1">
                        <Text className="text-xs text-foreground">{location}</Text>
                        <Text className="text-xs font-semibold text-primary">{count}</Text>
                      </View>
                    ))}
                </View>
              )}
            </View>

            {/* Sessions List */}
            <View className="mb-6">
              <Text className="text-lg font-bold text-foreground mb-3">Sessoes Recentes</Text>
              {completedSessions.length === 0 ? (
                <View className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-sm text-muted text-center">
                    Nenhuma resposta completa ainda
                  </Text>
                </View>
              ) : (
                completedSessions.slice(-5).map((session, index) => (
                  <View
                    key={index}
                    className="bg-surface rounded-lg p-4 border border-border mb-2"
                  >
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm font-semibold text-foreground">
                        Sessao {session.sessionId.split("-")[0]}
                      </Text>
                      <Text className="text-xs text-muted">{session.deviceType}</Text>
                    </View>
                    <Text className="text-xs text-muted">
                      {new Date(session.startTime).toLocaleString("pt-BR")}
                    </Text>
                    <Text className="text-xs text-muted mt-1">
                      Localidade: {formatLocation(session.location || {})}
                    </Text>
                    <Text className="text-xs text-muted mt-1">
                      Respostas: {session.responses.length}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}

        {/* Locations Tab */}
        {activeTab === "locations" && (
          <>
            <View className="mb-6">
              <Text className="text-lg font-bold text-foreground mb-3">Respondentes por Localidade</Text>
              {completedSessions.length === 0 ? (
                <View className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-sm text-muted text-center">
                    Nenhuma resposta com localizacao ainda
                  </Text>
                </View>
              ) : (
                Array.from(groupByLocation(completedSessions))
                  .sort((a, b) => b[1] - a[1])
                  .map(([location, count]) => (
                    <View
                      key={location}
                      className="bg-surface rounded-lg p-4 border border-border mb-2 flex-row justify-between items-center"
                    >
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground">{location}</Text>
                        <Text className="text-xs text-muted mt-1">Respondentes</Text>
                      </View>
                      <View className="bg-primary rounded-lg px-3 py-2">
                        <Text className="text-sm font-bold text-background">{count}</Text>
                      </View>
                    </View>
                  ))
              )}
            </View>

            <View className="mb-6">
              <Text className="text-lg font-bold text-foreground mb-3">Interessados por Localidade</Text>
              {interested.length === 0 ? (
                <View className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-sm text-muted text-center">
                    Nenhum interessado com localizacao ainda
                  </Text>
                </View>
              ) : (
                Array.from(groupByLocation(interested))
                  .sort((a, b) => b[1] - a[1])
                  .map(([location, count]) => (
                    <View
                      key={location}
                      className="bg-surface rounded-lg p-4 border border-border mb-2 flex-row justify-between items-center"
                    >
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground">{location}</Text>
                        <Text className="text-xs text-muted mt-1">Interessados</Text>
                      </View>
                      <View className="bg-success rounded-lg px-3 py-2">
                        <Text className="text-sm font-bold text-background">{count}</Text>
                      </View>
                    </View>
                  ))
              )}
            </View>
          </>
        )}

        {/* Interested Tab */}
        {activeTab === "interested" && (
          <>
            {interested.length > 0 && (
              <Pressable
                onPress={handleExportCSV}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  },
                ]}
              >
                <View className="bg-primary rounded-lg py-3 px-4 items-center mb-6">
                  <Text className="text-sm font-semibold text-background">
                    Exportar como CSV
                  </Text>
                </View>
              </Pressable>
            )}

            {interested.length === 0 ? (
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted text-center">
                  Nenhum interessado registrado ainda
                </Text>
              </View>
            ) : (
              interested.map((item, index) => (
                <View
                  key={index}
                  className="bg-surface rounded-lg p-4 border border-border mb-3"
                >
                  <View className="mb-2">
                    <Text className="text-sm font-semibold text-foreground">{item.name}</Text>
                  </View>
                  <View className="gap-1">
                    <Text className="text-xs text-muted">Email: {item.email}</Text>
                    <Text className="text-xs text-muted">WhatsApp: {item.whatsapp}</Text>
                    <Text className="text-xs text-muted">
                      Registrado: {new Date(item.registeredAt).toLocaleString("pt-BR")}
                    </Text>
                    <Text className="text-xs text-muted">Dispositivo: {item.deviceType}</Text>
                    <Text className="text-xs text-muted">
                      Localidade: {formatLocation(item.location || {})}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </>
        )}

        {/* Debug Info */}
        <View className="bg-surface rounded-lg p-4 border border-border mt-6">
          <Text className="text-xs text-muted font-semibold mb-2">INFORMACOES DE DEBUG</Text>
          <Text className="text-xs text-muted">
            Total de sessoes: {sessions.length}
            {"\n"}
            Sessoes completas: {completedSessions.length}
            {"\n"}
            Interessados em teste: {interested.length}
            {"\n"}
            Ultima atualizacao: {new Date().toLocaleTimeString("pt-BR")}
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
