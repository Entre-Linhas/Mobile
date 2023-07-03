import { Center, Spinner, useColorMode, useTheme } from "native-base";

type LoadingProps = {
    _showBg?: boolean
}

export function Loading({ _showBg }: LoadingProps) {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Center flex={1} _light={{
            bg: _showBg ? "coolGray.100" : "transparent"
        }} _dark={{
            bg: _showBg ? "gray.900" : "transparent"
        }}>
            <Spinner color={colors.red[400]} size={32} />
        </Center>
    )
}