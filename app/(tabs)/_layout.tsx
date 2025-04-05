import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router, Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Product Listing',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown:false,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                router.replace({
                  pathname: '/Add',
                  params: {
                    screenName: 'Add',
                    product: '',
                  },
                });
              }}
            />
          ),
        }}

        initialParams={{ screenName: 'Add', product: '' }}
      />
    </Tabs>
  );
}
