import { registerEnumType } from '@nestjs/graphql';

export enum AllowedLanguage {
  en = 'en',
  fr = 'fr',
}

registerEnumType(AllowedLanguage, {
  name: 'AllowedLanguage',
  description: 'Allowed languages are en, fr',
  valuesMap: {
    en: {
      description: 'English',
    },
    fr: {
      description: 'Français',
    },
  },
});
