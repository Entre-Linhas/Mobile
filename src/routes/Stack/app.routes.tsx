import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import { MoreList } from "../../screens/More";
import { Settings } from "../../screens/Settings";
import { Plans } from "../../screens/Plans";


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
                <Screen name="plans" component={Plans} options={{
                    title: "Planos"
                }}/>
            </Group>
        </Navigator>
    )
}