import { useContext } from "react";
import { Box, HStack, Avatar, VStack, Text, Button, useColorMode, useTheme } from "native-base";
import { useEffect, useState } from "react";
import { BellSimple } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/pt-br";
import { InfoHeader } from "./InfoHeader";
import { AuthContext } from "../context/AuthProvider";

interface HeaderScreenProps {
    borderWidth?: string | number;
}


export function HeaderScreen({ borderWidth = 1}: HeaderScreenProps) {
    const { perfil } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const [greetings, setGreetings] = useState<string>("");
    const momentFormatHours = moment().format("HH:mm");
    
    
    useEffect(() => {
        // console.log("[USEEFFECT | HeaderScreen.tsx]", perfil)
        if(momentFormatHours < "12:00" ) {
            setGreetings("Bom dia");
        } else if (momentFormatHours >= "12:00" && momentFormatHours < "18:00") {
            setGreetings("Boa tarde");
        } else if(momentFormatHours >= "18:00" && momentFormatHours < "23:59") {
            setGreetings("Boa noite");
        } else {
            setGreetings("Bom dia");
        }
    }, []);

    const { navigate } = useNavigation();

    return (
        <Box safeArea _light={{
            bg:"white",
            borderBottomColor: "coolGray.200",
            borderBottomWidth: borderWidth
        }}
        _dark={{
            bg: "gray.800"
        }}
        >
            <HStack px={2} py={4} alignItems="center" justifyContent="space-between">
                <InfoHeader />

                <Button position="relative" bg="transparent" p={0} _pressed={{bg:"transparent"}} onPress={() => navigate("notification")}>
                    <BellSimple color={colorMode == "dark" ? colors.white : colors.gray[800]} />
                    <Box _light={{
                        bg: "white"
                    }}
                    _dark={{
                        bg: "gray.800"
                    }} position="absolute" px="0.5" rounded="full" right={0} top={-4}>
                        <Text fontSize="xs" fontWeight="bold">2</Text>
                    </Box>
                </Button>
            </HStack>
        </Box>
    )
}