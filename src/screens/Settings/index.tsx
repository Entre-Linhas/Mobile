import { Box, ScrollView, VStack, Text, useColorMode, HStack, Button } from "native-base";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Nav";
import { CaretRight, CheckCircle, UserCircle } from "phosphor-react-native";
import { Line } from "../../components/Line";
import { useNavigation } from "@react-navigation/native"
import { Pressable } from "react-native";

export function Settings() {
    const { navigate } = useNavigation();
    const { colorMode, setColorMode } = useColorMode();
    
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header title="Configurações" _showBack/>
            <ScrollView px={2} py={3}>
                <VStack space={4}>
                    <Nav _leftIcon={UserCircle} _rightIcon={CaretRight} title={"Perfil"} onPress={() => navigate("profileSettings")}/>
                    <Line />
                    <Box>
                        <Text fontSize={22}>Tema:</Text>
                        <VStack space={2} mt={2}>
                            <Pressable onPress={() => setColorMode("light")}>
                                <HStack justifyContent="space-between">
                                    <Text fontSize={16}>Claro</Text>
                                    {colorMode == "light" && <CheckCircle color={"black"}/>}
                                </HStack>
                            </Pressable>
                            <Pressable onPress={() => setColorMode("dark")}>
                                <HStack justifyContent="space-between">
                                    <Text fontSize={16}>Escuro</Text>
                                    {colorMode == "dark" && <CheckCircle color={"white"}/>}
                                </HStack>
                            </Pressable>
                        </VStack>
                    </Box>
                </VStack>
            </ScrollView>
        </Box>
    )
}