'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Locale } from './translations';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import theme from '@/theme/themeConfig';

type I18nContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: typeof translations['en'];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('cn');

    const t = translations[locale];
    const antdLocale = locale === 'cn' ? zhCN : enUS;

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            <ConfigProvider locale={antdLocale} theme={theme}>
                {children}
            </ConfigProvider>
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
