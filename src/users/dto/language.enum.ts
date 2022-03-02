import { registerEnumType } from '@nestjs/graphql';

export enum AllowedLanguage {
  en = 'en',
  fr = 'fr',
  nl = 'nl',
}

registerEnumType(AllowedLanguage, {
  name: 'AllowedLanguage',
  description: 'Allowed languages are en, fr, nl',
  valuesMap: {
    en: {
      description: 'English',
    },
    fr: {
      description: 'Français',
    },
    nl: {
      description: 'Nederlands',
    },
  },
});
