import { Box, HStack, ScrollView, Text, VStack, useColorMode } from "native-base";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { BellSimple } from "phosphor-react-native";



/* {'\u2014'} */

export function Notification() {
    const { colorMode } = useColorMode();

    return (
        <VStack flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header
                title="Notificações"
                _showBack
            />

            
                <ScrollView >
                    <VStack mt={4} px={2} space={2}>
                        <HStack space={2} p={2} py={4} rounded="xl" _light={{
                            bg:"white",
                            borderColor: "coolGray.200",
                            borderWidth: 1
                        }}>
                            <Box p={2} maxH="2/3" rounded="full" _light={{bg:"cyan.200"}}>
                                <BellSimple color={colorMode == "dark" ? "white" : "black"}/>
                            </Box>
                            <Box flex={1}>
                                <HStack justifyContent="space-between">
                                    <Text fontWeight="bold" fontSize="lg">Evento Entre Linhas</Text>
                                    <Text color="coolGray.400" fontSize={'xs'}>06:00 a.m.</Text>
                                </HStack>
                                <Text>Dia 05/07/2023 teremos um evento na Faculdade da Faap, apresentando o Entre Linhas, saiba mais.</Text>
                            </Box>
                        </HStack>

                        <HStack space={2} p={2} py={4} rounded="xl" _light={{
                            bg:"white",
                            borderColor: "coolGray.200",
                            borderWidth: 1
                        }}>
                            <Box p={2} maxH="2/3" rounded="full" _light={{bg:"cyan.200"}}>
                                <BellSimple color={colorMode == "dark" ? "white" : "black"}/>
                            </Box>
                            <Box flex={1}>
                                <HStack justifyContent="space-between">
                                    <Text fontWeight="bold" fontSize="lg">Sentimos sua falta =(</Text>
                                    <Text color="coolGray.400" fontSize={'xs'}>Ontem às 06:00 p.m</Text>
                                </HStack>
                                <Text>Ultimamente notamos que você não tem feito a nossa trilha educacional, que tal praticar mais um pouco? =).</Text>
                            </Box>
                        </HStack>

                                            
                        <HStack justifyContent="center" alignItems="center" mt={4} space={2}>
                            <Box bg="coolGray.400" h={"0.5px"} pl={16}/>
                            <Text color="coolGray.400"> Ultimas notificação de 7 dias atrás.</Text> 
                            <Box bg="coolGray.400" h={"0.5px"} pr={16}/>
                        </HStack>
                    </VStack>
                </ScrollView>

        </VStack>
    )
}