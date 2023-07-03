import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import { MoreList } from "../../screens/More";
import { Settings } from "../../screens/Settings";
import { Appearance } from "../../screens/Settings/Appearance";
import { Plans } from "../../screens/Plans";
import { Form } from "../../screens/Form";


const { Navigator, Screen, Group } = createStackNavigator();

export function AppRoutes() {
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
                    title: "Conf",
                    // ...TransitionPresets.ModalSlideFromBottomIOS
                }} /> 
                <Screen name="appearance" component={Appearance} options={{
                    title: "Aparência",
                    ...TransitionPresets.ModalSlideFromBottomIOS
                }}/>
                <Screen name="plans" component={Plans} options={{
                    title: "Aparência"
                }}/>
            </Group>
        </Navigator>
    )
}