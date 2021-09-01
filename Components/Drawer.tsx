import React from 'react';
import { Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export const Drawer: any = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text>Hello world</Text>
    </DrawerContentScrollView>
  );
};
