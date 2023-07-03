import { Pressable, Text, useColorMode, useTheme,  } from "native-base";
import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";
import { IconProps } from "phosphor-react-native";


interface NavProps extends InterfacePressableProps {
    _leftIcon?: React.FC<IconProps>;
    title?: string | null;
    children?: React.ReactNode | null;
    _rightIcon?: React.FC<IconProps>;
}

export function Nav({ children, title, _leftIcon: LIcon, _rightIcon: RIcon, ...rest}: NavProps) {
    const { colors } = useTheme();
    const { colorMode } = useColorMode();

    return (
        <Pressable flexDir="row" alignItems="center" {...rest}>
            {LIcon && <LIcon color={colorMode == "light" ? colors.gray[600] : colors.gray[200]} size={26}/>}
            {title && <Text ml="4" fontSize="md" _light={{color: "gray.600"}} _dark={{color: "gray.200"}}>{title}</Text>}
            {children}
            {RIcon && <RIcon color={colorMode == "light" ? colors.gray[400] : colors.gray[200]} size={16} style={{marginLeft: "auto"}}/>}
        </Pressable>
    )
}