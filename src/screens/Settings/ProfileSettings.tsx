import { useState, useEffect } from "react";
import { Box, FormControl, Heading, Image, Modal, ScrollView,  VStack, Wrap, Pressable, Avatar, useColorMode, useToast } from "native-base";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Line } from "../../components/Line";
import { useAuth } from "../../hooks/useAuth";
import { LockSimple } from "phosphor-react-native";
import { api } from "../../services/api";
import { Button } from "../../components/Button";


export const avatars = [
    {
        src: require("../../assets/avatar/16.png"),
        value: "/16.png"
    },
    {
        src: require("../../assets/avatar/17.png"),
        value: "/17.png"
    },
    {
        src: require("../../assets/avatar/18.png"),
        value: "/18.png"
    },
    {
        src: require("../../assets/avatar/19.png"),
        value: "/19.png"
    },
    {
        src: require("../../assets/avatar/20.png"),
        value: "20.png"
    },
    {
        src: require("../../assets/avatar/21.png"),
        value: "/21.png"
    },
    {
        src: require("../../assets/avatar/22.png"),
        value: "/22.png"
    },
    {
        src: require("../../assets/avatar/23.png"),
        value: "/23.png"
    },
    {
        src: require("../../assets/avatar/24.png"),
        value: "/24.png"
    },
    {
        src: require("../../assets/avatar/25.png"),
        value: "/25.png"
    },
    {
        src: require("../../assets/avatar/26.png"),
        value: "/26.png"
    },
    {
        src: require("../../assets/avatar/27.png"),
        value: "/27.png"
    },
    {
        src: require("../../assets/avatar/28.png"),
        value: "/28.png"
    },
    {
        src: require("../../assets/avatar/29.png"),
        value: "/29.png"
    },
    {
        src: require("../../assets/avatar/30.png"),
        value: "/30.png"
    },
];

export function ProfileSettings() {
    const { perfil, setNewPerfil } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [servico, setServico] = useState(false);
    const [redes, setRedes] = useState<string[]>([]);
    const { colorMode } = useColorMode();
    const toast = useToast();
    useEffect(() => {
        api.get("/redesocial/" + perfil.idPerfil)
            .then((res) => {
                if(res.data) {
                    setRedes(res.data.link)
                }
            })
                .catch(err => {
                    console.log(err);
                })
    }, []);


    function handleSaving() {
        try {
            setNewPerfil("servico", servico);
            toast.show({
                title: "Sobre mim alterado!",
                placement: "bottom",
                bgColor: "jade.500"
            })
        } catch (err) {
            console.log(err)
            toast.show({
                title: "Ocorreu um erro ao salvar o Sobre mim",
                placement: "bottom",
                bgColor: "bittersweet.700"
            })
        }


    } 
    

    // useEffect(() => {
    //     for(var i = 16; i <= 30; i++) {
    //         avatars.push(`../../assets/avatar/${i}.png`);
    //     }
    // })


    const cpfFormartRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header title="Configurações de Perfil" _showBack/>
            <ScrollView  showsVerticalScrollIndicator={false} pt={2} pb={4} mx={2}>
                <VStack space={2}>
                    <Heading>Perfil público</Heading>
                    <Line />
                    <Pressable onPress={() => setShowModal(true)}>
                        <Avatar
                            source={avatars.filter(k => k.value == perfil.foto)[0].src}
                            size={24}
                        />
                    </Pressable>
                    <Box>
                        <FormControl.Label>Nome</FormControl.Label>
                        <Input isDisabled value={perfil.usuario.nome} rightElement={<LockSimple color={colorMode == "dark" ? "white" : "black"} style={{marginHorizontal: 6}} />}/>
                    </Box>
                    <Box>
                        <FormControl.Label>Sobrenome</FormControl.Label>
                        <Input isDisabled value={perfil.usuario.sobrenome} rightElement={<LockSimple color={colorMode == "dark" ? "white" : "black"} style={{marginHorizontal: 6}} />}/>
                    </Box>
                    <Box>
                        <FormControl.Label>Sua descrição</FormControl.Label>
                        <TextArea />
                    </Box>

                    {redes && (
                        <Box>
                            <FormControl.Label>Rede sociais</FormControl.Label>
                            {redes.map((rede) => {
                                <Input value={rede} isDisabled rightElement={<LockSimple color={colorMode == "dark" ? "white" : "black"} style={{marginHorizontal: 6}} />}/>
                            })}
                        </Box>
                    )}
                </VStack>
                <VStack space={2}>
                    <Heading>Configuração da conta</Heading>
                    <Line />
                    <Box>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Input isDisabled value={perfil.usuario.email} rightElement={<LockSimple color={colorMode == "dark" ? "white" : "black"} style={{marginHorizontal: 6}} />}/>
                    </Box>
                    <Box>
                        <FormControl.Label>CPF/CPNJ</FormControl.Label>
                        <Input isDisabled value={perfil.usuario.cpf.replace(cpfFormartRegex, '$1.$2.$3-$4')} rightElement={<LockSimple color={colorMode == "dark" ? "white" : "black"} style={{marginHorizontal: 6}} />}/>
                    </Box>
                    <Box>
                        <FormControl.Label>Endereço</FormControl.Label>
                        <Input isDisabled value={perfil.usuario.endereco} rightElement={<LockSimple color={colorMode == "dark" ? "white" : "black"} style={{marginHorizontal: 6}} />}/>
                    </Box>
                </VStack>

                <Button title="Salvar" onPress={handleSaving} bg="turquoise.400" _pressed={{bg: "turquoise.300"}} />
            </ScrollView>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} safeArea>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Fotos</Modal.Header>
                    <Modal.Body>
                        <Wrap flexDir="row" space={4} justifyContent="center">
                            {avatars.map((avatar, i) => ( 
                                <Pressable key={i} onPress={() => {
                                    setNewPerfil("foto", avatar.value);
                                    setShowModal(false);
                                }}>
                                    <Image source={avatar.src} alt="img16" size={20} />
                                </Pressable>
                            ))}
                        </Wrap>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}