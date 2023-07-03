import { Box, HStack, Text, Pressable } from "native-base";
import { Clock } from "phosphor-react-native";
import { THEME } from "../../../styles/theme";
import { ManagementProps } from "../Management";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";


// interface CardProps extends ManagementProps {}

export function Card({ id, title, price, date, estado, description }: ManagementProps) {
    const { colors } = THEME;

    const progressLegend = {
        "text-yellow-500": "Em progresso",
        "text-red-500": "Pendente",
        "text-green-500": "Entregue"
    }

    const { navigate } = useNavigation();

    // navigate("/", {requestId: id})

    return (
        <Pressable onPress={() => navigate("infoOrder", {id, title, price, date, estado, description})}>
            {({ isPressed }) => {
                return (
                <Box w="full" px={4} py={3} rounded={8}
                    _light={{
                        bg: "white",
                        borderColor: colors.coolGray[200],
                        borderWidth: 1
                    }} 
                    _dark={{
                        bg: "gray.800",
                        borderWidth: 2,
                        borderColor: colors.gray[700],
                    }}
                    style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}
                >
                    <Text fontWeight="normal" fontSize="lg" _light={{
                        color: "coolGray.500"
                    }}>{title}</Text>
                    <Text fontWeight="bold" fontSize="lg"
                        _light={{
                            color: "jade.500"
                        }}
                        _dark={{
                            color: "jade.400"
                        }}
                    >{Number(price).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</Text>

                    
                    <HStack space={1} mt={2}>
                        <Clock color={estado == "text-yellow-500" ? colors.amber[400] : estado == "text-green-500" && "#00B37E" || colors.red[300] }/>
                        <Text color={estado == "text-yellow-500" ? "amber.400" : estado == "text-green-500" && "#00B37E" || "red.300" }>{progressLegend[estado]}</Text>
                        <Text ml="auto" _light={{color: "coolGray.400"}}>{moment(date).format("DD/MM/YYYY")}</Text>
                    </HStack>
                </Box>
                )
            }}
        </Pressable>
    )
}