import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Sound from 'react-native-sound';

import stations from './data/stations';

let playerItem;
const App = () => {
  const [currentStation, setcurrentStation] = useState('Nothing to Play');

  useEffect(() => {
    if (playerItem) {
      playerItem.stop();
      playerItem.release();
    }
  }, []);

  const playSound = (item) => {
    setcurrentStation(item.name);

    if (playerItem) {
      playerItem.stop();
      playerItem.release();
    }
    playerItem = new Sound(item.url, null, (e) => {
      if (e) {
        console.log(e);
      } else {
        playerItem.play();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Radios</Text>
      {stations.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.card}
          onPress={playSound.bind(null, item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.player}>
        <Text style={{textAlign: 'center'}}>{currentStation}</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    elevation: 6,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  player: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 16,
    width: '100%',
  },
});
