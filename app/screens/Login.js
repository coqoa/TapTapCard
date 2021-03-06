import React, {useState, useRef} from "react";
import {ActivityIndicator,Platform} from "react-native";
import styled from "styled-components/native";
import {colors} from "../component/Color"
import { Audio } from 'expo-av';

import auth from '@react-native-firebase/auth';
// import AppleLogin from "../component/firebaseComponent/AppleLogin";
// import GoogleLogin from "../component/firebaseComponent/GoogleLogin";

import Greeting from "../component/lottieComponent/Greeting";
import Welcome from "../component/lottieComponent/Welcome";
import GreetingNavy from '../component/lottieComponent/GreetingNavy';


const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
     background-color: ${colors.bgColor};
`
const GreetingShell = styled.View`
    width: 100%;
    height: 25%;
`
const Contents = styled.View`
    flex: 1;
    width: 80%;
    top: 10px;
    border-radius: 15px;
`
const Nav = styled.View`
    flex-direction: row;
    justify-content: center;
    
`
const NavBtn = styled.TouchableOpacity`
    width: 40%;
    height: 40px;
    justify-content: center;
`
const NavBtnText = styled.Text`
    text-align: center;
    font-family: "SDChild";
    font-size: 25px;
`
const Main = styled.ScrollView`
    flex: 1;
    top: 0px;
`
const Empty = styled.View`
    width: 100%;
    padding: 0px;
    height: 30%;
`
const TextArea = styled.TextInput`
    width: 90%;
    height: 40px;
    margin: 10px 0px;
    padding: 0px 10px;
    border-radius: 15px;
    border: 2px solid lightgray;
    font-size: 23px;
    font-family: "SDChild";
`
const Btn = styled.TouchableOpacity`
    flex-direction: row;
    width: 70%;
    height: 45px;
    margin: 10px 0px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
`
const BtnText = styled.Text`
    color: white;
    font-size: 23px;
    font-family: "SDChild";
`
const ValidationShell = styled.View`
    width: 70%;
    height: 18px;
    align-items: center;
    justify-content: center;
`
const ValidationText = styled.Text`
    font-size: 18px;
    font-family: "SDChild";
