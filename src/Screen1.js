import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator,RefreshControl, StyleSheet,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { saveApiResponse, getApiResponse, clearApiResponse } from './OfflineStorage';
const Screen1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
 
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
        const netInfoState = await NetInfo.fetch();
        const isOnline = netInfoState.isConnected;
  
        if (isOnline) {
          const response = await fetch(apiUrl);
          const newData = await response.json();
          setRefreshing(false);
          // Save the response to AsyncStorage for offline use
          saveApiResponse(newData);
  
          setData(newData);
        } else {
          // Retrieve saved response from AsyncStorage if offline
          const offlineData = await getApiResponse();
          setRefreshing(false);
          if (offlineData) {
            setData(offlineData);
          }
          Alert.alert(" ",
          "No internet Connection..")
        }
      } 
      catch (error) {
        
      
          this.setState({loader: false})
          setRefreshing(false);
        } 
      finally {
        // Set loading to false after data fetching is complete
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }
  const onRefresh = () => {
    setRefreshing(true);
    fetchData()
  };

   
      // Function to fetch data from the API
      const fetchData = async () => {
        try {
          const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
          const netInfoState = await NetInfo.fetch();
          const isOnline = netInfoState.isConnected;
    
          if (isOnline) {
            const response = await fetch(apiUrl);
            const newData = await response.json();
            setRefreshing(false);
            // Save the response to AsyncStorage for offline use
            saveApiResponse(newData);
    
            setData(newData);
          } else {
            // Retrieve saved response from AsyncStorage if offline
            const offlineData = await getApiResponse();
            setRefreshing(false);
            if (offlineData) {
              setData(offlineData);
            }
            Alert.alert(" ",
            "No internet Connection..")
          }
        } 
        catch (error) {
      
        
            this.setState({loader: false})
            setRefreshing(false);
          } 
        finally {
          // Set loading to false after data fetching is complete
          setLoading(false);
        }
      };


  return (
    <View style={styles.container}>
      <Text style = {{fontSize:20,margin:20,color:'black',fontWeight:'600'}}>HomeScreen</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.flatlist}>
            <Text style = {styles.flatitemheading}>{item.title}</Text>
            <Text style = {styles.flatitem}>{item.body}</Text>
            {/* Render other item components */}
          </View>
        )}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']} // Set the color of the refresh indicator
          />
        }
      />
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgray'
  },
  flatlist: {
     marginLeft:20,
     marginRight:20,
     marginTop:20,
     backgroundColor:'white',
     padding:10,
     borderRadius:10
  },
  flatitem: {
   color : 'black',
   marginTop:8
 },
 flatitemheading: {
  color : 'black',
  fontSize:15,
  fontWeight:'600'
},
})

