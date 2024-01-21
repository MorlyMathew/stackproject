// OfflineStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'apiResponse';

export const saveApiResponse = async (data) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving API response to AsyncStorage:', error);
  }
};

export const getApiResponse = async () => {
  try {
    const jsonData = await AsyncStorage.getItem(KEY);
    return jsonData ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error('Error getting API response from AsyncStorage:', error);
    return null;
  }
};

export const clearApiResponse = async () => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (error) {
    console.error('Error clearing API response from AsyncStorage:', error);
  }
};
