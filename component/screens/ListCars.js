import { StatusBar, View, StyleSheet, FlatList, SafeAreaView, Dimensions, Text, Image } from "react-native"
import { useState, useEffect } from "react"
import AppButton from "../uicomponents/AppButton"
import { getData, ServerURL } from "../../services/FetchNodeServices"
import { useDispatch } from "react-redux"
const { width, height } = Dimensions.get('window')
export default function ListCars({ navigation, props }) {
    const [cars, setListCars] = useState([])
    const fetchCarList = async () => {
        var result = await getData('user/display_vehicle')
        setListCars(result.data)

    }
    useEffect(function () {
        fetchCarList()
    }, [])


    const RenderItem = ({ item }) => {
        var dispatch=useDispatch()

        const handleVehicle=(selectedItem)=>{
            dispatch({type:"ADD_VEHICLE",payload:[selectedItem.vehicleid,selectedItem]})
            navigation.navigate("Bookingsummary")
        }
        return (

            <View style={{ padding: 10, alignItems: 'center', backgroundColor: '#dcdde1' }}>
                <View style={{ flexDirection: 'row', borderWidth: 0, width: width * 0.9, height: height * 0.2, display: 'flex', justifyContent: 'space-evenly', borderRadius: 20, backgroundColor: "#fff" }}>
                    <View style={{ flexDirection: 'column', padding: 5 }}>
                        <View style={{ margin:3 }}>
                            <Text>{item.companyname}</Text>
                            <Text style={{ fontWeight: 700,fontSize:20 }}>{item.modelname}</Text>
                            <View style={{  marginTop: 10,flexDirection:'row' }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row', margin: 3 }}>
                                <Image source={require("../assets/petrol.png")} style={{ resizeMode: 'contain', height: 15, width: 15,margin:0 }} />
                                <Text style={{ fontWeight: 600, fontSize: 13 }}>{item.fueltype}</Text>
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: 'row', margin: 3 }}>
                                <Image source={require("../assets/manual-transmission-icon.png")} style={{ resizeMode: 'contain', height: 15, width: 15,margin:1 }} />
                                <Text style={{ fontWeight: 600, fontSize: 13 }}>Manual</Text>
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: 'row', margin: 3 }}>
                                <Image source={require("../assets/car-seat-icon.png")} style={{ resizeMode: 'contain', height: 15, width: 15,margin:1 }} />
                                <Text style={{ fontWeight: 600, fontSize: 13 }}>Seats</Text>
                            </View>
                            </View>

                            <Text style={{ color: '#000', margin: 5, fontWeight: 800, fontSize: 20, }}>&#8377; {item.rentperhour}</Text>
                            <Text style={{alignItems:'baseline',fontSize:10,fontWeight:600}}>Prices exclude fuel cost</Text>

                        
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        
                        <Image source={{ uri: `${ServerURL}/images/${item.icon}` }} style={{ resizeMode: 'contain', width: 120, height: 80 }} />
                            
                
                        <AppButton buttonText={'BOOK'} btnWidth={0.3} bgColor='#16a085' btnHeight={0.055} fontsize={15} brdradius={25}  onPress={()=>handleVehicle(item)}/>
                    </View>

                </View>

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cars}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => item.vehicleid}
            />
        </SafeAreaView>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,

        backgroundColor: '#f2f2f2'
    },
    itemStyle: {
        padding: 8,
        margin: 5,
        width: width * 0.9,
        backgroundColor: '#fff'

    }

});