export {};

declare global {
  interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    disableVerticalSwipes: () => void;

    initData?: string;
    initDataUnsafe?: any;
    themeParams?: any;
    colorScheme?: string;

    MainButton: {
      setText: (text: string) => void;
      onClick: (cb: () => void) => void;
      show: () => void;
      hide: () => void;
    };
  }

  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}
