import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
    token: {
        colorPrimary: '#4F46E5', // Indigo-600
        borderRadius: 6,
        colorLink: '#4F46E5',
        fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    },
    components: {
        Button: {
            controlHeight: 40,
            controlHeightLG: 48,
            controlHeightSM: 32,
            paddingContentHorizontal: 20,
        },
        Card: {
            borderRadiusLG: 12,
        },
        Table: {
            headerBg: '#F9FAFB',
            headerSplitColor: 'transparent',
        }
    }
};

export default theme;
