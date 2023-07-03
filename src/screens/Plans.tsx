import { Box, Center, HStack, Heading, ScrollView, Text } from "native-base";
import { Header } from "../components/Header";
import { CardPlan } from "../components/CardPlan";


export function Plans() {
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header title="Planos" _showBack/>
                <Heading textAlign="center">Descubra mais planos,{'\n'}Vá mais longe</Heading>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Center flex={1}>
                        <HStack space={3} mx={4}>
                            <CardPlan />
                            <CardPlan />
                            <CardPlan />
                            <CardPlan />
                            <CardPlan />
                        </HStack>
                    </Center>
                </ScrollView>
        </Box>
    )
}