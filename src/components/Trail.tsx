import { Box, Button, HStack, Heading, Progress, VStack, useColorMode, Text, Pressable, IPressableProps } from "native-base";
import { useNavigation, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { Check } from "phosphor-react-native";
import { ActivityProps } from "../screens/Activy";



interface TrailProps extends IPressableProps {
    title: string;
    _completedActivites: number;
    _startDate?: "Comece está atividade" | string;
    _completedOn?: string; 
    conteudos: ActivityProps[];
}

export function Trail({ title, _completedActivites, _startDate, _completedOn = "EM PROGRESSO", conteudos, ...rest }: TrailProps) {
    const { toggleColorMode, colorMode } = useColorMode();

    const { navigate } = useNavigation();
    return (
        <Pressable flex={1} m={0} bg="transparent" _pressed={{background: "transparent"}} onPress={() => navigate("activity", {title, conteudos})} {...rest}>
            <Box flex={1} py={2}>
                <VStack px={2} p={4} rounded={8} _light={{
                    bg: "white",
                    borderColor: "coolGray.200",
                }}
                _dark={{
                    bg: "gray.800",
                    borderColor: "gray.700",
                    borderWidth: 2
                }}
                borderWidth={1}
                borderStyle="solid"
                >
                    <HStack alignItems="center" space={4}>
                        <Heading>{title}</Heading>
                        {_completedActivites == 4 && <Box bg="green.200" rounded="full" p={"1.5px"}><Check size={14} /></Box>}
                    </HStack>
                    <HStack space={2} alignItems="center">
                        <Text>{((_completedActivites / 4) * 100).toFixed(0)}%</Text>
                        <Box bg="coolGray.100" rounded="full" h={2} flex={1}>
                            <Progress  value={(_completedActivites / 4) * 100} _filledTrack={{bg: "blue.300"}}/>
                        </Box>
                        <Text>{_completedActivites}/4</Text>
                    </HStack>                        
                </VStack>
            </Box>
        </Pressable>
    )
}