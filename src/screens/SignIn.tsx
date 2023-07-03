import { useContext, useState } from "react";
import { Box, FormControl, Heading, Text, VStack, useColorMode, useToast, Button as ButtonNative } from "native-base";
import { Eye, EyeClosed } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthProvider";
import { THEME } from "../styles/theme";

export function SignIn() {
    const { signIn, setPerfil, setAtividades } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [passwordType, setPasswordType] = useState<"text" | "password">("password");
    const [errors, setErrors] = useState({});
    const toast = useToast();
    const { colorMode } = useColorMode();
    const { navigate } = useNavigation();
    const { colors } = THEME;

    async function handleSubmit() {
        setErrors({});
        if(!email || !email.includes("@") || !email.includes(".com") || !senha || senha.length < 4 || senha.length > 30) {
            setErrors({...errors, error: "Email ou Senha inválidos"});
            console.log("Erro")
            return false;
        }
        
        try {
            setIsLoading(true);
            await api.post("/usuarios/login", {email, senha})
                .then(async (res) => {
                    console.log("Data:",res.data);
                    if(res.data) {
                        await SecureStore.setItemAsync("Authuser", JSON.stringify({email: res.data.usuario.email, senha: res.data.usuario.senha, id: res.data.usuario.idUsuario}));
                        setPerfil(res.data);
                        setAtividades(res.data.trilhas.atividades)
                        signIn();
                    }
                });
        } catch (err) {
            console.log(err);
            setErrors({error: "Email ou senha inválidos"});
            toast.show({
                title: "Email e/ou senha incorretos.",
                placement: "bottom",
                bgColor: "bittersweet.700"
            })
            // throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box flex={1} justifyContent="center" px={2} _light={{bgColor: "coolGray.100"}} _dark={{bg: "gray.900"}}>
            <Text fontFamily="Sacramento.body" color="bittersweet.400" fontSize={44} textAlign="center">Entre Linhas</Text>
            <Heading textAlign="center" my={8} fontSize={26}>Seja bem-vindo/a de volta</Heading>
            <FormControl isRequired isInvalid={'error' in errors}>
                <VStack space={2}>
                    <Box>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Input type="text" value={email} onChangeText={(e) => setEmail(e)} placeholder="joedohn@email.com"/>
                    </Box>
                    <Box>
                        <FormControl.Label>Senha</FormControl.Label>
                        <Input type={passwordType} value={senha} onChangeText={(e) => setSenha(e)} placeholder="joedohn@email.com" rightElement={<ButtonNative onPress={() => setPasswordType(passwordType == "password" ? "text" : "password")} bg="transparent" _pressed={{bg:"transparent"}}>{passwordType === "password" ? <Eye color={colorMode == "dark" ? "white" : "black"}/> : <EyeClosed color={colorMode == "dark" ? "white" : "black"} />}</ButtonNative>} />
                    </Box>
                </VStack>
                {'error' in errors && <FormControl.ErrorMessage>Email e/ou Senha inválidos</FormControl.ErrorMessage>}
            </FormControl>
            <VStack mt={6} space={3}>
                <Button title="Entrar" onPress={handleSubmit} disabled={!email || !senha || senha.length < 4 || senha.length > 30} py={2} fontSize={18} bg="bittersweet.400" isLoading={isLoading} _loading={{_spinner: { color: colors.bittersweet[300]}}}  _pressed={{bg: "red.500"}}/>
                <Button title="Cadastrar" fontWeight="normal" onPress={() => navigate("signup")} disabled={isLoading} py={2} color="gray.500" _pressed={{bg: "gray.200"}}/>
            </VStack>
        </Box>
    )
}