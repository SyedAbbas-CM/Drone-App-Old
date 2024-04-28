import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { Image, ScrollView, Text, View, StyleSheet, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/FontAwesome'
import { WP } from '@/Theme/Responsive'
import { Colors } from '@/Theme/Variables'
import { APIRequest } from '@/Services/ApiRequest'
import { Config } from '@/Config'
import {  useSelector } from 'react-redux'
import database from '@react-native-firebase/database'
import { VeroHeader } from '@/Components'
import uuid from 'react-native-uuid';



const ChatScreen = props => {
  
  console.log('shwoing value sin ', props)
  const { Layout, Gutters, Fonts, Images } = useTheme()
  const [username, setUsername] = useState()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([])
  const [demoMessages,setDemoMessage]= useState([])
  const [loading, setLoading] = useState(false)
  const [locationsChildKey, setLocationsChildKey] = useState('')  
  const user = useSelector(state => state.user.user)
  const purchase_id = useSelector(state => state.user.purchase_id)

  console.log('showing values of user is',user);
  useEffect(() => {
    console.log("Locationnnnn childd key", locationsChildKey)
    const ref = database().ref().child('purchases_location').child(locationsChildKey)
    const listener = ref.on('value', snapshot => {
      console.log("Locationnnnn childd key second", locationsChildKey)
      setMessages([]),
      snapshot.forEach((childSnapshot) => {
        if(snapshot.key == locationsChildKey){
          console.log("Child in useeefccect", childSnapshot.val())
          if(childSnapshot.val()?.is_chat == true){
              setMessages(previousMessages => [...previousMessages, {
                  text: childSnapshot.val()?.message,
                  user: {
                    _id: childSnapshot.val()?.user_id
                  },
                  createdAt: new Date(),
                  _id: uuid.v4()
                }])
          }
        }
        });
    })
    return () => ref.off('value', listener)
  }, [database(), locationsChildKey])

  const databaseConnect = async () => {
    let purchasesChildKey = '';
    let locationChildKey = '';
    let locationSubChildKey = '';

    await database()
      .ref()
      .child('purchases')
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().purchase_id == purchase_id) {
            purchasesChildKey = childSnapshot.key;
          }
        });
      });

      await database()
      .ref()
      .child('purchases_location')
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key == purchasesChildKey) {
            locationChildKey = childSnapshot.key;
          }
        });
      });
    console.log('purchasesChildKey: ', purchasesChildKey);
    console.log('locationChildKey: ', locationChildKey);
    setLocationsChildKey(locationChildKey)
  }


    const onSend = async (message)=>{
      console.log("Message sent",  message)
      
      if (!locationsChildKey) {
        await databaseConnect()
      } else {
            database()
            .ref()
            .child('purchases_location')
            .child(locationsChildKey)
            .push({
              is_chat: true,
              message: message[0].text,
              user_id: user._id,
            })
      }
      await setMessages(previousMessages => GiftedChat.append(previousMessages, message))
      setLoading(true)
  }

  
  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: Colors.grey,
          },
          left: {
            backgroundColor: '#222831',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    )
  }
  function renderSend(props) {
    return (
      <Send {...props}>
        <Icon name="send" size={20} color={Colors.darkGrey}/>
      </Send>
    )
  }
  console.log('sadhadjhasdjha', messages)

  return (
    <View style={Layout.fill}>
      <VeroHeader title="Chat"/>
      <Image style={styles.avatar} source={Images.profile} />
      {/* <Text style={styles.name}>{`${'Name not found!'}`}</Text> */}
      <GiftedChat
        messages={messages.reverse()}
        //   textInputStyle = {{backgroundColor:'red'}}
        renderBubble={renderBubble}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        renderSend={renderSend}
        renderAvatar={() => null}
        containerStyle={styles.containerStyle}
        user={{
          _id: user._id,
        }}
      />
      <View style={styles.chatMargin}></View>
    </View>
  )
}
const styles = StyleSheet.create({
  name: {
    color: Colors.grey,
    fontSize: WP('5'),
    alignSelf: 'center',
  },
  send: {
    width: WP('5'),
    height: WP('5'),
    resizeMode: 'contain',
  },
  avatar: {
    height: WP('25'),
    width: WP('25'),
    resizeMode: 'cover',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: WP('5'),
  },
  bottomMargin: {
    marginBottom: WP('20'),
  },
  containerStyle: {
    borderTopWidth: 0,
    marginRight: WP('8'),
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginLeft: WP('8'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatMargin: {
    marginBottom: WP('3'),
  }
})

export default ChatScreen