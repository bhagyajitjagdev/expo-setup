import '@tamagui/toast';

declare module '@tamagui/toast' {
  interface CustomData {
    variant?: 'success' | 'error' | 'warning' | 'info';
  }
}
