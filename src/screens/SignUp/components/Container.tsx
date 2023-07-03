import { Box, HStack, IButtonProps, Text, VStack } from "native-base";
import { Button, ButtonProps } from "../../../components/Button";
import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

interface ContainerProps {
    children: React.ReactNode;
    step: {
        current: number;
        total: number;
    };
    _prevStep: () => void;
    // _disabled: boolean;
    _nextButton: React.ReactElement<ButtonProps>
}

export function Container({ children, step, _prevStep, _nextButton }: ContainerProps) {
    const { navigate } = useNavigation();

    return (
        <Box flex={1}>
            <HStack>
                <Button title="Voltar" icon={CaretLeft} fontSize={20} mr="auto" onPress={_prevStep}/>
                <Text fontFamily="Nunito.mono" fontSize={20}>{step.current + 1}/{step.total}</Text>
            </HStack>
            <VStack flex={1} justifyContent="center">
                <Text fontFamily="Sacramento.body" color="bittersweet.400" fontSize={44} textAlign="center">Entre Linhas</Text>
                {children}
                <VStack>
                    {step.current + 1 < step.total && _nextButton}
                    <Button title="Já tenho uma conta" color="gray.500" py={2} _pressed={{bg: "gray.200"}} onPress={() => navigate("signin")} />
                </VStack>
            </VStack>
        </Box>
    )
}