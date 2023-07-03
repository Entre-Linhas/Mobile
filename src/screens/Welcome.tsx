import { Box, Heading, Pressable, StatusBar, Text, VStack, useColorMode, useTheme } from "native-base";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { Button } from "../components/Button";
import BackgroundImage from "../assets/bg.png"
import { ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";


export function Welcome() {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    // useEffect(() => {
    //     NavigationBar.setBackgroundColorAsync("#f4f4f5");
    // }, []) 

    const { navigate } = useNavigation();
    

    return (
        <ImageBackground source={BackgroundImage} style={{flex: 1, backgroundColor: "linear-gradient(0deg, rgba(243,244,246,1) 0%, rgba(255,255,255,0) 100%)"}}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
            <Heading mt="auto" mb={7} textAlign='center' >Olá, seja bem-vindo(a) =)</Heading>
            <VStack mt="auto" mx={4} space={2} mb={16}>
                <Button w="full" onPress={() => navigate("signin")} color="white" title="Entrar" p={2} rounded={8} fontSize={18} bg="bittersweet.400"
                    _pressed={{
                        bg: "red.500"
                    }}
                />
                <Button w="full" onPress={() => navigate("signup")} p={2} color="gray.500" fontWeight="normal" title="Cadastrar" rounded={8} _pressed={{
                    bg: "gray.200",

                }}/>
            </VStack>
        </ImageBackground>
        
    )
}


/* // <Box flex={1} justifyContent='center' px={2} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
        <ImageBackground source={BackgroundImage} style={{flex: 1}}>
            <Heading mt="auto" mb={7} textAlign='center' >Olá, seja bem-vindo(a) =)</Heading>
            <VStack mt="auto" space={4} mb={16}>

                <Button w="full" title="Entrar" p={2} rounded={8}
                    _light={{
                        bg: "bittersweet.400"
                    }}
                    _dark={{
                        bg: "bittersweet.400"
                    }}
                    _pressed={{
                        bg: "bittersweet.500"
                    }}
                />
                <Button w="full" p={2} title="Cadastrar" rounded={8} _pressed={{
                    bg: "gray.800",
                    opacity: .7
                }}/>
            </VStack>
        </ImageBackground>
        // </Box> */