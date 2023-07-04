import { Box, FormControl, VStack, useColorMode, Toast, useToast } from "native-base";
import { useState } from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextArea } from "../components/TextArea";
import { useNavigation } from "@react-navigation/native";



export function Payment() {
    const [cartao, setCartao] = useState("");
    const [date, setDate] = useState("");
    const [titular, setTitular] = useState("");
    const [cvv, setCvv] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const { navigate, goBack } = useNavigation();


    async function handleSubmit() {
        if(!cartao || String(cartao).length < 13 || String(cartao).length > 16 || !date || !cvv || String(cvv).length !== 4 || !titular) {
            toast.show({
                title: "Preencha todos os campos!",
                placement: "bottom",
                bgColor: "bittersweet.700"
            })
            return false;
        }

        toast.show({
            title: "Seu pagamento está em processado!",
            placement: "bottom",
            bgColor: "turquoise.400"
        })

        goBack();
    }

    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header title="Pagamento" _showBack />

            <VStack flex={1} px={2} space={2}>
                <FormControl isRequired>
                    <FormControl.Label>N° do Cartão</FormControl.Label>
                    <Input placeholder="1234 5678 9012 3456" value={cartao.match(/.{1,4}/g)?.join(" ")} maxLength={16} onChangeText={(e) => setCartao(e)} />
                </FormControl>
                <FormControl isRequired>
                    <FormControl.Label>Data de Validade</FormControl.Label>
                    <Input placeholder="MM/AA" value={date} onChangeText={(e) => setDate(e)}/>
                </FormControl>
                <FormControl isRequired>
                    <FormControl.Label>CVV</FormControl.Label>
                    <Input placeholder="123" value={String(cvv)} onChangeText={(e) => setCvv(e)} />
                </FormControl>
                <FormControl isRequired>
                    <FormControl.Label>Titular do cartão</FormControl.Label>
                    <TextArea placeholder="Isabela S Campos" value={titular} onChangeText={(e) => setTitular(e)}/>
                </FormControl>

                <Button title="Salvar" bg="turquoise.400" mt={4} py={2} disabled={false} isLoading={isLoading} _loading={{_spinner: {bg: "turquoise.500"}}} _pressed={{bg: "green.500"}} _disabled={{bg: "green.500"}} onPress={handleSubmit}  />
            </VStack>
        </Box>
    )
}