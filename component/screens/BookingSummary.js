import React, { useEffect,useState } from "react"
import { getStoreData } from "../storage/AsyncStorage"
import { View, Dimensions, Text, Image } from "react-native"
import AppButton from "../uicomponents/AppButton"
import { getData, ServerURL } from "../../services/FetchNodeServices"
import { useSelector } from "react-redux"
import RazorpayCheckout from 'react-native-razorpay';
const { height, width } = Dimensions.get('window')
export default function BookingSummary(props) {
    const [userInfo,setUserInfo]=useState([])


    var vehicle=useSelector(state=>state.vehicle)
    var item=Object.values(vehicle)[0]
    var bookingDetails=useSelector(state=>state.booking)
    console.log (bookingDetails)
var dpc=500
var rc=1000
var ta=item.rentperhour*(bookingDetails.days*(24+parseInt(bookingDetails.hours)))+dpc+rc


const checkAuth=async()=>{
    var user=await getStoreData('USER')
    setUserInfo(user)
    console.log('user:',user)
  }
  useEffect(function(){checkAuth()},[])

    var month=['Jan','Feb','Mar ','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const getDateFormat=(d,t)=>{
  var dd=d.split("/")
  var cd=dd[2]+"-"+parseInt(dd[1])+"-"+dd[0]+" "+t.substring(0,t.lastIndexOf(' '))+":00"
  var nd=new Date(cd)
  console.log("Date:",cd+" Date:"+nd)
  return nd}

  

  var options = {
    description: 'Credits towards consultation',
    image: `${ServerURL}/images/Logo1.png`,
    currency: 'INR',
    key: 'rzp_test_GQ6XaPC6gMPNwH', // Your api key
    amount: ta*100,
    name:userInfo.fullname ,
    prefill: {
      email: userInfo.emailid,
      contact: userInfo.mobilenumber,
      name: 'PaynRent'
    },
    theme: {color: '#F37254'}
  }
  
  const handlePayment=()=>{
    RazorpayCheckout.open(options).then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
    
  }

    // var booking=useSelector(state=>state.booking)
    // var BookingDetails=Object.values(booking)[2]
    
    return (
        <View style={{ width: width, height: height, alignItems: 'center' }}>
            <Text style={{ fontWeight: 600,marginTop:10 }}>Booking Details</Text>
            <Text style={{ fontSize: 22, fontWeight: 800, color: 'black',marginTop:10 }}>{item.companyname} {item.modelname}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
                    <Image source={require("../assets/petrol.png")} style={{ resizeMode: 'contain', height: 20, width: 20 }} />
                    <Text style={{ fontWeight: 600, fontSize: 13 }}>{item.fueltype}</Text>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
                    <Image source={require("../assets/manual-transmission-icon.png")} style={{ resizeMode: 'contain', height: 20, width: 20 }} />
                    <Text style={{ fontWeight: 600, fontSize: 13 }}>Manual</Text>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
                    <Image source={require("../assets/car-seat-icon.png")} style={{ resizeMode: 'contain', height: 20, width: 20 }} />
                    <Text style={{ fontWeight: 600, fontSize: 13 }}>Seats</Text>
                </View>
            </View>
            <View>
                <Image source={{uri:`${ServerURL}/images/${item.icon}`}} style={{resizeMode:'contain',height:100,width:150}}/>
            </View>
            <View style={{backgroundColor:'#fff',width:width*0.9,height:height*0.1,borderRadius:15,flexDirection:'row',justifyContent:'space-evenly', marginTop:10,elevation:5}}>
            
            <View style={{padding:5,marginTop:5}} >
                <Text  style={{fontSize:14,fontWeight:600}}> 1000 Km included Without fuel</Text>
                <Text  style={{fontSize:12,marginTop:20}}>Extra Km </Text>
            </View>
            <View style={{justifyContent:'center'}}>
                <AppButton btnWidth={0.3} btnHeight={0.05} brdradius={25} buttonText={'Change Plan'} fontsize={12} bgColor={'#fff'} btnwidth={1} btntxtcolor={'black'} />
            </View>
        
            </View>
            
        

            <View style={{alignItems:'center',backgroundColor:'#fff',marginTop:10,width:width*0.9,height:height*0.14,borderRadius:15,elevation:5}}>
            <View style={{marginTop:5}}>
                <Text style={{fontSize:14,fontWeight:500}}>{bookingDetails.days} days {bookingDetails.hours} hours</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{marginTop:0 , alignItems:'flex-start'}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{getDateFormat(bookingDetails.startDate,bookingDetails.startTime).getDate()+" "+month[getDateFormat(bookingDetails.startDate,bookingDetails.startTime).getMonth()]}</Text>
                <Text style={{fontSize:14,fontWeight:500,marginTop:7}}>{bookingDetails.startTime}, {days[getDateFormat(bookingDetails.startDate,bookingDetails.startTime).getDay()]}</Text>
                </View>
                
                <Text style={{marginTop:7}}> ------------------- </Text>
                <View style={{  alignItems:'flex-end'}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>{getDateFormat(bookingDetails.endDate,bookingDetails.endTime).getDate()+" "+month[getDateFormat(bookingDetails.endDate,bookingDetails.endTime).getMonth()]}</Text>
                <Text style={{fontSize:14,fontWeight:500,marginTop:7}}>{bookingDetails.endTime}, {days[getDateFormat(bookingDetails.endDate,bookingDetails.endTime).getDay()]}</Text>
            </View>
            </View>
            </View>


            <View style={{backgroundColor:'#fff',marginTop:10,width:width*0.9,height:height*0.05,borderRadius:15,justifyContent:'center',elevation:5}}>
                <Text style={{fontWeight:600,fontSize:16,marginLeft:10}}>{bookingDetails.city}</Text>
            </View>


            <View style={{backgroundColor:'#fff',marginTop:10,width:width*0.9,height:height*0.21,borderRadius:15,padding:10,elevation:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
                <Text style={{fontWeight:600,fontSize:15,marginLeft:10}}>Base Price</Text>
                <Text style={{fontWeight:400,fontSize:15,marginLeft:15}}>&#8377; {item.rentperhour}</Text>
                </View>
                <View style={{borderBottomWidth:1,width:width*0.80,marginLeft:10,borderBottomColor:'#bdc3c7' }}></View>
                <View style={{flexDirection:'row',display:'flex',justifyContent:'space-between',margin:5}}>
                <Text style={{fontWeight:600,fontSize:15,marginLeft:10}}>Delivery & pickup charge</Text>
                <Text style={{fontWeight:400,fontSize:15,marginRight:0}}>&#8377; {dpc}</Text>
                </View>
                <View style={{borderBottomWidth:1,width:width*0.8,marginLeft:10,borderBottomColor:'#bdc3c7'}}></View>

                <View style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
                <Text style={{fontWeight:600,fontSize:15,marginLeft:10}}>Refundable security deposite</Text>
                <Text style={{fontWeight:400,fontSize:15,marginLeft:0}}>&#8377; {rc}</Text>
                </View>
                <View style={{borderBottomWidth:1,width:width*0.8,marginLeft:10,color:'#bdc3c7',borderBottomColor:'#bdc3c7'}}></View>

                <View style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
                <Text style={{fontWeight:700,fontSize:17,marginLeft:10 ,color:'black'}}>Total</Text>
                <Text style={{fontWeight:400,fontSize:15,marginLeft:0}}>&#8377; {item.rentperhour*(bookingDetails.days*(24+parseInt(bookingDetails.hours)))+dpc+rc}</Text>
                </View>
                <Text style={{fontWeight:600,fontSize:12,marginLeft:10}}>includes all taxes and insurance</Text>
            </View>
            <AppButton onPress={()=>handlePayment()} btnWidth={0.8} buttonText={'Proceed to Payment'} style={{marginBottom:10}}/>

        </View>
    )
}  