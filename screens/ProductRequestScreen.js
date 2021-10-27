import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class ProductRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      productName:"",
      reasonToRequest:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(productName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    console.log(productName, reasonToRequest, userId)
    db.collection('requested_products').add({
        "user_id": userId,
        "product_name":productName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
    })

    this.setState({
        productName :'',
        reasonToRequest : ''
    })

    return alert("Product Requested Successfully")
  }


  render(){
    return(
      <SafeAreaProvider>
        <View style={{flex:1}}>
          <MyHeader title="Request Product" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter product name"}
                onChangeText={(text)=>{
                    this.setState({
                        productName:text
                    })
                }}
                value={this.state.productName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the product"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.productName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
        </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#8a00db',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#8a00db",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