`
// ------------------------------------------------------------------

const Login = () => {
    const PasswordInput = useRef()
    const [navCheck, setNavCheck] = useState("Login")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState("")

    //  ??????????????? ??? ???????????? next??? ????????? password??? ???????????? ??????
    const onSubmitEmail = () => {
        PasswordInput.current.focus();
    }

// ????????? ??????
    const loginEditing = async() => {
        playSound(require("../asset/audio/btnClickSound.mp3"))
        //ActivityIndicator???????????? ??????
        setLoading(true)
        // ?????????????????? ??????
        if(loading){
            return;
        }
        try{
            if(email !=="" && password !==""){
                // ???????????? ????????? ????????? ?????????
                await auth().signInWithEmailAndPassword(email, password)
            }else{
                // ???????????? ??????????????? ????????? ??????
                setLoading(false)
                setValidation('?????? ???????????????')
            }
        }catch(e){
            // ?????? ????????? ??????????????? ???????????? ??????
            setLoading(false)
            switch(e.code){
                case "auth/invalid-email" : {
                    return setValidation("???????????? ??????????????????")
                }
                case "auth/user-disabled" : {
                    return setValidation('user-disabled')
                }
                case "auth/user-not-found" : {
                    return setValidation('???????????? ?????? ????????? ?????????')
                }
                case "auth/wrong-password" : {
                    return setValidation('??????????????? ???????????? ????????????')
                }
                case "auth/operation-not-allowed" : {
                    return setValidation('auth/operation-not-allowed \n??????????????? ???????????????')
                }
            }
        }
    }

// ???????????? ??????
    const signupEditing = async() => {
        playSound(require("../asset/audio/btnClickSound.mp3"))
        setLoading(true)
        if(loading){
            return;
        }
        try{
            if(email !=="" && password !==""){
                await auth().createUserWithEmailAndPassword(email, password)
            }else{
                setLoading(false)
                setValidation('?????? ???????????????')
            }
        }catch(e){
            setLoading(false)
            switch(e.code){
                case "auth/email-already-in-use" : {
                    return setValidation('?????? ???????????? ??????????????????.')
                }
                case "auth/invalid-email" : {
                    return setValidation('???????????? ??????????????????')
                }
                case "auth/weak-password" : {
                    return setValidation('???????????? ?????? ?????????????????????.\n?????? ??????????????? ????????? ?????????.')
                }
                case "auth/operation-not-allowed" : {
                    return setValidation('operation-not-allowed \n??????????????? ??????????????? ')
                }
            }
            console.log("error1 = ", e.code)
        }
    }
//??????????????? ?????????????????? ?????? ??? ????????? ?????? ??????
    const btnAlloter = () => {
        if(navCheck == "Login"){
            return loginEditing
        }else{
            return signupEditing
        }
    }
// ??????????????? ?????? ??????
    function playSound(sound){
        Audio.Sound.createAsync( sound,{ shouldPlay: true }
        ).then((res)=>{
            res.sound.setOnPlaybackStatusUpdate((status)=>{
                if(!status.didJustFinish) return;
                res.sound.unloadAsync().catch(()=>{});
            });
        }).catch((e)=>{console.log(e)});
    }

    return(
    <Container>
        <GreetingShell style={{transform:[{scale:3}]}}>
            {/* ?????????/???????????? ?????? LottieAnimation */}
            {navCheck == "Login" ? (<Greeting />):(<GreetingNavy />)}
        </GreetingShell>
        <Contents>
            <Nav>
                <NavBtn onPress={() => {setNavCheck("Login"), setValidation(""), playSound(require("../asset/audio/btnClickSound2.mp3"))}}>
                    <NavBtnText style={{color : navCheck == "Login" ? "black" : "lightgray"}}>?????????</NavBtnText>
                </NavBtn>
                <NavBtn onPress={() => {setNavCheck("Signup"), setValidation(""), playSound(require("../asset/audio/btnClickSound2.mp3"))}} >
                    <NavBtnText  style={{color : navCheck == "Signup" ? "black" : "lightgray"}}>????????????</NavBtnText>
                </NavBtn>
            </Nav>

            <Main contentContainerStyle={{alignItems:"center"}}>
                <TextArea 
                    placeholder="?????????" 
                    value={email} 
                    returnKeyType="next"
                    keyboardType = "email-address" 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    onChangeText = {(text) => setEmail(text)} 
                    onSubmitEditing = {onSubmitEmail}
                />
    
                <TextArea 
                    ref={PasswordInput}
                    placeholder="????????????" 
                    value={password}  
                    returnKeyType="done"
                    secureTextEntry 
                    onChangeText = {(text) => setPassword(text)} 
                    onSubmitEditing = {btnAlloter()}
                />

                <ValidationShell>
                    <ValidationText style={{color:colors.DARKGRAY}}>{validation}</ValidationText>
                </ValidationShell>

                {navCheck=="Login" ? (
                // ????????? ?????? ??????
                <>
                    <Btn onPress = {loginEditing} style={{backgroundColor : navCheck == "Login" ? "#EC705E" : "lightgray"}}>
                        {loading ? <ActivityIndicator color="white"/> : <BtnText>?????????</BtnText>}
                    </Btn>
                    {/* <GoogleLogin />
                    {Platform.OS == "ios" && (
                        <AppleLogin />
                    )} */}
                </>
                ):(
                // ???????????? ?????? ??????
                <Btn onPress = {signupEditing} style={{backgroundColor : navCheck == "Signup" ? colors.NAVY : "lightgray"}}>
                    {loading ? <ActivityIndicator color="white"/> : <BtnText>????????????</BtnText>}
                </Btn>
                )}
            </Main>
        </Contents>

        {navCheck == "Signup" ? (
            <Empty style={{transform:[{scale:1}]}}>
                <Welcome />
            </Empty>
        ):(null)}
    </Container>
    )
}
export default Login;