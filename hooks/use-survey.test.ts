import { describe, it, expect } from "vitest";

// Importar diretamente o arquivo sem usar alias
import { SURVEY_QUESTIONS } from "../lib/survey-types";

describe("Survey Questions", () => {
  it("deve ter 8 perguntas", () => {
    expect(SURVEY_QUESTIONS).toHaveLength(8);
  });

  it("deve ter as perguntas corretas", () => {
    expect(SURVEY_QUESTIONS[0].question).toContain("tipo de negócio");
    expect(SURVEY_QUESTIONS[1].question).toContain("vende a prazo");
    expect(SURVEY_QUESTIONS[2].question).toContain("controla");
    expect(SURVEY_QUESTIONS[3].question).toContain("esqueceu");
    expect(SURVEY_QUESTIONS[4].question).toContain("aplicativo simples");
    expect(SURVEY_QUESTIONS[5].question).toContain("deixou de receber");
    expect(SURVEY_QUESTIONS[6].question).toContain("pagaria");
    expect(SURVEY_QUESTIONS[7].question).toContain("valor mensal");
  });

  it("deve ter opções para cada pergunta", () => {
    SURVEY_QUESTIONS.forEach((question) => {
      expect(question.options.length).toBeGreaterThan(0);
    });
  });

  it("pergunta 1 deve ter 5 opções", () => {
    expect(SURVEY_QUESTIONS[0].options).toHaveLength(5);
  });

  it("pergunta 2 deve ter 2 opções", () => {
    expect(SURVEY_QUESTIONS[1].options).toHaveLength(2);
  });

  it("pergunta 3 deve ter 5 opções", () => {
    expect(SURVEY_QUESTIONS[2].options).toHaveLength(5);
  });

  it("pergunta 4 deve ter 2 opções", () => {
    expect(SURVEY_QUESTIONS[3].options).toHaveLength(2);
  });

  it("pergunta 5 deve ter 3 opções", () => {
    expect(SURVEY_QUESTIONS[4].options).toHaveLength(3);
  });

  it("pergunta 6 deve ter 3 opções", () => {
    expect(SURVEY_QUESTIONS[5].options).toHaveLength(3);
  });

  it("pergunta 7 deve ter 3 opções", () => {
    expect(SURVEY_QUESTIONS[6].options).toHaveLength(3);
  });

  it("pergunta 8 deve ter 4 opções", () => {
    expect(SURVEY_QUESTIONS[7].options).toHaveLength(4);
  });

  it("todas as perguntas devem ter tipo radio", () => {
    SURVEY_QUESTIONS.forEach((question) => {
      expect(question.type).toBe("radio");
    });
  });

  it("todas as perguntas devem ter um ID único", () => {
    const ids = SURVEY_QUESTIONS.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(SURVEY_QUESTIONS.length);
  });
});
