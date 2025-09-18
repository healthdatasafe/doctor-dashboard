import React, { createContext, useState, useContext, useEffect } from 'react';
import type { appTemplates } from 'hds-lib-js';
import { settings as hdsLibSettings } from 'hds-lib-js';
import { getAppManaging } from '@/dr-lib';
import { useTranslation } from 'react-i18next';

const DEFAULT_LANGUAGE = 'en';
// followiing could be considered for auto-setting: window.matchMedia("(prefers-color-scheme: dark)").matches
const DEFAULT_THEME = 'light';

interface AppContextType {
  appManaging: appTemplates.AppManagingAccount | null;
  settings: {language: string, theme: string},
  updateAppManaging: (app: appTemplates.AppManagingAccount | null) => void;
  changeTheme: (theme: string) => void;
  changeLanguage: (theme: string) => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  const [appManaging, setAppManaging] = useState<appTemplates.AppManagingAccount | null>(getAppManaging());

  const [settings, setSettings] = useState<any | null>({
      language: DEFAULT_LANGUAGE,
      theme: DEFAULT_THEME,
  });

  const updateAppManaging = (app: appTemplates.AppManagingAccount | null) => {
    setAppManaging(app);
    loadSettings(app);
    console.log('===== Updated App Managing', app);
  };

  const loadSettings = async (app: appTemplates.AppManagingAccount | null) => {
    if (app == null) return; 
    const appSettings = await app.getCustomSettings();
    appSettings.language ??= DEFAULT_LANGUAGE;
    appSettings.theme ??= DEFAULT_THEME;

    console.log('===== Setting loaded', appSettings);
    setSettings(appSettings); // this causes settings to save at each load.. 
  }

  async function saveSettings() {
    if (appManaging == null) return;
    console.log('===== Setting saved', settings);
    await appManaging.setCustomSettings({ ...settings });
  }

  // update UI on state change
  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveSettings(); 
  }, [settings]);

  const changeTheme = (theme: string) => {
    if (theme !== settings.theme) {
      console.log(`AppContext changing theme from ${settings.theme} to ${theme}`);
      setSettings({ ...settings, theme });
    }
  }

  const changeLanguage = (language: string) => {
    if (language !== settings.language) {
      i18n.changeLanguage(language);
      hdsLibSettings.setPreferredLocales([language]);
      console.log(`AppContext changing language from ${settings.language} to ${language}`);
      setSettings({ ...settings, language });
    }
  }


  const value = {
    appManaging,
    settings,
    updateAppManaging,
    changeTheme,
    changeLanguage,
    isAuthenticated: !!appManaging,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
