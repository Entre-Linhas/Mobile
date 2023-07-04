import { Box, HStack, VStack, Text, ScrollView, useTheme, useColorMode } from "native-base";
import { createStackNavigator, CardStyleInterpolators, TransitionPresets  } from "@react-navigation/stack";
import { ArrowSquareOut, BellSimple, Browser, CaretRight, Crown, Gear, House, SignOut, UserCircle, UsersThree, Wrench } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import { InfoHeader } from "../components/InfoHeader";
import { Nav } from "../components/Nav";
import { Line } from "../components/Line";
import { Settings } from "./Settings";
import { Plans } from "./Plans";
import { useAuth } from "../hooks/useAuth";
import { ProfileSettings } from "./Settings/ProfileSettings";

const { Navigator, Screen, Group } = createStackNavigator();


export function MoreList() {
    const { signOut, setIsUserLoading } = useAuth();
    const { colors } = useTheme();
    const { colorMode } = useColorMode();

    const { navigate } = useNavigation();
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            <HStack px={2} py={4} _light={{
                bg:"white",
                borderBottomColor: "coolGray.200",
                borderBottomWidth: 1
            }} _dark={{
                bg: "gray.800",
                borderBottomColor: "coolGray.700"
            }} safeArea>
                <InfoHeader />
            </HStack>

            <ScrollView px={2} py={3}>
                <VStack space={4} mt={2}>
                    <Nav _leftIcon={Wrench} title="Ferramentas" onPress={() => navigate("tools")}/>
                    <Nav _leftIcon={UserCircle} title="Perfil" onPress={() => navigate("profile")}/>
                    <Nav _leftIcon={BellSimple} _rightIcon={CaretRight} title="Notificações" onPress={() => navigate("notification")}/>
                    <Nav _leftIcon={Gear} _rightIcon={CaretRight} title="Configurações" onPress={() => navigate("settings")}/>

                    <Line />

                    <Nav _leftIcon={Crown} _rightIcon={CaretRight} title="Planos" onPress={() => navigate("plans")}/>
                    <Nav _leftIcon={Browser} _rightIcon={ArrowSquareOut} title="Página Web" onPress={() => WebBrowser.openBrowserAsync("https://entre-linhas.debugon.xyz/")}/>
                    <Nav _leftIcon={UsersThree} _rightIcon={ArrowSquareOut} title="Comunidade" onPress={() => WebBrowser.openBrowserAsync("https://o327339.invisionservice.com/")}/>

                    <Line />
                    
                    <Nav onPress={() => {signOut();}}>
                        <SignOut color={colorMode == 'light' ? colors.red[400] : colors.red[600]} size={26}/>
                        <Text ml="4" fontSize="md" color={colorMode == "light" ? "red.400" : "red.600"}>Sair</Text>
                    </Nav>

                    <Line />

                    <Text onPress={() => WebBrowser.openBrowserAsync("https://entre-linhas.debugon.xyz/sobre")}>Sobre o Entre Linhas</Text>
                    
                    
                </VStack>
            </ScrollView>
        </Box>
    )
}


export default function More() {
    const { navigate } = useNavigation();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="listMore"
        >
            <Group>
                <Screen name="listMore" component={MoreList} /> 
            </Group>
            <Group screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
                <Screen name="settings" component={Settings} options={{
                    // ...TransitionPresets.ModalSlideFromBottomIOS
                }} /> 
                <Screen name="plans" component={Plans} options={{
                    ...TransitionPresets.SlideFromRightIOS
                }}/>
                <Screen name="profileSettings" component={ProfileSettings} />
            </Group>
        </Navigator>
    )
}