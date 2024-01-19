import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator,RefreshControl, StyleSheet,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Screen1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Set loading to true while fetching data
        setLoading(true);

        // Replace the URL with your actual API endpoint
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
        const response = await fetch(apiUrl);

        if (!response.ok) {
          // Handle error if the response is not OK
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setRefreshing(false);
        // Set the fetched data to the state
        setData(result);
      } catch (error) {
        // console.error('Error fetching data:', error);
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
          [
            {
              text: 'Refresh',
              onPress: fetchData,
            },
          ],
          { cancelable: false }
        );
        setRefreshing(false);
        this.setState({loader: false})
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
  // const fetchdata = () => {
   
      // Function to fetch data from the API
      const fetchData = async () => {
        try {
          // Set loading to true while fetching data
          setLoading(true);
  
          // Replace the URL with your actual API endpoint
          const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
          const response = await fetch(apiUrl);
  
          if (!response.ok) {
            // Handle error if the response is not OK
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result = await response.json();
          setRefreshing(false);
          // Set the fetched data to the state
          setData(result);
        } catch (error) {
          // console.error('Error fetching data:', error);
          Alert.alert(
            'Something Wrong...',
            'Please check your internet connection and try again.',
            [
              {
                text: 'Refresh',
                onPress: fetchData,
              },
           
            ],
            { cancelable: false }
          );
          this.setState({loader: false})
          setRefreshing(false);
        } finally {
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

