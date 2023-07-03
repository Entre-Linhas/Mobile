import { Box, Heading, StatusBar, Text } from "native-base";
import { Modal, ModalProps } from 'react-native';
import { CardProps } from "./Card";
import { Button } from "./Button";
import { Play, X } from "phosphor-react-native";
import { useState } from "react";


interface ModalInfoProps extends ModalProps {
    _title: string;
    _time: number;
    _desc: string;
    isVisible: boolean;
    onClose: () => void;
}

export function CardInfo({ isVisible, _title, _time, _desc, onClose, ...rest }: ModalInfoProps) {
    // console.log("Props", isVisible)
    // const [isModalVisible, setIsModalVisible] = useState<boolean>(isVisible)
    // console.log("State:", isModalVisible)

    return (
        <>
            <Modal animationType="slide" transparent visible={isVisible}>
                <StatusBar
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                />
                <Box position="relative" h="full" w="full" style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}>
                    <Box bg="white" py={6} pt={2} roundedTop={12} position="absolute" px={4} bottom={0} right={0} left={0}>
                        <Box h={1} rounded="full" bg="coolGray.300" w={"3/5"} mx="auto" mb={6} />

                        <Heading>{_title}</Heading>
                        <Text>{_desc}</Text>

                        <Button 
                            title='Iniciar'
                            icon={Play}
                            bg={"cyan.400"}
                            rounded={6}
                            p={2}
                            mt={8}
                        />
                        <Button 
                            title='Fechar'
                            icon={X}
                            mt={2}
                            onPress={onClose}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}