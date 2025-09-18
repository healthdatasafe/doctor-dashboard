import { useAppContext } from '@/context/AppContext';
import { useTranslation } from 'react-i18next';


export default function Component() {
  const { changeTheme, changeLanguage , settings } = useAppContext();
  const { t } = useTranslation();

  const languageOptions = [
    { text: 'English', value: 'en' },
    { text: 'Español', value: 'es' },
  ];
  const themeOptions = [
    { text: t('lightMode'), value: 'light' },
    { text: t('darkMode'), value: 'dark' },
  ];

  const switchTheme = (event) => {
    changeTheme(event.target.value);
  };

  const switchLng = async (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <>
      <article className="prose mb-4">
        <h2 className="font-normal">{t('settings')}</h2>
        <h3 className="italic">{t('settingsInstructions')}</h3>
      </article>
      <form className="flex max-w-sm items-center gap-4">
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="languageSelect"
        >
          {t('language')}
        </label>
        <select
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id="languageSelect"
          onChange={switchLng}
          value={settings.language}
        >
          {languageOptions.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="themeSelect"
        >
          {t('theme')}
        </label>
        <select
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id="themeSelect"
          onChange={switchTheme}
          value={settings.theme}
        >
          {themeOptions.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
