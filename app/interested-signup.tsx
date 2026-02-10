import { View, Text, Pressable, ScrollView, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import type { Interested } from "@/lib/survey-types";
import { getLocationFromIP } from "@/lib/geolocation";

export default function InterestedSignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWhatsapp = (whatsapp: string) => {
    const whatsappRegex = /^[\d\s\-\+\(\)]+$/;
    return whatsappRegex.test(whatsapp) && whatsapp.replace(/\D/g, "").length >= 10;
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Por favor, preencha seu nome");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, preencha seu e-mail");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido");
      return;
    }

    if (!whatsapp.trim()) {
      Alert.alert("Erro", "Por favor, preencha seu WhatsApp");
      return;
    }

    if (!validateWhatsapp(whatsapp)) {
      Alert.alert("Erro", "Por favor, insira um número de WhatsApp válido (mínimo 10 dígitos)");
      return;
    }

    setLoading(true);

    try {
      // Obter localização via IP
      const location = await getLocationFromIP();

      const interested: Interested = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        registeredAt: new Date().toISOString(),
        deviceType: Platform.OS === "ios" ? "iOS" : Platform.OS === "android" ? "Android" : "Web",
        location: {
          city: location.city,
          state: location.state,
        },
      };

      // Salvar no AsyncStorage
      const existingInterested = await AsyncStorage.getItem("interested_contacts");
      const contacts = existingInterested ? JSON.parse(existingInterested) : [];
      contacts.push(interested);
      await AsyncStorage.setItem("interested_contacts", JSON.stringify(contacts));

      if (Platform.OS !== "web") {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      setSubmitted(true);

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/(tabs)");
      }, 2000);
    } catch (error) {
      console.error("Erro ao registrar interesse:", error);
      Alert.alert("Erro", "Não foi possível registrar seu interesse. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/(tabs)");
  };

  if (submitted) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-between items-center">
            <View className="flex-1" />

            <View className="gap-6 items-center">
              <View className="w-20 h-20 rounded-full bg-success items-center justify-center">
                <Text className="text-5xl">✓</Text>
              </View>

              <View className="gap-2 items-center">
                <Text className="text-2xl font-bold text-foreground text-center">
                  Cadastro realizado!
                </Text>
                <Text className="text-sm text-muted text-center leading-relaxed max-w-xs">
                  Entraremos em contato quando as licenças de teste forem liberadas.
                </Text>
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-foreground leading-tight mb-4">
              Quer testar o sistema em primeira mão?
            </Text>

            <View className="bg-surface rounded-lg p-4 border border-border gap-3">
              <Text className="text-sm text-foreground font-semibold">
                Em breve vamos liberar licenças de teste por tempo limitado
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                Para pessoas que vendem a prazo e querem organizar suas cobranças.
              </Text>
              <Text className="text-sm text-muted leading-relaxed">
                Se quiser participar, deixe seus dados abaixo.
              </Text>
              <Text className="text-xs text-muted italic mt-2">
                Não é obrigatório. Não solicitamos cartão de crédito.
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="gap-4 mb-6">
            {/* Name */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Nome</Text>
              <TextInput
                placeholder="Seu nome completo"
                value={name}
                onChangeText={setName}
                editable={!loading}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholderTextColor="#687076"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">E-mail</Text>
              <TextInput
                placeholder="seu.email@exemplo.com"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholderTextColor="#687076"
              />
            </View>

            {/* WhatsApp */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">WhatsApp</Text>
              <TextInput
                placeholder="(11) 99999-9999"
                value={whatsapp}
                onChangeText={setWhatsapp}
                editable={!loading}
                keyboardType="phone-pad"
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholderTextColor="#687076"
              />
            </View>
          </View>

          {/* Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={({ pressed }) => [
                {
                  opacity: loading ? 0.5 : pressed ? 0.9 : 1,
                  transform: [{ scale: pressed && !loading ? 0.97 : 1 }],
                },
              ]}
            >
              <View className="bg-primary rounded-lg py-4 px-6 items-center">
                <Text className="text-base font-semibold text-background">
                  {loading ? "Enviando..." : "Quero participar do teste"}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleSkip}
              disabled={loading}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="border border-border rounded-lg py-4 px-6 items-center">
                <Text className="text-base font-semibold text-muted">Pular</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
