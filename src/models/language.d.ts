export interface ILanguageResponse {
    [language: string]: number;
}

export interface ILanguageColors {
    [key: string]: string;
  }

export interface ILanguage {
    languages: string[];
    colors: string[];
    percentages: number[];
}