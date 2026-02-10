import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { SurveyQuestionComponent } from "@/components/survey-question";
import { useSurvey } from "@/hooks/use-survey";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function SurveyQuestionScreen() {
  const router = useRouter();
  const survey = useSurvey();

  const currentQuestion = survey.currentQuestion;
  const selectedAnswer = survey.responses.find(
    (r) => r.questionId === currentQuestion?.id
  )?.answer as string | undefined;

  const handleSelectAnswer = (answer: string) => {
    if (currentQuestion) {
      survey.setResponse(currentQuestion.id, answer);
    }
  };

  const handleNext = async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (survey.isLastQuestion) {
      await survey.completeSurvey();
      router.push("/survey-complete");
    } else {
      survey.nextQuestion();
    }
  };

  const handlePrevious = async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    survey.previousQuestion();
  };

  if (!currentQuestion) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <Text className="text-foreground">Carregando...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6 flex-1">
      <View className="flex-1 flex-col justify-between">
        {/* Question Component */}
        <View className="flex-1">
          <SurveyQuestionComponent
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            questionNumber={survey.currentQuestionIndex + 1}
            totalQuestions={survey.totalQuestions}
          />
        </View>

        {/* Navigation Buttons */}
        <View className="gap-3 mt-6">
          {/* Next Button */}
          <Pressable
            onPress={handleNext}
            disabled={!survey.hasAnsweredCurrentQuestion || survey.loading}
            style={({ pressed }) => [
              {
                opacity: !survey.hasAnsweredCurrentQuestion ? 0.5 : pressed ? 0.9 : 1,
                transform: [{ scale: pressed && survey.hasAnsweredCurrentQuestion ? 0.97 : 1 }],
              },
            ]}
          >
            <View className="bg-primary rounded-lg py-4 px-6 items-center">
              <Text className="text-base font-semibold text-background">
                {survey.isLastQuestion ? "Concluir" : "Próximo"}
              </Text>
            </View>
          </Pressable>

          {/* Previous Button */}
          {!survey.isFirstQuestion && (
            <Pressable
              onPress={handlePrevious}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="border border-border rounded-lg py-4 px-6 items-center">
                <Text className="text-base font-semibold text-foreground">Voltar</Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}
