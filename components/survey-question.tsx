import { View, Text, Pressable, ScrollView } from "react-native";
import { cn } from "@/lib/utils";
import type { SurveyQuestion } from "@/lib/survey-types";

interface SurveyQuestionProps {
  question: SurveyQuestion;
  selectedAnswer?: string;
  onSelectAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function SurveyQuestionComponent({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}: SurveyQuestionProps) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
      <View className="flex-1 justify-between p-6">
        {/* Progress Indicator */}
        <View className="mb-8">
          <Text className="text-sm text-muted mb-2">
            Pergunta {questionNumber} de {totalQuestions}
          </Text>
          <View className="h-1 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{
                width: `${(questionNumber / totalQuestions) * 100}%`,
              }}
            />
          </View>
        </View>

        {/* Question */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-foreground leading-tight">
            {question.question}
          </Text>
        </View>

        {/* Options */}
        <View className="gap-3 mb-8">
          {question.options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => onSelectAnswer(option)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View
                className={cn(
                  "flex-row items-center p-4 rounded-lg border-2",
                  selectedAnswer === option
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                )}
              >
                {/* Radio Button */}
                <View
                  className={cn(
                    "w-6 h-6 rounded-full border-2 mr-3",
                    selectedAnswer === option
                      ? "bg-primary border-primary"
                      : "border-muted"
                  )}
                >
                  {selectedAnswer === option && (
                    <View className="w-full h-full rounded-full bg-white" />
                  )}
                </View>

                {/* Option Text */}
                <Text
                  className={cn(
                    "flex-1 text-base font-medium",
                    selectedAnswer === option ? "text-background" : "text-foreground"
                  )}
                >
                  {option}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
