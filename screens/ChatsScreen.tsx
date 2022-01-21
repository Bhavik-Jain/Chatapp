import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatRooms from '../data/ChatRooms';
import { RootTabScreenProps } from '../types';

export default function ChatsScreen({ navigation }: RootTabScreenProps<'Chats'>) {
  return (
    <View style={styles.container}>
      <FlatList 
        keyExtractor={(item) => item.id}
        data={ChatRooms}
        renderItem={({item}) => <ChatListItem chatRoom={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
