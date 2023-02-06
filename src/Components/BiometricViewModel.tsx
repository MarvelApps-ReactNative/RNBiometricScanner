/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import BiometricAuthenticator from '../common/index';


const Biometric = () => {




  // function to check if biometric is supported or not

  const checkBiometricSupported = async () => {





    let value = await BiometricAuthenticator.isSupported()
      .then(async (biometryType: any) => {
        if (biometryType === 'FaceID' || biometryType === 'TouchID') {


          let value = await getUserAuthentication()
          return value


        }
      })
      .catch(e => {


        if (JSON.stringify(e.name).includes('LAErrorTouchIDNotAvailable')) {
          biometricnotavailable()
        }
        if (JSON.stringify(e.name).includes('LAErrorTouchIDNotEnrolled')) {
          NavigateToSettingAlert()
        }
      });


    return value

  };


  // function to authenticate user 

  const getUserAuthentication = async () => {
    const optionalConfigObject = {
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false),
      passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    BiometricAuthenticator.authenticate(
      'Please enter passcode',
      optionalConfigObject,
    )
      .then(() => {
        return true
        // BiometricHandledLogin();
      })
      .catch((error: any) => {
        const cancelError = error?.details;
        const errorMessage =
          'Authentication was canceled by the user—for example, the user tapped Cancel in the dialog.';
        const errorName = 'LAErrorUserCancel';
        const errorMessage2 =
          'LAErrorSystemCancel: Authentication was canceled by system—for example, if another application came to foreground while the authentication dialog was up.';
        if (
          (cancelError.message === errorMessage &&
            cancelError.name === errorName) ||
          error === errorMessage2
        ) {
          // logout();
        }
      });
  };

  // function to alert when device is not support any type of biometric

  const biometricnotavailable = async () => {
    Alert.alert(

      'This Device does not support any type of biometric!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log("cancel"),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log("ok") },
      ],
      {
        cancelable: false,
      },
    );
  }

  // function that navigate to setting for enable biometric


  const NavigateToSettingAlert = () => {
    Alert.alert(
      'Setting!',
      'Please allow permission for Face ID or passcode from the setting!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log("cancel"),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => Linking.openURL('app-settings:') },
      ],
      {
        cancelable: false,
      },
    );
  };


  useEffect(() => {

    async function useFetchData() {
      let BiometricSupport = await checkBiometricSupported();
    }
    useFetchData()

  }, [checkBiometricSupported]);




  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
      }}>
      <Text>Biometric screen</Text>

    </View>
  );
};

export default Biometric;
