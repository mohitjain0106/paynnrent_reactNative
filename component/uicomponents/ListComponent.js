import React from "react";
import { Dimensions, Image, Text, View } from 'react-native';
import AppButton from "./AppButton";
const { width, height } = Dimensions.get('window')
export default function ListComponent() {
    return (
        // <View style={{  padding:10,alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', borderWidth: 2, width: width * 0.9, height: height * 0.2, display: 'flex',justifyContent:'space-evenly',}}>
                <View style={{  alignItems: 'center' ,backgroundColor:'green'}}>
                    <Image source={require('../assets/Creta.png')} style={{ resizeMode: 'contain', width: 150, height: 90 }} />
                    <View>
                        <Text>Hyundai</Text>
                        <Text style={{ margin: 3, fontWeight: 700 }}>Grand i10</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'blue' ,alignItems:'center'}}>
                    <View style={{ flexDirection: 'row', marginTop: 10}}>
                        <View style={{ alignItems: 'center', flexDirection: 'row',margin:5 }}>
                            <Image source={require("../assets/petrol.png")}  style={{resizeMode:'contain',height:20,width:20}}/>
                            <Text style={{  fontWeight: 600,fontSize:13 }}>Diesel</Text>
                        </View>

                        <View style={{ alignItems: 'center', flexDirection: 'row' ,margin:5}}>
                            <Image source={require("../assets/manual-transmission-icon.png")}style={{resizeMode:'contain',height:20,width:20}} />
                            <Text style={{  fontWeight: 600,fontSize:13 }}>Manual</Text>
                        </View>

                        <View style={{ alignItems: 'center', flexDirection: 'row' ,margin:5}}>
                            <Image source={require("../assets/car-seat-icon.png")} style={{resizeMode:'contain',height:20,width:20}}/>
                            <Text style={{ fontWeight: 600,fontSize:13 }}>Seats</Text>
                        </View>

                    </View>
                    <Text style={{ color: '#000', margin: 5, fontWeight: 800, fontSize: 20, }}>&#8377;2700</Text>
                    <AppButton buttonText={'BOOK'} btnWidth={0.3} bgColor='#e67e22' btnHeight={0.055} fontsize={15} />
                </View>

            </View>

        // </View>
    )
}