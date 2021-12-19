import React, { Component } from 'react'
import { View, Text,StyleSheet,Alert } from 'react-native'
import {Card,Icon} from 'react-native-elements'
import axios from 'axios';


export default class DetailsScreen extends Component {
    
    constructor(props){
        super(props);
        this.state={
            details:{},
            imagePath:"",
            url:`http://7e23-2402-3a80-19aa-426a-f0b2-1bec-52ad-770a.ngrok.io/planet?name=${
                this.props.navigation.getParam("planet_name")
            }`
        }
    }

    componentDidMount(){
        this.getDetails()
    }
    getDetails=()=>{
        const {url}=this.state
        axios.get(url)
        .then(response=>{
            this.setDetails(response.data.data)
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    setDetails=(planetDetails)=>{
        const planetType=planetDetails.planet_type
        let imagePath=""
        switch (planetType){
            case "Gas Giant" :
                imagePath=require("../assets/planet_type/gas_giant.png")
                break
            
            case "Terrestrial" :
                imagePath=require("../assets/planet_type/terrestrial.png")
                break
            case "Super Earth" :
                imagePath=require("../assets/planet_type/super_earth.png")
                break
            case "Neptune Like" :
                imagePath=require("../assets/planet_type/neptune_like.png")
                break
            default:
                imagePath=require("../assets/planet_type/gas_giant.png")
        }
        this.setState({
            details:planetDetails,
            imagePath:imagePath
        })
    }

    render() {
        const { details, imagePath } = this.state;
        if (details.specifications) {
            return (
                <View style={styles.container}>
                    <Card>
                        <Card.Title>{details.name}</Card.Title>
                        <Card.Image source={imagePath}></Card.Image>
                        <View>
                            <Text
                                style={styles.cardItem}
                            >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                            <Text
                                style={styles.cardItem}
                            >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                            <Text
                                style={styles.cardItem}
                            >{`Gravity : ${details.gravity}`}</Text>
                            <Text
                                style={styles.cardItem}
                            >{`Orbital Period : ${details.orbital_period}`}</Text>
                            <Text
                                style={styles.cardItem}
                            >{`Orbital Speed : ${details.orbital_speed}`}</Text>
                            <Text
                                style={styles.cardItem}
                            >{`Planet Mass : ${details.planet_mass}`}</Text>
                            <Text
                                style={styles.cardItem}
                            >{`Planet Radius : ${details.planet_radius}`}</Text>
                            <Text
                                style={styles.cardItem}
                            >{`Planet Type : ${details.planet_type}`}</Text>
                        </View>
                        <View style={[styles.cardItem, { flexDirection: "column" }]}>
                            <Text>{details.specifications ? `Specifications : ` : ""}</Text>
                            {details.specifications.map((item, index) => (
                                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                                    {item}
                                </Text>
                            ))}
                        </View>
                    </Card>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardItem: {
        marginBottom: 10
    }
});