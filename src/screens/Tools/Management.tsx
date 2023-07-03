import { useEffect, useState, useCallback } from "react";
import { THEME } from "../../styles/theme";
import { Box, FlatList, HStack, Heading, ScrollView, Text, VStack, useColorMode } from "native-base";
import { MagnifyingGlass, Plus } from "phosphor-react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Empty } from "../../components/Empty";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card } from "./components/Card";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";


export interface ManagementProps {
    id: number;
    title: string;
    description?: string;
    nome?: string;
    price: number;
    estado: "text-yellow-500" | "text-red-500" | "text-green-500";
    date: string;
}


export function Management() {
    const { perfil, setPedido, pedido } = useAuth();
    const [isOrderLoading, setIsOrderLoading] = useState(false);
    const [progress, setProgress] = useState<"text-yellow-500" | "text-red-500" | "text-green-500" | null>();
    const [fetchOrder, setFetchOrder] = useState<string>("");
    const [showAction, setShowAction] = useState<boolean>(false);
    // const [managementeList, setManagementeList] = useState<ManagementProps[]>([]);
    const [resultSearch, setResultSearch] = useState<ManagementProps[]>([])
    const { colorMode } = useColorMode();
    const { navigate } = useNavigation();
    const { colors } = THEME;

    const progressLegend = {
        "text-yellow-500": "Em progresso",
        "text-red-500": "Pendente",
        "text-green-500": "Entregue"
    }

    function handleSearch(item: string) {
        setFetchOrder(item);
    }

    useFocusEffect(
        useCallback(() => {
            async function listOrder() {
                try {
                    await api.get(`/pedidos/${perfil.usuario.idUsuario}`)
                        .then((res) => {
                            const { data } = res;
                            if(data) {
                                setPedido(data);
                            }
                        })
                } catch(err) {
                    console.log(err);
                } 
            }
    
            return () => listOrder();
        }, [])
    );

    useEffect(() => {
        if(fetchOrder) {
            setResultSearch(pedido.filter(order => order.title.toLocaleLowerCase().includes(fetchOrder.toLocaleLowerCase()) && order.title.toLocaleLowerCase().includes(fetchOrder.toLocaleLowerCase())))
        } else if(fetchOrder.length < 1) {
            setResultSearch([])
        }
    }, [fetchOrder])

    return (
        <>
            <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
                <ScrollView pt={4} px={2}>
                    <Heading textAlign="center">Gerenciamento de pedidos</Heading>

                    <Input 
                        placeholder="Buscar pedidos"
                        rightElement={<MagnifyingGlass color={colorMode == 'dark' ? "white" : "black"} style={{marginHorizontal: 8}}/>}
                        value={fetchOrder}
                        onChangeText={handleSearch}
                        my={4}
                    />
                    <VStack space={4}>
                        <FlatList
                            scrollEnabled={false}
                            data={!fetchOrder ? pedido : resultSearch} /* !fetchOrder ? managementeList : resultSearch */
                            renderItem={({item, index, separators}) => (
                                <Card title={item.title} price={item.price} description={item.description} date={item.date} estado={item.estado} id={item.id} />
                            )}
                            keyExtractor={item => String(item.id)}
                            ItemSeparatorComponent={() => <Box h={4} />}
                            ListEmptyComponent={() => <Empty />}
                            ListFooterComponent={() => <Box h={8} />}
                        />
                    </VStack>
                </ScrollView>

                <Button title={null} icon={Plus} onPress={() => navigate("formOrder")} position="absolute" bottom={4} right={4} p={4} bg="turquoise.400" _pressed={{bg:"turquoise.500"}} rounded="full"/>
            </Box>
        </>
    )
}