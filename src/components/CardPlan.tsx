import { Box, Heading, Text } from "native-base";
import { Button } from "./Button";


export function CardPlan() {
    return (
        <Box p={3} borderWidth={1} rounded={6} maxW={"2xs"} _light={{
            bg: "white",
            borderColor: "gray.200",
            shadow: "2"
        }} _dark={{
            bg: "gray.700"
        }}>
            <Heading fontSize={26} textAlign="center">Plano Inicial</Heading>
            {/* <Line /> */}
            <Text textAlign="justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dicta aperiam asperiores, velit alias maxime aspernatur laborum deserunt, qui minima, quasi id ea consectetur esse.</Text>

            <Text fontSize="2xl" color="turquoise.600" fontFamily="Nunito.mono">R$39,90</Text>
            <Button bg="turquoise.400" _pressed={{bg: "turquoise.300"}} mt={5} p={2} title="Assinar agora" />
        </Box>
    )
}