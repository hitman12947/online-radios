import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';

import stations from './data/stations';

let playerItem;
const App = () => {
  const [currentStation, setcurrentStation] = useState('Nothing to Play');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (playerItem) {
      playerItem.stop();
      playerItem.release();
    } else {
      playSound(stations[0]);
      setIsPlaying(true);
    }
  }, []);

  const playSound = (item) => {
    setcurrentStation(item.name);

    if (playerItem) {
      playerItem.stop();
      playerItem.release();
      setIsPlaying(false);
    }
    playerItem = new Sound(item.url, null, (e) => {
      if (e) {
        console.log(e);
      } else {
        playerItem.play();
        setIsPlaying(true);
      }
    });
  };

  const playPause = () => {
    if (playerItem && isPlaying) {
      playerItem.pause();
      setIsPlaying(false);
      return;
    }
    if (playerItem) {
      playerItem.play();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Radios</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 40}}>
          {stations.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.card}
              onPress={playSound.bind(null, item)}>
              <View style={styles.stationContainer}>
                <Image
                  source={item.img}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.player}>
        <Text style={styles.playerText}>{currentStation}</Text>
        <TouchableOpacity onPress={playPause}>
          {isPlaying ? <Text>Pause</Text> : <Text>Play</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53E0BC',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'white',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 16,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#6ab04c',
  },
  cardImg: {width: '100%', height: '80%'},
  playerText: {textAlign: 'center', color: 'white'},
  stationContainer: {width: '100%', height: 100},
});
