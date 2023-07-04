import { Box, Center, HStack, Heading, ScrollView, Text } from "native-base";
import { Header } from "../components/Header";
import { CardPlan } from "../components/CardPlan";
import { useNavigation } from "@react-navigation/native";


export function Plans() {
    const { navigate } = useNavigation();
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header title="Planos" _showBack/>
                <Heading textAlign="center">Descubra mais planos,{'\n'}Vá mais longe</Heading>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Center flex={1}>
                        <HStack space={3} mx={4}>
                            <CardPlan 
                                title="Plano Mensal"
                                price={37.96}
                                desc="Tenha acesso total ao site o mês todo"
                            />
                            <CardPlan 
                                title="Plano anual"
                                price={347.96}
                                desc={`Tenha acesso total ao site o ano todo.\n*Economia.`}
                            />
                        </HStack>
                    </Center>
                </ScrollView>
        </Box>
    )
}