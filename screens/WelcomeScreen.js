import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView} from 'react-native';

//import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';



export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false'
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       console.log(this.state.firstName, this.state.lastName, this.state.contact, this.state.emailId, this.state.address )
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address
       })
       return(alert('User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        )
       )
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return alert(errorMessage)
     });
   }
 }

userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
     this.props.navigation.navigate('ExchangeProducts')
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return alert(errorMessage)
   })
 }

showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#8a00db'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
)
}

  render(){
    return(
      <View>
        <View style={styles.container}>
          {this.showModal()}
        </View>

        <View style={{alignItems: 'center', marginTop:20}}>
        <Image
        source= {require('../assets/barterapp.jpg')}
        style = {{width:250, height: 200, marginBottom: 20, borderRadius: 50}}
        />

        <Text style = {styles.heading}>Barter App</Text>
        </View>

        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            placeholder="enter password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />

          <TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.userLogin(this.state.emailId, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.button}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading:{
    textAlign: 'center', 
    fontSize: 30, 
    fontFamily: 'Montserrat', 
    padding: 10, 
    fontWeight:'bold',
    backgroundColor: '#d084ff',
    marginBottom: 5
  },
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 3,
    borderColor: '#8a00db',
    fontSize: 20,
    margin: 5,
    paddingLeft: 10,
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#8a00db',
    padding: 10,
    marginLeft: 80,
    marginTop: 10
  },
  buttonText: { color: '#ffff', fontWeight: 'bold', fontSize: 20 },
  container:{
   flex:1,
   backgroundColor:'#d084ff',
   alignItems: 'center',
   justifyContent: 'center'
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#8a00db',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#8a00db',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#8a00db',
   fontSize:15,
   fontWeight:'bold',
   
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

});