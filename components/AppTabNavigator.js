import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image} from 'react-native';
import ProductExchangeScreen from '../screens/ProductExchangeScreen';
import ProductRequestScreen from '../screens/ProductRequestScreen';

export const AppTabNavigator = createBottomTabNavigator({
  ExchangeProducts: {
    screen: ProductExchangeScreen,
    navigationOptions: {
      tabBarIcon: <Image source={require("../assets/request-list1.png")}
        style= {{width: 20, height: 20}} />,
      tabBarLabel: "Exchange Product"
    } 
  },
  ProductRequest: {
    screen: ProductRequestScreen,
    navigationOptions: {
      tabBarIcon: <Image source={require("../assets/product.jpg")}
        style= {{width: 20, height: 20}} />,
      tabBarLabel: "Product Request"
    } 
  }
})