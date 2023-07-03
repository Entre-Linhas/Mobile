import { Box } from "native-base";
import { AppRoutes } from "./app.routes";
import { NavigationContainer } from "@react-navigation/native";


export function AuthRoutes() {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}