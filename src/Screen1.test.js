// MyFlatList.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import NetInfo from '@react-native-community/netinfo';
import MyFlatList from './Screen1'; // Import your FlatList component

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock AsyncStorage functions
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('MyFlatList Component', () => {
  it('renders FlatList with data when online', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto' }]),
      })
    );

    const { getByText } = render(<MyFlatList />);

    // Wait for data to be loaded
    await waitFor(() => getByText('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'));

    expect(getByText('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto')).toBeTruthy();
    // expect(getByText('Item 2 body')).toBeTruthy();
  });

  it('renders FlatList with data from AsyncStorage when offline', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() => Promise.reject('Offline'));

    const { getByText } = render(<MyFlatList />);

    // Wait for data to be loaded from AsyncStorage
    await waitFor(() => getByText('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'));

    expect(getByText('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto')).toBeTruthy();
    expect(getByText('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto')).toBeTruthy();
  });
});
