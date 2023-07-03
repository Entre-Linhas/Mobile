import { CardStyleInterpolators, TransitionPresets, createStackNavigator } from "@react-navigation/stack"
import { SignIn } from "../../screens/SignIn";
import { SignUp } from "../../screens/SignUp";
import { Welcome } from "../../screens/Welcome";


const { Navigator, Screen, Group } = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
        }}>
            <Group>
                <Screen name="welcome" component={Welcome} />
            </Group>
            <Group screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, gestureDirection: "vertical", transitionSpec: {
                    close: {animation: "timing", config: {delay: 0, duration: 300}},
                    open: {animation: "spring", config: {delay: 0}}
                }}}>
                <Screen name="signin" component={SignIn} />
                <Screen name="signup" component={SignUp} />
            </Group>
        </Navigator>
    )
}