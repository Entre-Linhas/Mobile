import { Box, Heading, Text } from "native-base";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/native";


interface PlanProps {
    title: string;
    price: number;
    desc: string;
}

export function CardPlan({ title, price, desc }: PlanProps) {
    const { navigate } = useNavigation();
    return (
        <Box p={3} borderWidth={1} rounded={6} maxW={"2xs"} _light={{
            bg: "white",
            borderColor: "gray.200",
            shadow: "2"
        }} _dark={{
            bg: "gray.700"
        }}>
            <Heading fontSize={26} textAlign="center">{title}</Heading>
            {/* <Line /> */}
            <Text textAlign="justify">{desc}</Text>

            <Text fontSize="2xl" color="turquoise.600" fontFamily="Nunito.mono" mt="auto">{price.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</Text>
            <Button bg="turquoise.400" _pressed={{bg: "turquoise.300"}} mt={5} p={2} title="Assinar agora" onPress={() => navigate("payment")}/>
        </Box>
    )
}