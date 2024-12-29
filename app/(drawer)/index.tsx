import Entypo from '@expo/vector-icons/Entypo';
import { useToastController } from '@tamagui/toast';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTheme, YStack, ListItem, ScrollView, Button, Input, XStack } from 'tamagui';

import { getAxios } from '~/api';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import AdaptiveIcon from '~/utils/component/UseAssets';

interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Home() {
  const theme = useTheme();

  const toast = useToastController();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchId, setSearchId] = useState('');

  const fetchPosts = async (id?: string) => {
    try {
      const res = await getAxios<IPost[]>({
        endpoint: '/posts',
        id: id ? id : undefined,
      });

      if (!res) {
        console.log('Response is null or undefined');
        return;
      }

      const postsData = Array.isArray(res) ? res : [res];
      setPosts(postsData as unknown as IPost[]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.show('Error', {
        message: 'Failed to fetch posts',
        native: false,
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = () => {
    if (searchId.trim() === '') {
      fetchPosts();
    } else {
      fetchPosts(searchId);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/(drawer)/index.tsx" title="Home" />
        <YStack justifyContent="center" alignItems="center">
          <Entypo
            name="mixi"
            size={40}
            color={theme.red9.val}
            onPress={() => {
              toast.show('Welcome!', {
                message: "Don't worry, we've got your data.",
                native: false,
                variant: 'info',
              });
            }}
          />
          <AdaptiveIcon width={100} height={100} />
        </YStack>

        <YStack paddingBottom="$4">
          <XStack alignItems="center" space="$2">
            <Input
              flex={1}
              size="$4"
              value={searchId}
              onChangeText={setSearchId}
              keyboardType="numeric"
            />
            <Button size="$4" onPress={handleSearch}>
              Go
            </Button>
          </XStack>
        </YStack>

        <ScrollView>
          <YStack>
            {posts.map((post) => (
              <ListItem key={post.id} title={post.title} subTitle={post.body} bordered />
            ))}
          </YStack>
        </ScrollView>
      </Container>
    </>
  );
}
