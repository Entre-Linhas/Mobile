import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { AppRoutes } from "./app.routes";


export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes/>
        </NavigationContainer>
    )
}