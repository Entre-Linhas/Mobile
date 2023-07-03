import { Box, HStack, Image, ScrollView, Text, VStack, View, IBoxProps, Button, IButtonProps } from "native-base";
import { Book, CaretRight, Check, CheckCircle } from "phosphor-react-native";


export interface CardProps extends IButtonProps {
    _title: string;
    _desc: string;
    _completed?: boolean; 
    _thumb?: string;
    _createdAt?: string;
}

export function Card({ _title, _completed, _thumb, _createdAt, _desc, ...rest }: CardProps) {
    return (
        <>
            <Button rounded={8} bg="transparent" p={0} m={0} _pressed={{bg:"transparent"}} _light={{
                bg: "white",
                borderColor: "coolGray.200",
                borderStyle: "solid",
                borderWidth: "1",
                shadow: "1"
            }}  {...rest}>
                <Box flexDir="row" alignItems="center" px={2} p={4} position="relative">
                    <Image 
                        source={require("../../assets/book.jpg")}
                        style={{resizeMode: "stretch"}}
                        alt={`Imagem da atividade ${_title}`}  width={"12"} height={"16"}
                    />
                    <VStack h="full" w="full" ml={4}>
                        <View flexDir="row" alignItems="center">
                            <Text mr={2}>{_title}</Text>
                            {_completed && (
                                <Box alignItems="center" bg={"green.300"} rounded="full" p={"1.5px"}>
                                    <Check color={"white"} size={10} weight="bold"/>
                                </Box>
                            )}
                        </View>
                        <Text color="zinc.400" w="2/3" numberOfLines={1} ellipsizeMode="tail" >{_desc}</Text>
                    </VStack>

                    <CaretRight style={{marginLeft: "auto"}} />
                </Box>
            </Button>
        </>
    )
}