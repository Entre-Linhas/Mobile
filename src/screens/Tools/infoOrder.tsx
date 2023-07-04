import { useEffect, useState } from "react";
import { Box, HStack, Heading, Pressable, Text, useColorMode, useSafeArea } from "native-base";
import { Header } from "../../components/Header";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Calendar, Clock, Pen } from "phosphor-react-native";
import { ManagementProps } from "./Management";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";



export function InfoOrder() {
    const { perfil } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [infoTitle, setInfoTitle] = useState<string>();
    const [client, setClient] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState<string>();
    const [status, setStatus] = useState<"text-yellow-500" | "text-red-500" | "text-green-500">("text-yellow-500");
    const { colorMode } = useColorMode();
    const { navigate } = useNavigation();

    const progressLegend = {
        "text-yellow-500": "Em progresso",
        "text-red-500": "Pendente",
        "text-green-500": "Entregue"
    }

    const route = useRoute().params as ManagementProps;
    useEffect(() => {
        setOrderId(route?.id);
        setInfoTitle(route?.title);
        setDate(route?.date);
        setDesc(route?.description);
        setStatus(route?.estado);
        setClient(route?.nome);
        setPrice(route?.price);
    }, [route]);

    async function changeStatus() {
        try {
            setIsLoading(true)
            await api.put(`/pedidos/${orderId}`, {
                usuario: perfil.usuario,
                date,
                title: infoTitle,
                description: desc,
                nome: client,
                price,
                estado: status !== "text-green-500" && "text-green-500"
            })
                .then(res => {
                    if(res.data) {
                        console.log("Registrado");
                    }
                })
        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}} >
            <Header title={infoTitle} _showBack />

            <Box px={2} mt={4} position="relative" flex={1} alignItems="center">
                {/* <Button  title="test" onPress={() => {console.log(route)}} /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={{width: "100%"}}>
                    <HStack justifyContent="space-between" mb={2}>
                        <HStack space={1} alignItems="center">
                            <Text fontSize={18}>Status: </Text>
                            <Text fontWeight="bold" fontSize={18}>{progressLegend[status]}</Text>
                        </HStack>
                        <HStack space={2} alignItems="center">
                            <Text>Entrega: {moment(date).format("DD [de] MMM, YYYY")}</Text>
                            <Calendar color={colorMode == "dark" ? "white" : "black"} />
                        </HStack>
                    </HStack>
                    <Text mt={4} fontSize={16}>{desc}</Text>
                </ScrollView>

                {status !== "text-green-500" && <Button onPress={changeStatus} title="Concluir" isLoading={isLoading} _loading={{_spinner: {bg: "turquiose.400"}}} position="absolute" bottom={4}  py={2} bg="turquoise.400" _pressed={{bg: "turquoise.500"}} w="full" mt="auto"/>}
            </Box>
        </Box>
    )
} 