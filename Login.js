import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {auth} from "./firebase";


const Login = ({navigation}) => {

    
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            if(authUser){
                navigation.replace("Home")
            }
        });
        return unsubscribe;
    },[])

    const signIn = () =>{
        auth
        .signInWithEmailAndPassword(email,password)
        .catch((error)=> alert(error))
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={{ color: 'orange' }}> Login screen</Text>
                <Input containerStyle={styles.inpField} placeholder="Enter a email" type="email" value={email} autoFocus onChangeText={(val) => setemail(val)} />
                <Input containerStyle={styles.inpField} placeholder=" Enter a Password" type="password" value={password} secureTextEntry onChangeText={(val) => setpassword(val)} />
                <Button onPress={signIn} containerStyle={styles.btn} type="outline" title="LOG IN" />
                <Button  onPress={()=> navigation.navigate("Register")} containerStyle={{marginTop:10,width:135}} type="solid" title="Sign Up" />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inpField:{
        width:300
    },
    btn:{
        width:135
    }
});

export default Login
