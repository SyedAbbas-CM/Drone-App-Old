import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableHighlight } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { WP } from '@/Theme/Responsive';

const DigitalSignature = (props) =>  {
    const signatureRef = useRef('sign')
    const saveSign =() => {
        signatureRef.current.saveImage();
    }

    const resetSign = ()=> {
        signatureRef.current.resetImage();
    }

    const _onSaveEvent = (result)=> {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        let value = `file://${result.pathName}`
        props.onPressSave()
        props.signatureSaved(value)
        console.log(result);
    }
    const _onDragEvent = () =>{
         // This callback will be called when the user enters signature
        console.log("dragged");
    }

        return (
            <View>
                <Text style={{marginTop: WP('4'), alignSelf: 'center', fontSize: WP('5')}}>Signature Capture</Text>
                <SignatureCapture
                    style={styles.signature}
                    ref={signatureRef}
                    onSaveEvent={_onSaveEvent}
                    onDragEvent={_onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    backgroundColor="#eeeeee"
                    strokeColor="#000000"
                    minStrokeWidth={5}
                    maxStrokeWidth={8}
                    viewMode={"portrait"}/>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                        onPress={saveSign} >
                        <Text>Save</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                        onPress={resetSign} >
                        <Text>Reset</Text>
                    </TouchableHighlight>

                </View>

            </View>
        );
    }

const styles = StyleSheet.create({
    signature: {
        marginTop: WP('3'),
        flex: 1,
        width: WP('85'),
        padding: WP('22'),
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50 ,
        fontSize: WP('4'),
        backgroundColor: "#eeeeee",
        margin: 3
    }
});

export default DigitalSignature