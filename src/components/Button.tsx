import { HStack, IButtonProps, Button as NativeButton, Text, VStack, useColorMode } from "native-base";
import { IconProps } from "phosphor-react-native";


export interface ButtonProps extends IButtonProps {
    title: string | null;
    icon?: React.FC<IconProps>;
    size?: number;
} 

export function Button({ title, icon: Icon, size = 18, ...rest}: ButtonProps) {
    const { colorMode } = useColorMode();
    
    return (
        <NativeButton bg="transparent" p={0} m={0} _pressed={{bg:"transparent"}} _disabled={{opacity: 50}} _loading={{_spinner: {color: "black"}}} {...rest}>
            <HStack space={2} alignItems="center">
                {Icon && <Icon size={rest.fontSize || size} color={colorMode == "dark" ? "white" : "black"}/>}
                {title && <Text fontWeight={rest.fontWeight || "medium"} color={rest.color} fontSize={rest.fontSize || 16}>{title}</Text>}
            </HStack>
        </NativeButton>
    );
}