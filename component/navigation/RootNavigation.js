import React, { useState,useEffect } from 'react';
import AppHeader from '../uicomponents/AppHeader';
import Login from '../screens/Login';
import Home from '../screens/Home';
import ListCars from '../screens/ListCars';
import { getStoreData,removeStoreData } from '../storage/AsyncStorage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconicicon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import useNavigation from '@react-navigation/native';
import {View,Text,Avatar,Image} from 'react-native'
import ListComponent from '../uicomponents/ListComponent';
import OtpInput from '../uicomponents/OtpInput';
import BookingSummary  from '../screens/BookingSummary';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function RootNavigation( ) { 
  const [initialScreen,setInitialScreen]=useState(null)
  const [userInfo,setUserInfo]=useState([])
  const checkAuth=async()=>{
    var user=await getStoreData('USER')
    setUserInfo(user)
    console.log('user:',user)
    if(!user)
    setInitialScreen("Login")
    else
    setInitialScreen("Home1")
  }
  useEffect(()=>{
    checkAuth()
  },[])

  const handleLogout=(props)=>{
removeStoreData("USER")
props.navigation.navigate('Login')
  }
  const ProjectDrawer = () => {
    return (
      <Drawer.Navigator initialRouteName='Home'
      drawerContent={props=><CustomDrawerContent{...props}/>}>
        <Drawer.Screen name="Home" component={Home} options={{headerShown:false,
        drawerIcon:()=><MCI name={"home-city"} size={24}/>,}}/>
        <Drawer.Screen name="ListCars" component={ListCars} options={{headerShown:false,
        drawerIcon:()=><MCI name={"format-list-bulleted"} size={24}/> }} />
      </Drawer.Navigator>
    );
  }
    function CustomDrawerContent (props){
    return(
      <DrawerContentScrollView {...props}>
        <View style={{display:'flex',padding:20,alignItems:'center',flexDirection:'column'}}>
        <Image  style={{marginBottom:5,borderRadius:50,resizeMode:'contain',width:100,height:100}}
        source={require('../assets/4.jpg')}/>
        <Text style={{fontWeight:'bold'}}>{userInfo.fullname}</Text>
        <Text>+91-{userInfo.mobilenumber}</Text>
        <Text style={{fontSize:12}}>{ userInfo.emailid}</Text>
        </View>
      <DrawerItemList {...props}/>
      <DrawerItem label="My Profile" 
      icon={()=><MCI name={"account"} size={20}/>}
      />

<DrawerItem label="Settings"
      icon={()=><Iconicicon name={"settings"} size={20}/>}
      />
<TouchableOpacity>
<DrawerItem label="Logout"
      icon={ ()=><MCI name={"logout"} size={20}/>}
      onPress={()=>handleLogout(props)}    />
      </TouchableOpacity>
    
      </DrawerContentScrollView>
    )
   }
  return (
    <NavigationContainer>
    {initialScreen?<Stack.Navigator initialRouteName={initialScreen}>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Home1" component={ProjectDrawer} options={{header:AppHeader,}}  />
      <Stack.Screen name="ListCars" component={ListCars}  options={{header:AppHeader,}}/>
      <Stack.Screen name='AppHeader' component={AppHeader} options={{headerShown:false}}/>
      <Stack.Screen name='ListComponent' component={ListComponent} options={{headerShown:false}}/>
      <Stack.Screen name='OtpInput'  component={OtpInput} options={{headerShown:false}}/>
      <Stack.Screen name='Bookingsummary'  component={BookingSummary} options={{header:AppHeader}}/>

    </Stack.Navigator>:<Text>plss Wait ...</Text> }
    </NavigationContainer>
  );
  

}
