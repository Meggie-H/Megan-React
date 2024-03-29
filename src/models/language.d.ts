export interface ILanguage {
    title: string;
    description: string;
    type: string;
    additionalProperties: {
    type: string;
    };
}

export interface ILanguageColors {
    [key: string]: string;
  }