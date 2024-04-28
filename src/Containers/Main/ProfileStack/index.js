import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Settings from './Settings'
import Profile from './Profile'
import ProfileDetails from './ProfileDetails'
import RideHistory from './RideHistory'
import SwitchService from './SwitchService'
import MyVehicle from './MyVehicle'
import RideDetails from './RideDetails'
import EditProfile from './EditProfile'
import Earnings from './Earnings'
import Summary from './Summary'
import BankDetails from './BankDetails'
import EditBankDetails from './BankDetails/EditBankDetails'
import ChangePassword from './ChangePassword'
import TermsConditions from './TermsConditions'
import PrivacyPolicy from './PrivacyPolicy'
import About from './About'

const Stack = createStackNavigator()

// @refresh reset
const ProfileStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditBankDetails" component={EditBankDetails} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="Earnings" component={Earnings} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="RideHistory" component={RideHistory} />
      <Stack.Screen name="RideDetails" component={RideDetails} />
      <Stack.Screen name="MyVehicle" component={MyVehicle} />
      <Stack.Screen name="SwitchService" component={SwitchService} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="About" component={About} />


      




    </Stack.Navigator>
  )
}

export default ProfileStack
