import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const TrackList = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.pageTitle}>TrackList</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('TrackDetail')}
      />
    </View>
  )
}

export default TrackList

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  pageTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 50,
    alignSelf: 'center'
  },
  addBlog: {
    backgroundColor: 'skyblue',
    marginVertical: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  blogTitle: {
    color: 'gray',
    fontWeight: 'bold'
  },
});
