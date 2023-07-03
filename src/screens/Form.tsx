import { Box, FormControl, VStack, useColorMode, Toast, useToast } from "native-base";
import DatePicker from "@react-native-community/datetimepicker"
import { useState } from "react";
import moment from "moment";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextArea } from "../components/TextArea";
import { useNavigation } from "@react-navigation/native";
import { saveManagement } from "../services/storage";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";



export function Form() {
    const { setPedido, perfil } = useAuth();
    const [title, setTitle] = useState<string>("");
    const [client, setClient] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [price, setPrice] = useState<string>(""); 
    const [quantidade, setQuantidade] = useState<string>(""); 
    const [date, setDate] = useState<Date>();
    const { colorMode } = useColorMode();
    const [showSelectDate, setShowSelectDate] = useState<boolean>();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const { navigate, goBack } = useNavigation();


    const handleDate = (e: any, select: any) => {
        const currentDate = select || date;
        setShowSelectDate(false);
        setDate(currentDate);
        console.log(currentDate)
    }



    async function handleSubmit() {
        if(!title || !client || !desc || !price || !date) {
            toast.show({
                title: "Preencha todos os campos!",
                placement: "bottom",
                bgColor: "bittersweet.700"
            })
            return false;
        }

        try {
            setIsLoading(true)
            api.post("/pedidos", {
                usuario: perfil.usuario,
                date,
                title,
                description: desc,
                nome: client,
                quantidade,
                price,
                estado: "text-yellow-500"
            })
                .then(async (res) => {
                    toast.show({
                        title: "Salvando e criando lembrente",
                        placement: "bottom",
                        bgColor: "jade.500"
                    })
                    await saveManagement({date: String(date), id: res.data.id, price: Number(price), estado: "text-yellow-500", title, nome: client})
                    toast.show({
                        title: "Pedido adicionado a sua lista!",
                        placement: "bottom",
                        bgColor: "jade.500"
                    });
                })
            return goBack();
        } catch(e) {
            toast.show({
                title: "Ocorreu um erro ao salvar seu pedido.",
                placement: "bottom",
                bgColor: "bittersweet.700"
            })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <Header title="Formulário" _showBack />

            <VStack flex={1} px={2} space={2}>
                <FormControl isRequired isInvalid={'title' in errors}>
                    <FormControl.Label>Título</FormControl.Label>
                    <Input placeholder="Vestido de Isabela Silva" value={title} onChangeText={(e) => setTitle(e)} />
                </FormControl>
                <FormControl isRequired isInvalid={'client' in errors}>
                    <FormControl.Label>Nome cliente</FormControl.Label>
                    <Input placeholder="Isabela Silva" value={client} onChangeText={(e) => setClient(e)}/>
                </FormControl>
                <FormControl isRequired isInvalid={'desc' in errors}>
                    <FormControl.Label>Descrição</FormControl.Label>
                    <TextArea placeholder="Insirá uma breve descrição deste pedido, podendo conter os produtos..." value={desc} onChangeText={(e) => setDesc(e)}/>
                </FormControl>
                <FormControl isRequired isInvalid={'price' in errors}>
                    <FormControl.Label>Preço</FormControl.Label>
                    <Input placeholder="39.99" value={price} onChangeText={(e) => setPrice(e)} />
                </FormControl>
                <FormControl isRequired>
                    <FormControl.Label>Quantidade</FormControl.Label>
                    <Input placeholder="1" value={quantidade} onChangeText={setQuantidade}/>
                </FormControl>
                <FormControl isRequired isInvalid={'date' in errors}>
                    <FormControl.Label>Data de entrega</FormControl.Label>
                    <Input placeholder="DD/MM/YYY" value={date && moment(date).format("DD/MM/YYYY")} isFocused={false} onFocus={() => setShowSelectDate(true)} />
                </FormControl>

                {showSelectDate && <DatePicker 
                    value={date || new Date()}
                    minimumDate={new Date()}
                    mode="date"
                    display="default"
                    themeVariant={colorMode == "dark" ? "dark" : "light"}
                    onChange={handleDate}
                />}

                <Button title="Salvar" bg="bittersweet.400" mt={4} py={2} disabled={false} isLoading={isLoading} _loading={{_spinner: {bg: "bittersweet.500"}}} _pressed={{bg: "red.500"}} _disabled={{bg: "green.500"}} onPress={handleSubmit}  />
            </VStack>
        </Box>
    )
}