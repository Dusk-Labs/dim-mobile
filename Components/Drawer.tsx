import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import Button from '../Components/Button';

interface Libraries {
  id: number,
  name: string,
  locations: string[] | null,
  media_type: string,
};

export const Drawer: any = (props: any) => {
  const { token, host, navigation } = props;
  const [libraries, setLibraries] = useState<Libraries[]>([]);

  useEffect(() => {
    if (!token)
      return;

    const config = {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    };

    console.log("fetching");

    (async () => {
      try {
        const res = await fetch(`http://${host}/api/v1/library`, config);
        const payload = await res.json();

        setLibraries(payload);
      } catch(err) {
        // TODO: Catch error;
        console.log(err);
      }
    })();
  }, [setLibraries, token]);

  const libraryNames = libraries.map(                                                                                     x => <Button 
            style={style.container}
            key={x.id}
            title={x.name}
            onPress={() => navigation.navigate('library', { id: x.id })}
          />
  );

  return (
    <DrawerContentScrollView {...props} style={style.container}>
      {libraryNames}
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#3a3a3a",
  }
});
