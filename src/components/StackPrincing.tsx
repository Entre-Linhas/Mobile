import { Box, Button, HStack, Heading, IStackProps, PresenceTransition, Stack, Text, useColorMode } from "native-base";
import { CaretUp, Plus, X, Stack as StackIcon, Coins } from "phosphor-react-native";
import { Input, InputProps } from "./Input";
import { THEME } from "../styles/theme";
import { useState } from "react";
// import { Button } from "./Button";


export interface StackPrincingProps extends IStackProps {
    title?: string | null;
    princing?: number;
    children: React.ReactNode;
    onClose: () => void;
}

export function StackPrincing({ title, children, princing, onClose, ...rest }: StackPrincingProps) {
    const [isMinimize, setIsMinimize] = useState<boolean>(false);
    const { colorMode } = useColorMode();
    const { colors } = THEME;

    return (
        <>
            <Stack space={isMinimize ? 4 : 0} p={3} rounded={8} {...rest}
                _light={{
                    bgColor: "white"
                }} 
                _dark={{
                    bgColor: "gray.800",
                    borderWidth: 2,
                    borderColor: "gray.700"
                }}
            >
                <HStack alignItems="center">
                    <Heading>{title}</Heading>
                    
                    <Text pl={2} mr="auto" color={colors.turquoise[400]} fontWeight="bold" fontSize="md">{princing?.toLocaleString("pt-br", { style:"currency", currency: "BRL"})}</Text>
                    <HStack space={1}>
                        <Button bg="transparent" p={0} _pressed={{bg: "transparent"}} onPress={() => setIsMinimize(!isMinimize)}>
                            <PresenceTransition visible={isMinimize} initial={{rotate: "-180deg"}} animate={{opacity: 1, rotate: "0deg", transition: {duration: 150}}}>
                                <CaretUp color={colorMode == 'dark' ? "white" : "black"}/>
                            </PresenceTransition>
                        </Button>
                        <Button bg="transparent" p={0} _pressed={{bg: "transparent"}} onPress={onClose}>
                            <X color={colorMode == 'dark' ? "white" : "black"}/>
                        </Button>
                    </HStack>
                </HStack>

                <PresenceTransition visible={isMinimize} initial={{
                    opacity: 0,
                    scale: 0,
                }} animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {duration: 150},
                }}>
                    <Stack space={4} style={{
                        height: isMinimize == false ? 0 : undefined,
                        opacity: isMinimize == false ? 0 : 1
                    }}>
                        {children}
                    </Stack>
                </PresenceTransition>
            </Stack>
        </>
    )
}