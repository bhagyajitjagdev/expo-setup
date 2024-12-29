import { Toast, ToastProvider, ToastViewport, useToastState } from '@tamagui/toast';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, YStack } from 'tamagui';

import config from '../tamagui.config';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <ToastProvider>
        <AppToast />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
          </Stack>
        </GestureHandlerRootView>

        <ToastViewport flexDirection="column-reverse" top={0} left={0} right={0} />
      </ToastProvider>
    </TamaguiProvider>
  );
}

const AppToast = () => {
  const appToast = useToastState();

  if (!appToast || appToast.isHandledNatively) return null;

  const variant = appToast.variant || 'default';

  const variantStyles = {
    error: { backgroundColor: '$red8' },
    success: { backgroundColor: '$green8' },
    warning: { backgroundColor: '$yellow8' },
    info: { backgroundColor: '$blue8' },
    default: { backgroundColor: '$gray8' },
  } as const;

  return (
    <Toast
      key={appToast.id}
      duration={appToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      opacity={1}
      scale={1}
      animation="bouncy"
      {...variantStyles[variant]}
      viewportName={appToast.viewportName}>
      <YStack>
        <Toast.Title>{appToast.title}</Toast.Title>
        {!!appToast.message && <Toast.Description>{appToast.message}</Toast.Description>}
      </YStack>
    </Toast>
  );
};
