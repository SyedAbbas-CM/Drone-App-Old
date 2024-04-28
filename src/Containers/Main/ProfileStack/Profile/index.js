import React, { useState, useEffect } from 'react'
import { View, Text, Platform } from 'react-native'
import { VeroProfileHeader } from '@/Components'
import { navigate } from '@/Navigators/utils'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import ProfileLineItem from './Components/ProfileLineItem'
import { getCameraPicture } from '@/Services/Helpers'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Config } from '@/Config'
import { APIRequest } from '../../../../Services/ApiRequest'

const Profile = () => {
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  console.log('User', user)
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const { Layout, Gutters } = useTheme()
  const [pickedImage, setPickedImage] = useState()
  let imageUpload

  useEffect(() => {
    const {
      first_name,
      last_name,
      mobile_number,
      avatar,
      email,
      street_address,
    } = user
    setFirstName(first_name),
      setLastName(last_name),
      setMobileNumber(mobile_number),
      setEmail(email),
      setAddress(street_address)
  }, [])

  const uploadSelfie = () => {
    getCameraPicture(
      image => {
        image?.map(pickedImage => {
          setPickedImage(pickedImage)
        })
        uploadPicture()
      },
      error => {
        console.log('Camera error', error)
      },
    )
  }

  //   const sendFilesToServer =()=> {
  //     let formData = new FormData();
  //     const keys = Object.keys(this.files);
  //     if (!keys || !keys.length) {
  //       return this.driverDetailes.docs;
  //     }
  //     for (const key of keys) {
  //       let file: File = this.files[key];
  //       formData.append(key, file, file.name);
  //     }
  //     try {
  //       const res = await this.authService.uploadFiles(formData, this.firstFormGroup.value.mobile_number);
  //       if (res && res.meta && res.meta.status === 200) {
  //         const kys = Object.keys(res.data.data);
  //         for (const ky of kys) {
  //           this.driverDetailes.docs[ky] = res.data.data[ky];
  //         }
  //         return this.driverDetailes.docs;
  //       }
  //       return this.driverDetailes.docs;
  //     }
  //     catch (ex: any) {
  //       this.toastr.error(ex.error.meta.message, 'Error');
  //       return this.driverDetailes.docs;
  //     }
  //   }
  //   const uploadFiles = (body, id) => {
  //     let headers = new HttpHeaders()
  //     headers.append('Content-Type', 'multipart/form-data');
  //     return this.http.post(`files/${id}/temp-files`, body, { headers }).toPromise();
  // }

  // const uploadPicture = async ()=> {
  // var photo = {
  //   name: imageUpload.fileName,
  //   type: imageUpload.type,
  //   uri: imageUpload.uri.replace('file://', ''),
  //   };
  //   console.log("Image upload", photo)
  // //   //use formdata
  //   var formData = new FormData();
  // //   //append created photo{} to formdata
  //   formData.append('key', photo, photo.name);
  // //   //use axios to POST
  //   await axios({
  //       method: 'POST',
  //       url: Config.API_URL + 'files/'+ user._id +'/temp-files',
  //       data: formData,
  //       config: {
  //         headers: {
  //           Authorization: token,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     })
  //       .then(function (response) { console.log("Image axios Reponse",response)})
  //       .catch(function (error) { console.log("Image axios Error",error.response)
  //   });
  // }

  const uploadPicture = () => {
    console.log('====================================')
    console.log('Picked Imagee', pickedImage)
    console.log('====================================')
    // setLoading(true)
    new APIRequest.Builder()
      .post()
      .reqURL(`files/${user._id}/temp-files`)
      .params('image_type', 'purchase')
      .params('api_key', user.api_key)
      .params('image', pickedImage)
      // .addFile(
      //   'purchase',
      //   pickedImage.uri,
      //   pickedImage.type,
      //   pickedImage.fileName,
      // )
      .response(response => {
        console.log('Response ', response)
        // setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        // setLoading(false)
      })
      .build()
      .doRequest()
  }

  return (
    <View style={Layout.fill}>
      <VeroProfileHeader
        name={`${firstName} ${lastName}`}
        totalTrips={'5432'}
        years={'1.23'}
        picture={pickedImage}
        onPressCamera={uploadSelfie}
        onEditPress={() => navigate('EditProfile')}
      />
      <Text style={Layout.helpText2}>{t('info').toUpperCase()}</Text>
      <ProfileLineItem icon="phone-portrait-outline" text={mobileNumber} />
      <ProfileLineItem icon="ios-mail-sharp" text={email} />
      {/* <ProfileLineItem icon="language-outline" text={'English & Spanish'}/> */}
      <ProfileLineItem icon="home-sharp" text={address} />
    </View>
  )
}

export default Profile
