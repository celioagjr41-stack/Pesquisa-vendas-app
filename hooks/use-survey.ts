import { useReducer, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { SURVEY_QUESTIONS, type SurveyResponse, type SurveySession } from "@/lib/survey-types";
import { getLocationFromIP } from "@/lib/geolocation";

type SurveyState = {
  currentQuestion: number;
  responses: SurveyResponse[];
  sessionId: string;
  startTime: string;
  completed: boolean;
  loading: boolean;
};

type SurveyAction =
  | { type: "SET_RESPONSE"; payload: SurveyResponse }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "COMPLETE_SURVEY" }
  | { type: "RESET_SURVEY" }
  | { type: "SET_LOADING"; payload: boolean };

const generateSessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const surveyReducer = (state: SurveyState, action: SurveyAction): SurveyState => {
  switch (action.type) {
    case "SET_RESPONSE": {
      const existingIndex = state.responses.findIndex(
        (r) => r.questionId === action.payload.questionId
      );
      const newResponses =
        existingIndex >= 0
          ? [
              ...state.responses.slice(0, existingIndex),
              action.payload,
              ...state.responses.slice(existingIndex + 1),
            ]
          : [...state.responses, action.payload];
      return { ...state, responses: newResponses };
    }
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, SURVEY_QUESTIONS.length),
      };
    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0),
      };
    case "COMPLETE_SURVEY":
      return { ...state, completed: true };
    case "RESET_SURVEY":
      return {
        ...state,
        currentQuestion: 0,
        responses: [],
        completed: false,
        sessionId: generateSessionId(),
        startTime: new Date().toISOString(),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const useSurvey = () => {
  const [state, dispatch] = useReducer(surveyReducer, {
    currentQuestion: 0,
    responses: [],
    sessionId: generateSessionId(),
    startTime: new Date().toISOString(),
    completed: false,
    loading: false,
  });

  const setResponse = useCallback((questionId: number, answer: string | string[]) => {
    dispatch({
      type: "SET_RESPONSE",
      payload: { questionId, answer },
    });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, []);

  const previousQuestion = useCallback(() => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  }, []);

  const completeSurvey = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      // Obter localização via IP
      const location = await getLocationFromIP();

      const session: SurveySession = {
        sessionId: state.sessionId,
        startTime: state.startTime,
        endTime: new Date().toISOString(),
        completed: true,
        responses: state.responses,
        deviceType: Platform.OS === "ios" ? "iOS" : Platform.OS === "android" ? "Android" : "Web",
        location: {
          city: location.city,
          state: location.state,
        },
      };

      // Salvar no AsyncStorage
      const existingSessions = await AsyncStorage.getItem("survey_sessions");
      const sessions = existingSessions ? JSON.parse(existingSessions) : [];
      sessions.push(session);
      await AsyncStorage.setItem("survey_sessions", JSON.stringify(sessions));

      dispatch({ type: "COMPLETE_SURVEY" });
    } catch (error) {
      console.error("Erro ao completar pesquisa:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state]);

  const resetSurvey = useCallback(() => {
    dispatch({ type: "RESET_SURVEY" });
  }, []);

  const currentQuestionData = SURVEY_QUESTIONS[state.currentQuestion];
  const isFirstQuestion = state.currentQuestion === 0;
  const isLastQuestion = state.currentQuestion === SURVEY_QUESTIONS.length - 1;
  const hasAnsweredCurrentQuestion = state.responses.some(
    (r) => r.questionId === currentQuestionData?.id
  );

  return {
    state,
    currentQuestion: currentQuestionData,
    currentQuestionIndex: state.currentQuestion,
    totalQuestions: SURVEY_QUESTIONS.length,
    responses: state.responses,
    sessionId: state.sessionId,
    completed: state.completed,
    loading: state.loading,
    isFirstQuestion,
    isLastQuestion,
    hasAnsweredCurrentQuestion,
    setResponse,
    nextQuestion,
    previousQuestion,
    completeSurvey,
    resetSurvey,
  };
};
