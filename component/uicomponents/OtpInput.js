import React, { useRef, useState } from "react";
import { View, Text, TextInput, Dimensions } from 'react-native'
import AppButton from "./AppButton";
const {width,height}=Dimensions.get('window')

export default function OtpInput({navigation}) {
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourInput = useRef();
    return (
       <View style={{display:'flex' ,alignItems:"center",height:height,width:width}}>
             <Text style={{ fontSize: 25, fontWeight: 700, color: '#000' ,marginTop:150}}>Enter Otp</Text> 
            <View style={{ flexDirection: 'row',marginTop:15,justifyContent:'space-between',margin:15,width:width*0.7}}>
                <TextInput 
                 onchangeText={text => {
                 text && secondInput.current.focus()
                
                }}
                ref={firstInput} 
                 style={{ fontSize: 22, borderWidth: 1, width: 40, height: 50, borderRadius: 4 ,textAlign:'center'}} 
                maxLength={1} 
                keyboardType={'number-pad'} 
               
                 />
                <TextInput
                 onchangeText={text => {text 
                    ? thirdInput.current.focus()
                    :firstInput.current.focus()
                
                }}
                ref={secondInput} 
                 style={{ fontSize: 22, borderWidth: 1, width: 40, height: 50, borderRadius: 4,textAlign:'center' }}
                maxLength={1} 
                keyboardType="number-pad"
               />

                <TextInput 
                onchangeText={text => {
                    text ? fourInput.current.focus()
                    :secondInput.current.focus()
                
                }}
                ref={thirdInput}
                 style={{ fontSize: 18, borderWidth: 1, width: 40, height: 50, borderRadius: 4,textAlign:'center' }}
                 maxLength={1}
                 keyboardType={'number-pad'} 
                 
                />
                <TextInput 
                onchangeText={text => {text 
                    ? fourInput.current.focus()
                    :secondInput.current.focus();
                    !text && thirdInput.current.focus(); 
                
                }}
                ref={fourInput} 
                style={{ fontSize: 18, borderWidth: 1, width: 40, height: 50, borderRadius: 4 ,textAlign:'center'}} 
                maxLength={1}  
                keyboardType={'number-pad'} 
                
                />
            </View>
            <AppButton btnWidth={0.7} buttonText={'Verify'} onPress={()=>navigation.navigate("Home1")}/>
        </View>


    )
}