import React, { useEffect, useContext } from 'react'
import { useIsFocused } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import LocationContext from '../contexts/Location';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TrackList = ({ navigation: { navigate } }) => {
  const { fetchTracks, tracks } = useContext(LocationContext)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      fetchTracks()
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      {
        tracks.map(track => (
          <TouchableOpacity
            key={track._id}
            style={styles.listItem}
            onPress={() => {
              navigate('TrackDetail', { track }) 
            }}
          >
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>{track.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default TrackList

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: '100%'
  },
  listItem: {
    overflow: 'hidden',
    marginVertical: 4,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});
