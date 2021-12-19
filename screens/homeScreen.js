import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, SafeAreaView,Alert } from 'react-native'
import axios from "axios"
import { ListItem } from 'react-native-elements'

export default class HomeScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            listData:[],
            url:"http://7e23-2402-3a80-19aa-426a-f0b2-1bec-52ad-770a.ngrok.io"
        }
    }

    componentDidMount(){
        this.getPlanets()
    }
    getPlanets=()=>{
        const {url}=this.state
        axios.get(url)
        .then(response=>{
            return this.setState({listData:response.data.data})
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    renderItem=({item,index})=>(
        <ListItem key={index} bottomDivider
        onPress={()=>this.props.navigation.navigate("Details",{planet_name:item.name})}>
            <ListItem.Content>
                <ListItem.Title>
                    {item.name}
                </ListItem.Title>
                <ListItem.Subtitle>
                    {item.distance_from_earth}
                </ListItem.Subtitle>
            </ListItem.Content>
            
        </ListItem>   
    )

    keyExtractor=(item,index)=>index.toString()

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView/>
                <View styl={styles.upperContainer}>
                    <Text>Planets World</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        data={this.state.listData}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edc988"
    },
    upperContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#132743"
    },
    lowerContainer: {
      flex: 0.9
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyContainerText: {
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#d7385e"
    },
    listContainer: {
      backgroundColor: "#eeecda"
    }
  });