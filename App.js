import  React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './screens/homeScreen';
import DetailsScreen from './screens/detailsScreen';
export default function App(){
  return(
    <AppContainer/>
  )
}

const appStackNavigator= createStackNavigator({
  Home:{
    screen:HomeScreen,
    navigationOptions:{
      headershown:false
    }
  },
  Details:{
    screen:DetailsScreen,
    
  }
},
{
  initialRouteName:"Home"
}
)

const AppContainer=createAppContainer(appStackNavigator)
