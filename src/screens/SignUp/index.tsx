import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import * as SecureStore from 'expo-secure-store'
import { Box, Checkbox, FormControl, Text, VStack, useToast } from "native-base";
import Swiper from 'react-native-swiper';
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

import { AuthContext } from "../../context/AuthProvider";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container } from "./components/Container";
import { THEME } from "../../styles/theme";
import { api } from "../../services/api";


export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = (password: string) => password.length >= 8 || password.length <= 30;

export function SignUp() {
    const { signUp, setUser, setSigned } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState("");
    const [terms, setTerms] = useState(false);
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [totalStep, setTotalStep] = useState(0);
    const toast = useToast();
    const { colors } = THEME;
    const swiperRef = useRef<Swiper | null>(null);

    useEffect(() => {
        if(swiperRef.current) {
            setTotalStep(swiperRef.current.state.total);
        }
    }, [])

    function handleNextStep() {
        setIsLoading(true)
        if (swiperRef.current) {
            swiperRef.current.scrollBy(1);
            setStep((prevStep) => prevStep + 1);
        }
        setIsLoading(false);
    }

    function handlePreviousStep() {
        if(swiperRef.current) {
            swiperRef.current.scrollBy(-1);
            setStep((prevStep) => prevStep - 1);
        }
    }

    const { navigate, goBack } = useNavigation();

    async function handleSubmit() {
        if(!nome || !sobrenome || !endereco) {
            return toast.show({
                title: "Preencha todos os campos.",
                placement: "bottom",
                bgColor: "bittersweet.700"
            });
        }

        try {
            setIsLoading(true);
            await api.post("/usuarios/cadastro", {email, senha, nome, sobrenome, endereco, cpf, terms})
                .then(async (res) => {
                    const { data } = res;
                    if(res.data) {
                        await SecureStore.setItemAsync("Authuser", JSON.stringify({email: data.email, senha: data.senha, idUsuario: data.idUsuario}));
                        setUser(res.data);
                        signUp(res.data.idUsuario);
                    }
                })
        } catch(err) {
            console.log("!")
            console.log(err);
            toast.show({
                title: "Ocorreu um erro ao cadastrar, tente novamente",
                placement: "bottom",
                bgColor: "bittersweet.700"
            })
        } finally{
            setIsLoading(false);
        }
    }

    const isFormValid = useMemo(() => {
        return isValidEmail(email) && isValidPassword(senha) && senha === confirmSenha;
    }, [email, senha, confirmSenha])

    return (
        <Box flex={1} px={2} py={4} _dark={{bg: "gray.900"}} _light={{bgColor: "coolGray.100"}}>
            <Swiper
                ref={swiperRef}
                loop={false}
                showsPagination={false}
                scrollEnabled={false}
            >
                <Container 
                    step={{current: step, total: totalStep}}
                    _prevStep={step > 0 ? handlePreviousStep : () => goBack()}
                    _nextButton={
                        <Button 
                            title="Continuar" 
                            mt={2} 
                            color="red.400" 
                            isDisabled={!terms || !isFormValid} 
                            onPress={handleNextStep} 
                            py={2} 
                            _dark={{_pressed:{bg: "gray.800"}}} 
                            _light={{_pressed:{bg: "gray.200"}}}
                        />
                    }
                >
                    <VStack>
                        <Box>
                            <FormControl.Label isRequired>E-mail</FormControl.Label>
                            <Input placeholder="joedohn@email.com" returnKeyType="next"  value={email} onChangeText={(e) => setEmail(e)} />
                        </Box>
                    
                        <Box>
                            <FormControl.Label isRequired>Senha</FormControl.Label>
                            <Input type="password" maxLength={30} returnKeyType="next" placeholder="Senha" value={senha} onChangeText={setSenha} />
                        </Box>
                    
                        <Box>
                            <FormControl.Label isRequired>Confirmar senha</FormControl.Label>
                            <Input type="password" maxLength={30} returnKeyType="next" placeholder="Confirmar senha" value={confirmSenha} onChangeText={(e) => setConfirmSenha(e)}/>
                        </Box>
                    
                        <Box>
                            <Checkbox mt={2} ml={2} borderColor="gray.300" _checked={{bg: "bittersweet.400", borderWidth: 1, borderColor:"gray.300"}} _dark={{_checked:{borderColor: "gray.700"}}} isChecked={terms} alignItems="center" borderWidth={1} onChange={(e) => setTerms(e)} value="concordo">Concordo com os<Text color="bittersweet.400" onPress={() => WebBrowser.openBrowserAsync("https://entre-linhas.debugon.xyz/terms")}>Termos</Text></Checkbox>
                        </Box>
                    </VStack>
                </Container>

                <Container step={{current: step, total: totalStep}} _prevStep={handlePreviousStep} _nextButton={<Button isDisabled={cpf.length !== 11} title="Continuar" mt={2} color="red.400" onPress={handleNextStep} py={2} _dark={{_pressed:{bg: "gray.800"}}} _light={{_pressed:{bg: "gray.200"}}}/>}>
                    <VStack>
                        <Box>
                            <FormControl.Label isRequired>Nome</FormControl.Label>
                            <Input placeholder="Joe" value={nome} onChangeText={setNome}/>
                        </Box>
                        <Box>
                            <FormControl.Label isRequired>Sobrenome</FormControl.Label>
                            <Input placeholder="Dohn" value={sobrenome} onChangeText={setSobrenome} />
                        </Box>
                        <Box>
                            <FormControl.Label isRequired>CPF</FormControl.Label>
                            <Input placeholder="99999999999" maxLength={11}  value={cpf} onChangeText={setCpf} />
                        </Box>
                    </VStack>
                </Container>

                <Container step={{current: step, total: totalStep}}  _prevStep={handlePreviousStep} _nextButton={<Button isLoading={isLoading} _loading={{_spinner:{color: THEME.colors.bittersweet[400]}}} title="Continuar" mt={2} color="red.400" onPress={handleNextStep} py={2} _dark={{_pressed:{bg: "gray.800"}}} _light={{_pressed:{bg: "gray.200"}}}/>}>
                    <VStack>
                        <Input placeholder="Endereço" value={endereco} onChangeText={(e) => setEndereco(e)} />
                        <Button title="Cadastrar" mt={4} onPress={handleSubmit} isLoading={isLoading} _loading={{_spinner: { color: colors.bittersweet[300]}}} />
                    </VStack>
                </Container>
            </Swiper>
        </Box>
    )
}