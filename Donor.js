import React, { useState } from 'react'
//import { Button } from 'react-native';
import { StyleSheet, Text, View, Modal } from 'react-native'
import { Input, Button } from "react-native-elements";
import { db } from "./firebase";

const Donor = ({navigation}) => {
    const [name, setname] = useState("");
    const [number, setnumber] = useState()
    const [bloodType, setbloodType] = useState()
    const [email, setemail] = useState()
    const [details, setdetails] = useState()

    const [modal, setmodal] = useState(false)
    const blood = ['A', 'O', 'AB', 'B']

    const submit = async ()=>{
        await db
        .collection("list")
        .add({
            name,
            number,
            bloodType,
            email,
            details,
        })
        .then(()=>{
            navigation.goBack();
        })
        .catch(error=>alert(error))
    };

    return (
        <><View style={{flex:1,justifyContent:"space-between"}}>
            <View style={styles.view1}>
                <Input containerStyle={styles.inpField} placeholder="Name" value={name} type="text" autoFocus onChangeText={(val) => setname(val)} />
                <Input containerStyle={styles.inpField} placeholder="Number" value={number} type="number" onChangeText={(val) => setnumber(val)} />
            </View>
            <View style={{flex:1,alignItems:"center",}}>
                <Input containerStyle={styles.inpField1} placeholder="Enter a email" type="email" value={email} onChangeText={(val) => setemail(val)} />
                <Input containerStyle={styles.inpField1} placeholder="add some details" type="text" value={details} onChangeText={(val) => setdetails(val)} />


                {/* <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />
                    */}
                <Button title="Select Blood Group " type="outline" onPress={() => setmodal(true)} />
                <Modal visible={modal} animationType="slide">
                    <Text>Its a Modal</Text>
                    {
                        blood.map((val, id) => {
                            return (
                                <Button containerStyle={styles.btn} key={id} containerStyle={{ marginBottom: 20 }} title={val} type="solid" onPress={() => {
                                    alert(`you have Selected ${val} Blood Group`)
                                    setbloodType(val)
                                    setmodal(false)
                                }} />
                            
                            )
                        })
                    }
                </Modal>
                <Button containerStyle={{marginTop:10}} title="SUBMIT" type="solid" onPress={submit} />
            </View>
            </View>
        </>
    )
}

export default Donor

const styles = StyleSheet.create({
    inpField: {
        width: "45%"
    },
    view1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        maxHeight:70,

    },
    btn: {
        marginBottom: 10
    },
    inpField1:{
        width:"90%",
    }
})
