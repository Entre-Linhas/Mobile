import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, List, UserCircle, Wrench } from "phosphor-react-native";
import { useColorMode, useTheme } from "native-base";

import { Home } from "../../screens/Home";
import { Profile } from "../../screens/Profile";
import { Notification } from "../../screens/Notification";
import { Tools } from "../../screens/Tools/Tools";
import More from "../../screens/More";
import { Settings } from "../../screens/Settings";
import { Form } from "../../screens/Form";
import { InfoOrder } from "../../screens/Tools/infoOrder";
import { Nivelamento } from "../../screens/Nivelamento";

const { Navigator, Screen, Group } = createBottomTabNavigator();

export function AppRoutes() {
    const { colors } = useTheme();
    const { colorMode } = useColorMode()

    return (
        <Navigator
            backBehavior="history"
            initialRouteName="tools"
            screenOptions={{
                headerShown: false,
                lazy: false,
                tabBarActiveTintColor: colors.red[400],
                tabBarInactiveTintColor: colors.gray[300],
                tabBarStyle: {
                    backgroundColor: colorMode == "dark" ? colors.gray[800] : colors.white,
                    borderTopColor: colorMode == "dark" ? colors.coolGray[600] : colors.coolGray[200]
                }
            }}
        >
            {/* <Screen 
                name="home"
                component={Home}
                options={{
                    tabBarIcon:(({color}) => <House color={color} size={24}/>),
                    tabBarLabel: "Início"
                }}
            /> */}
            <Screen 
                name="tools"
                component={Tools}
                options={{
                    tabBarIcon: (({ color }) => <Wrench color={color} size={24}/>),
                    tabBarLabel: "Ferramentas"
                }}
            />
            <Screen 
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon:(({color}) => <UserCircle color={color} size={24}/>),
                    tabBarLabel: "Perfil"
                }}
            />
            <Screen 
                name="notification"
                component={Notification}
                options={{
                    tabBarItemStyle: {
                        display: "none"
                    }
                }}
            />
            <Screen
                name="more"
                component={More}
                options={{
                    tabBarIcon:(({color}) => <List color={color} size={24}/>),
                    tabBarLabel: "Mais"
                }}
            />
            <Screen 
                name="settings"
                component={Settings}
                options={{
                    tabBarStyle: {
                        display: "none",
                    },
                    tabBarItemStyle: {
                        display: "none"
                    }
                }}
            />
            <Screen 
                name="formOrder"
                component={Form}
                options={{
                    tabBarStyle: {
                        display: "none",
                    },
                    tabBarItemStyle: {
                        display: "none"
                    }
                }}
            />
            <Screen 
                name="infoOrder"
                component={InfoOrder}
                options={{
                    tabBarItemStyle: {
                        display: "none"
                    }
                }}
            />
            <Screen 
                name="nivelamento"
                component={Nivelamento}
                options={{
                    tabBarStyle: {
                        display: "none",
                    },
                    tabBarItemStyle: {
                        display: "none"
                    }
                }}
            />
        </Navigator>
    )
}