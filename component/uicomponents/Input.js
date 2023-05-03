import React,{useState,useEffect} from 'react';

import {
  StyleSheet,  
  Text,
  TextInput,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const {width,height}=Dimensions.get('window')

export default function Input({labelTxt,error,iconName,setValue,...props})
{
return(
    <View style={{ padding:4,width:width*0.9, marginTop:4,marginBottom:4}}>
    <Text style={{fontSize:14,fontWeight:'bold'}}>{labelTxt}</Text>
    <View style={styles.textContainer}>
      <Icon name={iconName} style={{fontSize:22}}/>
    <TextInput
    style={{fontSize:16}}
    
    {...props}
  
    />

    </View>
    {error? <Text style={{fontSize:12,color:'red',fontWeight:700}}>{error}</Text>:<></>}
   </View> 
)

}


const styles = StyleSheet.create({
  textContainer: {
    width: width*0.85,
    backgroundColor:'#fff',
    borderRadius:5,
    borderWidth:0.5,
    borderColor:'#3498db',
    padding:10,
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
     
  },

});
