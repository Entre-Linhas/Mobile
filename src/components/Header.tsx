import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, HStack, Heading, Text, View, useColorMode } from "native-base";
import { Bell, CaretLeft } from "phosphor-react-native";
import { BackHandler } from "react-native";
import { Button } from "./Button";


/* pt={Math.floor(StatusBar.currentHeight + 27)} */

interface HeaderProps {
    title: string | undefined;
    _showBack?: boolean;
    _showNotification?: boolean;
    _rightElement?: React.ReactNode;
}



export function Header({ title, _showBack, _showNotification, _rightElement }: HeaderProps) {
    const { goBack } = useNavigation();
    const { colorMode } = useColorMode();

    return (
        <>
            <HStack px={4} py={4} alignItems='center' justifyContent="space-between" _light={{bg: "white", borderBottomColor: "coolGray.200"}} _dark={{bg: "gray.800", borderBottomColor: "gray.700"}} borderBottomWidth={1} safeArea> 
                {_showBack ? <Button title={null} icon={CaretLeft} onPress={() => goBack()}/> : <Box w={6} />}
                <Heading numberOfLines={1} ellipsizeMode="tail">{title}</Heading>
                {_showNotification ? <Bell color={colorMode == "dark" ? "white" : "black"}/> : !_rightElement && <Box w={6} />}
                {_rightElement && _rightElement}
            </HStack>
        </>
    )
}