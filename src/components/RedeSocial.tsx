import { Box, HStack, Text, useColorMode } from "native-base";
import { FacebookLogo, TwitterLogo, TwitchLogo, InstagramLogo, WhatsappLogo, TelegramLogo } from "phosphor-react-native"

interface RedeSocialProps {
    title: string
}

export function RedeSocial({ title }: RedeSocialProps) {
    const { colorMode } = useColorMode();

    const getLinkingName = new RegExp('https://([^.]+).', 'g').exec(title.replace("www.", "")) || "Vazio" // Pegando qual quer Caracters que não sejam https:// e .

    const iconName = {
        facebook: <FacebookLogo color={colorMode == "dark" ? "white" : "black"}/>,
        twitter: <TwitterLogo color={colorMode == "dark" ? "white" : "black"}/>,
        twitch: <TwitchLogo color={colorMode == "dark" ? "white" : "black"}/>,
        instagram: <InstagramLogo color={colorMode == "dark" ? "white" : "black"}/>,
        whatsapp: <WhatsappLogo color={colorMode == "dark" ? "white" : "black"}/>,
        telegram: <TelegramLogo color={colorMode == "dark" ? "white" : "black"}/>
    }
    return (
        <HStack space={2}>
            {iconName[getLinkingName !== "Vazio" && getLinkingName[1]] || <Box w={6} h={6} rounded={6} bgColor="gray.400"/>}

            <Text>{getLinkingName == "Vazio" ? "Not found" : getLinkingName[1].charAt(0).toUpperCase() + getLinkingName[1].slice(1).toLowerCase()}</Text>          
        </HStack>
    )
}