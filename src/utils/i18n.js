/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import zhLocaleData from 'react-intl/locale-data/zh';
import { DEFAULT_LOCALE } from 'utils/constants';
import Utils from 'utils/utils';

import zhTranslationMessages from '../translations/zh.json';
import enTranslationMessages from '../translations/en.json';

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

export const getLanguage = () => (Utils.getCookie('sofa-lang') ? Utils.getCookie('sofa-lang') : 'zh');

export const appLocales = [
  'zh',
  'en',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};

export const getFormattedMessages = (locale = DEFAULT_LOCALE, key) => {
  const messages = translationMessages[locale];
  if (messages) {
    return messages[key] || key;
  }
  return key;
};
