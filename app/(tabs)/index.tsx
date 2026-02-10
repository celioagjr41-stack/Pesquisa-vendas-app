import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const handleStartSurvey = async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("survey-question" as any);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          {/* Header Spacer */}
          <View className="flex-1" />

          {/* Content */}
          <View className="gap-6 mb-12">
            {/* Title */}
            <View className="gap-2">
              <Text className="text-4xl font-bold text-foreground text-center leading-tight">
                Pesquisa rápida
              </Text>
              <Text className="text-lg font-semibold text-primary text-center">
                Controle de vendas a prazo
              </Text>
            </View>

            {/* Subtitle */}
            <Text className="text-base text-muted text-center leading-relaxed">
              Leva menos de 3 minutos. Não solicitamos dados bancários.
            </Text>

            {/* Description */}
            <View className="bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-sm text-foreground text-center leading-relaxed">
                Ajude-nos a entender melhor suas necessidades e validar uma solução simples para
                organizar clientes, valores e vencimentos.
              </Text>
            </View>
          </View>

          {/* Button */}
          <Pressable
            onPress={handleStartSurvey}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View className="bg-primary rounded-lg py-4 px-6 items-center">
              <Text className="text-base font-semibold text-background">Responder pesquisa</Text>
            </View>
          </Pressable>

          {/* Footer Spacer */}
          <View className="flex-1" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
