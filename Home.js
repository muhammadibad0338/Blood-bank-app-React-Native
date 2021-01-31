import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native'
import { auth, db } from "./firebase";
import { Button, ListItem } from "react-native-elements";

//import { db } from "./firebase";
//import { ScrollView } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
    const [listitem, setlistitem] = useState([])
    const [modal, setmodal] = useState(false)
    const blood = ['O', 'A', 'B', 'AB']


    const [arr, setarr] = useState([])
    //const [sheet, setsheet] = useState(false)
    const [dis, setdis] = useState(false)
    const Logout = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }


    useEffect(() => {
        db.collection("list").onSnapshot(snapshot => (
            setlistitem(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),

            })))

        ))
        db.collection("list").onSnapshot(snapshot => (
            setarr(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),

            })))
        ))
    }, [])


    const sort = (val) => {
        //console.log(listitem[1].name);
        //console.log(listitem)
        console.log(arr)
        setlistitem(arr)
        if (val == "O") {
            setlistitem((old) => {
                return old.filter((elem, id) => {
                    return (elem.data.bloodType !== "A" && elem.data.bloodType !== "B" && elem.data.bloodType !== "AB")
                })
            })
        }
        else if (val == "A") {
            setlistitem((old) => {
                return old.filter((elem, id) => {
                    return (elem.data.bloodType !== "B" && elem.data.bloodType !== "AB")
                })
            })
        }
        else if (val == "B") {
            setlistitem((old) => {
                return old.filter((elem, id) => {
                    return (elem.data.bloodType !== "AB")
                })
            })
        }
        else if (val == "AB") {
            // setlistitem((old) => {
            //   return old.filter((elem, id) => {
            //     return (elem.data.bloodType == "all")
            // })
            //})
            setlistitem(arr)
        }

    }









    //listitem.filter((i)=>{
    //  return listitem[i].name == "test"
    //})

    //setarr(listitem)

    // setarr(()=>{})

    return (
        <>

            <View style={styles.header}>
                <Text style={{marginTop:5,fontSize:20,marginLeft:5}}>Welcome {auth?.currentUser.displayName}</Text>
                <Button  onPress={Logout} style={{ width: 135, }} title="Log Out" type="outline" />
            </View>


            <ScrollView style={{ maxHeight: "85%" }}>
                {
                    listitem.map((val, id) => {
                        //let name = val.data.name;
                        return (
                            <ListItem key={id} bottomDivider>
                                <ListItem.Content style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <ListItem.Title style={{ marginBottom: 5 }}> {val.data.name}</ListItem.Title>
                                        <Text style={{ marginBottom: 5 }} >Blood Group : {val.data.bloodType}</Text>
                                        <Text>E-mail :{val.data.email} </Text>
                                        <Text style={{ marginTop: 5 }}>Details :{val.data.details} </Text>
                                        </View>
                                        <View>
                                            <View style={{ flex: 1 }}>
                                                <Text >Ph.no : {val.data.number}</Text>
                                            </View>
                                    </View>
                                </ListItem.Content>
                            </ListItem>
                        )
                    })
                }

            </ScrollView>





            <View style={styles.btnView}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Button onPress={() => navigation.navigate("Donor")} containerStyle={styles.donor} title="Be a Donor" type="solid" />
                    <Button title="Recipient Blood Group " type="solid" onPress={() => setmodal(true)} />
                    <Modal visible={modal} animationType="slide">
                        {blood.map((val, id) => {
                            return (
                                <Button containerStyle={styles.btn} key={id} containerStyle={{ marginBottom: 20 }} title={val} type="solid" onPress={() => {
                                    // setq(val)
                                    setmodal(false)
                                    sort(val)
                                }} />

                            )
                        })
                        }
                    </Modal>
                </View>

            </View>

        </>
    )
}

export default Home

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        maxHeight: "7.5%",
        borderBottomColor:"red",
        borderBottomWidth:1

    },
    donor: {
        width: 115,
        borderRadius: 50
    },
    btnView: {
        marginBottom: 0,
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems: "center",
        maxHeight: "7.5%",

    }
})
