import React, { useState } from 'react'
import {View,Text,SafeAreaView,StyleSheet,KeyboardAvoidingView} from 'react-native';
import {Input,Button} from 'react-native-elements';
import {auth} from "./firebase";

const Signup = ({navigation}) => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState()
    

    const register = () =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
            });
        })
        .catch((error)=> alert(error.message));
    };


    return (
        <>
        <KeyboardAvoidingView style={styles.conntainer}>
            <Text>Signup screen</Text>
            <Input containerStyle={styles.inpField} placeholder="Name" value={name} type="text" autoFocus onChangeText={(val)=> setname(val) } />
            <Input containerStyle={styles.inpField} placeholder="Enter a email" value={email} type="email" onChangeText={(val)=> setemail(val) } />
            <Input containerStyle={styles.inpField} placeholder="Password" secureTextEntry value={password} type="password"  onChangeText={(val)=> setpassword(val) } />
            <Button containerStyle={styles.btn} onPress={register} title="Register" type="outline"/>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    conntainer:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    },
    inpField:{
        width:300
    },
    btn:{
      width: 135  
    },
});

export default Signup
