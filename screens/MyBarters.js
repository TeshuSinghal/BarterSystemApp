import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import firebase from 'firebase';
import db from '../config.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class MyBartersScreen extends Component {
  constructor() {
    super();
    this.state = {
      exchangerId: firebase.auth().currentUser.email,
      exchangerName: '',
      myBarters: [],
    };
    this.requestRef = null;
  }

  static navigationOptions = { header: null };
  getExchangerDetails = (exchangerId) => {
    db.collection('users')
      .where('email_id', '==', exchangerId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            exchangerName: doc.data().first_name + ' ' + doc.data().last_name,
          });
        });
      });
  };
  getMyBarters = () => {
    this.requestRef = db
      .collection('all_barters')
      .where('exchanger_id', '==', this.state.exchangerId)
      .onSnapshot((snapshot) => {
        var myBarters = [];
        snapshot.docs.map((doc) => {
          var barter = doc.data();
          barter['doc_id'] = doc.id;
          myBarters.push(barter);
        });
        this.setState({ myBarters: myBarters });
      });
  };

  sendNotification = (productDetails, requestStatus) => {
    var requestId = productDetails.request_id;
    var exchangerId = productDetails.exchanger_id;
    db.collection('all_notifications')
      .where('request_id', '==', requestId)
      .where('exchanger_id', '==', exchangerId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = '';
          if (requestStatus === 'Product Sent') {
            message = this.state.exchangerName + ' Sent you the product.';
          } else {
            message =
              this.state.exchangerName +
              ' Has shown interest in exchanging the product. ';
          }
          db.collection('all_notifications').doc(doc.id).update({
            message: message,
            notification_status: 'unread',
            date: firebase.firestore.FieldValue.serverTimeStamp(),
          });
        });
      });
  };

  sendProduct = (productDetails) => {
    if (productDetails.request_status === 'Product Sent') {
      var requestStatus = 'exchanger Interested';
      db.collection('all_donations')
        .doc(productDetails.doc_id)
        .update({ request_status: 'exchanger Interested' });
      this.sendNotification(productDetails, requestStatus);
    } else {
      var requestStat = 'Product Sent';
      db.collection('all_donations')
        .doc(productDetails.doc_id)
        .update({ request_status: 'Product Sent' });
      this.sendNotification(productDetails, requestStat);
    }
  };

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.product_name}
      subtitle={
        'Requested By : ' +
        item.requested_by +
        '\nStatus : ' +
        item.request_status
      }
      leftElement={<Icon name="product" type="font-awesome" color="#8a00db" />}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                item.request_status === 'product Sent' ? 'green' : '#ff5722',
            },
          ]}
          onPress={() => {
            this.sendproduct(item);
          }}>
           
          <Text style={{ color: '#ffff' }}>
            {item.request_status === 'product Sent' ? 'product Sent' : 'Send product'}
          </Text> 
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount() {
    this.getExchangerDetails(this.state.exchangerId);
    this.getMyBarters();
  }
  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <SafeAreaProvider>
         
        <View style={{ flex: 1 }}>
           
          <MyHeader
            navigation={this.props.navigation}
            title="My Barters"
          /> 
          <View style={{ flex: 1 }}>
             
            {this.state.myBarters.length === 0 ? (
              <View style={styles.subtitle}>
                 
                <Text style={{ fontSize: 20 }}>
                  List of all product Barters
                </Text> 
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.myBarters}
                renderItem={this.renderItem}
              />
            )} 
          </View> 
        </View> 
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
