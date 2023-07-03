import { useState, useEffect } from "react";
import { Box, HStack, Pressable, ScrollView, VStack, useColorMode } from "native-base";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";


export interface ActivityProps {
    title: string;
    describe: string;
    _completed?: boolean;
    path?: String;
    irConteudo?: () => void;
}

export function Activity() {
    const { colorMode } = useColorMode();
    const [conteudos, setConteudos] = useState<ActivityProps[]>([]);
    const [title, setTitle] = useState("");
    const route = useRoute().params as any as {title: string, conteudos: ActivityProps[]}
    const { navigate } = useNavigation();
    useEffect(() => {
        if(route) {
            setTitle(route.title);
            setConteudos(route.conteudos);
        }
    }, [route])

    if (!route) { 
        return null
    }

    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header 
                title={title}
                _showBack
            />
            <ScrollView>
                <VStack flex={1} px={2} py={4} space={2}>
                    {conteudos.map((conteudo, i) => (
                        <Card 
                            key={i}
                            _title={conteudo.title}
                            _desc={conteudo.describe}
                            _createdAt="2023"
                            _completed={conteudo._completed}
                            onPress={conteudo.irConteudo}                            
                        />
                    ))}
                </VStack>
            </ScrollView>
        </Box>
    )
}