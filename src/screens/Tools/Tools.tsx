import { useState } from "react";
import { Box, HStack, FormControl, Heading, Text, useColorMode, useTheme } from "native-base";
import { Option } from "../../components/Option";
import { Empty } from "../../components/Empty";
import { Input } from "../../components/Input";
import { Coins, Tag, Stack as StackIcon, Clock, MagnifyingGlass, Plus } from "phosphor-react-native";
import { Button } from "../../components/Button";
import { Pricing } from "./Princing";
import { Management } from "./Management";
import { HeaderScreen } from "../../components/HeaderScreen";


import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; 
import { Home } from "../Home";
import { createStackNavigator } from "@react-navigation/stack";
import { Form } from "../Form";

const { Navigator, Screen, Group } = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


export function Tools() {
    const { colorMode } = useColorMode();
    const { colors, space, borderWidths } = useTheme();
    const [toolSelected, setToolSelected] = useState<"pricing" | "management">("pricing");
    
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <HeaderScreen borderWidth={0}/>
            <Box /* px={2} */ flex={1}>
                <Navigator initialRouteName="pricing" screenOptions={{
                    tabBarActiveTintColor: colors.red[400],
                    tabBarInactiveTintColor: colors.gray[300],
                    tabBarStyle: {
                        backgroundColor: colorMode == "light" ? colors.white : colors.gray[800],
                        shadowColor: "transparent",
                        borderBottomColor: colorMode == "light" ? colors.coolGray[200] : "transparent",
                        borderBottomWidth: 1
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.red[400]
                    },
                    tabBarPressColor: colorMode == "light" ? colors.gray[200] : colors.gray[600],
                }}>
                    <Screen name="pricing" component={Pricing} options={{
                        title: "Precificação"
                    }}/>
                    <Screen name="management" component={Management} options={{
                        title: "Gerenciamento"
                    }}/>
                </Navigator>
            </Box>
        </Box>
    )
} 

{/* <HStack p={1} rounded='sm' mb={8}
    _light={{
        bgColor: "white"
    }}
    _dark={{
        borderWidth: 1,
        borderColor: "gray.800"
    }}
>
    <Option title="Precificação" _isSelected={toolSelected == "pricing"} onPress={() => setToolSelected("pricing")}/>
    <Option title="Gerenciamento" _isSelected={toolSelected == "management"} onPress={() => setToolSelected("management")}/>
</HStack> */}

{/* <Box flex={1} justifyContent="center">
    { toolSelected == "pricing" ? <Pricing /> : <Management />}
</Box> */}