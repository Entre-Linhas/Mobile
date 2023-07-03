import { Box, Button, HStack, Heading, Image, ScrollView, Text, VStack, useColorMode, useTheme } from "native-base";
import { useState, useEffect } from "react";
import { RedeSocial } from "../components/RedeSocial";
import { useAuth } from "../hooks/useAuth";
import { avatars } from "./Settings/ProfileSettings";
import { api } from "../services/api";


export const niveis = [
    "1. Aprendiz",
    "2. Iniciante",
    "3. Aspirante",
    "4. Novato",
    "5. Amador",
    "6. Intermediário",
    "7. Competente",
    "8. Habilidoso",
    "9. Experiente",
    "10. Avançado",
    "11. Especialista",
    "12. Proficiente",
    "13. Mestre",
    "14. Expert",
    "15. Virtuoso",
    "16. Elite",
    "17. Notável",
    "18. Excelente",
    "19. Mestre Supremo",
    "20. Lendário",
    "21. Herói",
    "22. Invencível",
    "23. Destemido",
    "24. Soberano",
    "25. Magnífico",
    "26. Supremo",
    "27. Desafiante",
    "28. Sobrenatural",
    "29. Divino",
    "30. Imortal",
    "31. Supremacia",
    "32. Último Nível"
  ];

export function Profile() {
    const { perfil } = useAuth();
    const { sizes } = useTheme();
    const [redes, setRedes] = useState<string[]>([])
    const { toggleColorMode, colorMode } = useColorMode();

    useEffect(() => {
        api.get("/api/redesocial/" + perfil.idPerfil)
            .then((res) => {
                setRedes(res.data.link);
            })
    }, [])

    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}} >
            <HStack safeArea px={2} py={4} justifyContent='space-between' alignItems='center'
                _light={{
                    bgColor: "white",
                    borderBottomColor: "coolGray.200",
                    borderBottomWidth: 1
                }}
                _dark={{
                    bgColor:"gray.800",
                    borderBottomColor: "coolGray.700"
                }}
            >
                <Box w={6}/>
                <Heading>Perfil</Heading>
                <Box w={6} />
            </HStack>

            <ScrollView px={2} showsVerticalScrollIndicator={false}>
                <Box position="relative" mt={32} flex={1} alignItems="center"  minH={96} rounded={8} borderWidth={1}
                    _light={{
                        bgColor: "white",
                        borderColor: "coolGray.200"
                    }}
                    _dark={{
                        bgColor: "gray.800",
                        borderColor: "gray.700",
                        borderWidth: 2
                    }}
                >
                    <Image position="absolute" top="-66" source={avatars.filter(k => k.value == perfil.foto)[0].src} alt={`Avatar de ${perfil.usuario.nome}`} size={132} rounded="full" flex={1}/>
                    <Text mt={74} fontWeight="semibold" fontSize="2xl">{perfil.usuario.nome}</Text>
                    <Text>Membro</Text>
                    
                    <VStack w="full" px={4} pb={2} space={2}>
                        {perfil.servico && <Text textAlign="justify" mt={2}>{perfil.servico}</Text>}
                        {
                            redes && (
                                <HStack space={4} flexWrap="wrap" mt={2}>
                                    {redes.map((rede) => <RedeSocial title={rede}/>)}
                                </HStack>
                            )
                        }

                        <Box>
                            <Text fontFamily="Nunito.heading" fontSize="lg">Nível</Text>
                            <Text>{perfil.nivel}</Text>
                        </Box>
                        <Box>
                            <Text fontFamily="Nunito.heading" fontSize="lg">Membro desde</Text>
                            <Text>06/01/2023</Text>
                        </Box>
                        <Box>
                            <Text fontFamily="Nunito.heading" fontSize="lg">Melhor sequência</Text>
                            <Text>{perfil.combo} Dia(s)</Text>
                        </Box>
                    </VStack>
                </Box>
            </ScrollView>

            {/* <Button position="absolute" bottom={4} right={4} onPress={toggleColorMode}>
                <Text>Mudar</Text>
            </Button> */}
        </Box>
    )
}