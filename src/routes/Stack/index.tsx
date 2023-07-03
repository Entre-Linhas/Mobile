import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";


export function Routes() {
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            {/* <NavigationContainer independent> */}
                <AppRoutes />
            {/* </NavigationContainer> */}
        </Box>
    )
}