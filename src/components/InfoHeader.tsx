import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { Avatar, Box, HStack, ScrollView, Text, VStack } from "native-base";
import { House } from "phosphor-react-native";
import { useAuth } from "../hooks/useAuth";
import { avatars } from "../screens/Settings/ProfileSettings";



export function InfoHeader() {
    const { perfil } = useAuth();
    const [greetings, setGreetings] = useState<string>("");
    const momentFormatHours = moment().format("HH:mm");
    
    
    useEffect(() => {
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
    return (
        <>
            <HStack space={2}>
                <Avatar 
                    source={avatars.filter(k => k.value == perfil.foto)[0].src}
                    size={12}
                />      
                <VStack>
                    <Text>{greetings}, {perfil.usuario.nome}</Text>
                    <Text color="coolGray.400">Nível {perfil.nivel}</Text>
                </VStack>
            </HStack> 
        </>
    )
}