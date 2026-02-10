import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function SurveyCompleteScreen() {
  const router = useRouter();

  const handleFinish = async () => {
    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    router.push("/interested-signup" as any);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between items-center">
          {/* Header Spacer */}
          <View className="flex-1" />

          {/* Content */}
          <View className="gap-6 items-center">
            {/* Success Icon */}
            <View className="w-20 h-20 rounded-full bg-success items-center justify-center">
              <Text className="text-5xl">✓</Text>
            </View>

            {/* Title */}
            <Text className="text-3xl font-bold text-foreground text-center leading-tight">
              Obrigado por participar!
            </Text>

            {/* Message */}
            <Text className="text-base text-muted text-center leading-relaxed max-w-xs">
              Sua resposta é muito importante para nós e nos ajudará a validar se essa solução
              faz sentido para seu negócio.
            </Text>
            <Text className="text-xs text-muted text-center italic mt-2">
              Próximo: Cadastro de interessados (opcional)
            </Text>
          </View>

          {/* Button */}
          <View className="w-full">
            <Pressable
              onPress={handleFinish}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View className="bg-primary rounded-lg py-4 px-6 items-center">
                <Text className="text-base font-semibold text-background">Concluir</Text>
              </View>
            </Pressable>
          </View>

          {/* Footer Spacer */}
          <View className="flex-1" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
