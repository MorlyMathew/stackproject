import { View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Screen2 = () => {
    
  return (
    <View style={styles.container}>
  
    <Text style={{fontSize:28,fontWeight:'bold',color:'black',textAlign:'center',marginTop:20}}>Screen2 !</Text>  
   
   </View>
  );
};

export default Screen2;



const styles = StyleSheet.create({
    container :{
        height : '100%',
        width : '100%' ,
        alignItems:'center',
        justifyContent:'center' ,
        backgroundColor:'white'
      }, button_text:{
        color:'white'
      } })



