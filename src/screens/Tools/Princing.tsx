import { Box, FormControl, Stack, Actionsheet, useDisclose, Text, HStack, Heading, ScrollView, IStackProps, useColorMode } from "native-base";
import { THEME } from "../../styles/theme";
import { Input } from "../../components/Input";
import { CaretDown, CaretUp, Coins, Plus, Stack as StackIcon, Tag, X } from "phosphor-react-native";
import { Button } from "../../components/Button";
import { useState } from "react";
import { StackPrincing, StackPrincingProps } from "../../components/StackPrincing";


interface ProductProps {
    id: number;
    title: string;
}

interface productInputProps {
    title: string;
    total: string;
    qnt: string;
    princing: string
}

export function Pricing() {
    const [productName, setProductName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [qnt, setQnt] = useState<number>(0);
    const { colorMode } = useColorMode();
    const [product, setProduct] = useState<productInputProps[]>([]);
    const [precoFinal, setPrecoFinal] = useState(0);
    
    const { isOpen, onOpen, onClose } = useDisclose();

    const { colors } = THEME;


    function handleAddProduct(title: string) {
        setProduct([...product, {title, total: "", qnt: "", princing: ""}]);
    }

    function handleRemoveProduct(i: number) {
        const example = [...product];
        example.splice(i, 1);

        setProduct(example);
    }

    function handleSubmit() {
        product.forEach((prod) => {
            setPrecoFinal(precoFinal + ((Number(prod.princing) / 100) * Number(prod.total)) * Number(prod.qnt));
        })

        setProduct([]);
    }
    return (
        <>
            <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
                <FormControl pt={4} px={2}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Stack space={4}>
                            {product.map((v: any, i:number) => {
                                return (
                                    <StackPrincing 
                                        key={i}
                                        onClose={() => handleRemoveProduct(i)}
                                        title={v.title}
                                        princing={((Number(v.princing) / 100) * Number(v.total)) * Number(v.qnt)}
                                    >
                                        <Input 
                                            leftElement={<Plus color={colorMode == 'dark' ? "white" : "black"} style={{marginLeft: 8}}/>}
                                            placeholder="Cm total"
                                            value={String(v.total)}
                                            onChangeText={(e) => {
                                                const newValues = [...product];
                                                newValues[i].total = e;
                                                setProduct(newValues);
                                            }}
                                        />
                                        <Input 
                                            leftElement={<StackIcon color={colorMode == 'dark' ? "white" : "black"} style={{marginLeft: 8}}/>}
                                            placeholder="Quantidade usada"
                                            value={String(v.qnt)}
                                            onChangeText={(e) => {
                                                const newValues = [...product];
                                                newValues[i].qnt = e;
                                                setProduct(newValues);
                                            }}
                                        />
                                        <Input 
                                            leftElement={<Coins color={colorMode == 'dark' ? colors.gray[400] : "black"} style={{marginLeft: 8}}/>}
                                            placeholder="Preço unidade"
                                            value={String(v.princing)}
                                            onChangeText={(e) => {
                                                const newValues = [...product];
                                                newValues[i].princing = e;
                                                setProduct(newValues);
                                            }}
                                        />
                                    </StackPrincing>
                                )
                            })}

                            <Button 
                                title="Mais produto"
                                icon={Plus}
                                borderStyle="dashed"
                                borderColor="gray.500"
                                borderWidth={2}
                                p={2}
                                opacity={0.6}
                                onPress={() => onOpen()}
                            />

                            <Button 
                                bg={colors.turquoise[400]}
                                _pressed={{
                                    bg: colors.turquoise[500]
                                }}
                                title="Calcular"
                                onPress={handleSubmit}
                                mt={6}
                                p={2}                                
                            />
                        </Stack>
                    </ScrollView>
                </FormControl>

                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content _dragIndicator={{
                        bg: 'blue.500'
                    }}>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text fontSize="16" color="gray.500" _dark={{
                                color: 'gray.300'
                            }}>Produtos</Text>
                        </Box>
                        <Actionsheet.Item _pressed={{bg: "gray.200", rounded: 8}} onPress={() => handleAddProduct("Linha")}>Linha</Actionsheet.Item>
                        <Actionsheet.Item _pressed={{bg: "gray.200", rounded: 8}} onPress={() => handleAddProduct("Tecido")}>Tecido</Actionsheet.Item>
                        <Actionsheet.Item>Outros</Actionsheet.Item>
                        {/* <Actionsheet.Item>Cancel</Actionsheet.Item> */}
                    </Actionsheet.Content>
                </Actionsheet>
            </Box>
        </>
    )
}