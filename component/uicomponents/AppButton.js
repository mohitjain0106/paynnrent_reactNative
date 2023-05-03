import {Dimensions, View,TouchableOpacity,Text } from "react-native"
const { width, height } = Dimensions.get('window')
export default function AppButton({borderclr,btnwidth,btntxtcolor,brdradius,fontsize,btnHeight,buttonText,btnWidth,bgColor,...props }){
    return(
        <TouchableOpacity {...props}>
        <View style={{width: width *(btnWidth?btnWidth:1),
        height:height*(btnHeight?btnHeight:0.065),
    backgroundColor: bgColor?bgColor:"#3498db",
    borderRadius: brdradius?brdradius:10,
    borderWidth: btnwidth?btnwidth:0,
    borderColor: borderclr?borderclr:'black',
    padding: 10,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    }}>
          <Text  style={{ color: (btntxtcolor?btntxtcolor:'#fff'),  fontWeight: 'bold',fontSize:(fontsize?fontsize:20) }} >{buttonText}</Text>
        </View>
      </TouchableOpacity>
    )

}
