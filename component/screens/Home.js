import { View, Image, Dimensions, Text, Button, SectionList, FlatList, TouchableOpacity } from "react-native"
import AppButton from "../uicomponents/AppButton"
import Dialog from "react-native-dialog";
import { useState, useEffect } from "react"
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { getData } from "../../services/FetchNodeServices";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('window')
export default function Home({ navigation }) {

    const [visible, setVisible] = useState(false);
    const [Cities, setCities] = useState([]);
    const [endDate, setEndDate] = useState('End Date');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Start Date')
    const [startTime, setStartTime] = useState('Start Time')
    const [endTime, setEndTime] = useState('End Time')
    const [selectedCity, setSelectedCity] = useState('Gwalior')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [hrs, setHrs] = useState('')
    const [days, setDays] = useState('')
    const [daysTime, setDaysTime] = useState('')
    var dispatch = useDispatch()
    var navigation = useNavigation()
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const fetchAllCities = async () => {
        var result = await getData('user/display_all_cities')
        setCities(result.data)
    }

    useEffect(function () {
        fetchAllCities()
    }, [])

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setStartTimePickerVisibility(false);
    };
    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };



    const showDialog = () => {
        setVisible(true)


    }

    const handleCancel = () => {
        setVisible(false)
        //setSelectedCity(cityselected)
    }

    const handleStartConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date)
        const dt = new Date(date);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('-');
        console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
        setSelectedDate(x1[2] + '/' + x1[1] + '/' + x1[0]);

        hideDatePicker();
    };

    const handleEndConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const z = dt.toISOString().split('T');

        const z1 = z[0].split('-');
        console.log(z1[2] + '/' + z1[1] + '/' + z1[0]);
        setEndDate(z1[2] + '/' + z1[1] + '/' + z1[0]);
        dateDiff(date)
        hideEndDatePicker();
    };

    const dateDiff = (et) => {
        var startDay = new Date(date);
        var endDay = new Date(et);
        var diff = Math.abs(endDay - startDay);

        var diffe = Math.floor(diff / 1000)
        setDays(Math.floor(diffe / 86400))

        console.log(Math.floor(diffe / 86400))
    };


    const handleStartTimeConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        const y = new Date(date);
        setTime(date)
        const z = y.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        console.log(z);
        setStartTime(z)

        hideTimePicker();
    };

    const handleEndTimeConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        const y = new Date(date);
        const z = y.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        console.log(z);
        setEndTime(z)
        dateDiff2(date)
        hideTimePicker();
    };


    const dateDiff2 = (et) => {
        var startDay = new Date(time);
        var endDay = new Date(et);
        var diff = Math.abs(endDay - startDay);

        var diffe = Math.floor(diff / 1000)
        var hours = Math.floor(diffe / 3600)
        setHrs(Math.floor(diffe / 3600))
        daystimecalculation(hours)
        console.log(Math.floor(diffe / 3600))
    };

    const daystimecalculation = (hr) => {
        setDaysTime("Duration : " + days + " days " + hr + " hrs")

    }

    const handleSelectedCity = (citySelected) => {
        setSelectedCity(citySelected)

        setVisible(false)
    }


    const handleSearch = () => {
        dispatch({ type: "ADD_BOOKING", payload: { city: selectedCity, startDate: selectedDate, endDate: endDate, startTime: startTime, endTime: endTime, days: days, hours: hrs } })
        navigation.navigate('ListCars')
    }

    // const showTopCity = () => {
    //     return cities.map((item) => {
    //       return (<>
    //         {item.status == 'Top City' ?
    //           <View button >
    //             <SectionList primary={<Text style={{fontSize:18,fontWeight:'bold'}}>{item.cityname}</Text>} onClick={() => showDialog(item.cityname)} />
    //           </View> : <></>
    //         }</>)

    //     })
    //   }




    //   const showOtherCity = () => {
    //     return cities.map((item) => {
    //       return (<>
    //         {item.status == 'Other City' ?
    //           <ListItem button >
    //             <ListItemText style={{ fontSize: 18, fontWeight: "bold" }} primary={item.cityname} onClick={() => handleCitySelect(item.cityname)} />
    //           </ListItem> : <></>
    //         }</>)

    //     })
    //   }

    const SectionListBasics = ({ item }) => {
        return (


            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => handleSelectedCity(item.cityname)} >
                    <Text style={{ fontSize: 22 }}  >
                        {item.cityname}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };



    const handleCity = () => {


        return (
            <Dialog.Container visible={visible} >
                <Dialog.Title>Select City</Dialog.Title>
                <Dialog.Description>

                    <FlatList
                        data={Cities}
                        renderItem={({ item }) => <SectionListBasics item={item} />}
                        keyExtractor={item => item.cityid}
                    />
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={handleCancel} />

            </Dialog.Container>

        )

    }




    return (
        <View style={{ width: width, height: height, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#74b9ff' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 25, alignItems: 'center', height: height * 0.51, padding: 10 }}>
                <Image style={{ resizeMode: 'contain', width: 100, height: 100 }}
                    source={require('../assets/Logo1.png')} />
                <Text>Self Drive Car rental in India</Text>
                <View style={{ backgroundColor: '#fff', borderWidth: 1, height: 250, width: 300, borderRadius: 10, alignItems: 'center' }}>
                    <AppButton onPress={showDialog} btnWidth={0.4} brdradius={50} btnHeight={0.05} buttonText={selectedCity} fontsize={14} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, padding: 10, height: 50, alignItems: 'center' }}>
                        <AppButton onPress={showDatePicker} btnWidth={0.3} buttonText={selectedDate ? selectedDate : <></>} btnHeight={0.054} brdradius={50} fontsize={16} />



                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onCancel={hideDatePicker}
                            onConfirm={handleStartConfirm}
                        />


                        <AppButton onPress={showEndDatePicker} btnWidth={0.3} buttonText={endDate ? endDate : <></>} btnHeight={0.054} brdradius={50} fontsize={16} />
                        <DateTimePickerModal
                            isVisible={isEndDatePickerVisible}
                            mode='date'
                            onCancel={hideEndDatePicker}
                            onConfirm={handleEndConfirm}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, padding: 10, height: 50, alignItems: 'center' }}>
                        <AppButton onPress={showStartTimePicker} btnWidth={0.3} buttonText={startTime ? startTime : <></>} btnHeight={0.054} brdradius={50} fontsize={16} />



                        <DateTimePickerModal
                            isVisible={isStartTimePickerVisible}
                            mode='time'
                            onCancel={hideTimePicker}
                            onConfirm={handleStartTimeConfirm}
                        />


                        <AppButton onPress={showEndTimePicker} btnWidth={0.3} buttonText={endTime ? endTime : <></>} btnHeight={0.054} brdradius={50} fontsize={16} />
                        <DateTimePickerModal
                            isVisible={isEndTimePickerVisible}
                            mode='time'
                            onCancel={hideTimePicker}
                            onConfirm={handleEndTimeConfirm}
                        />

                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {daysTime}
                        </Text>
                    </View>


                    <AppButton onPress={() => handleSearch()} btnWidth={0.6} buttonText={'Search'} bgColor='#22a6b3' btnHeight={0.06} style={{ marginTop: 10 }} />

                </View>




                {/* <AppButton onPress={() => navigation.navigate("Login")} btnWidth={0.8} buttonText={'Login'} bgColor='#e67e22' /> */}
            </View>
            {handleCity()}



        </View>

    )

}