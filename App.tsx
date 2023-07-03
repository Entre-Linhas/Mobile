import 'react-native-gesture-handler';
import { useEffect } from "react";
import * as Notifications from 'expo-notifications';
import { StatusBar, NativeBaseProvider, useColorMode } from "native-base";
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { Sacramento_400Regular } from "@expo-google-fonts/sacramento"
import { useFonts } from "expo-font"

import NavAuth from "./src/routes";
import { THEME } from "./src/styles/theme";
import { colorModeManager } from "./src/utils/changeTheme";
import { Loading } from "./src/components/Loading";
import { getPushNotificationToken }  from "./src/services/getPushNotificationToken";
import { AuthProvider } from './src/context/AuthProvider';
import { ManagementProps } from './src/screens/Tools/Management';


export default function App() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });


    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.order as ManagementProps;
        console.log("Subscription:", data);
      }
    )

    async function notifications() {    
      await Notifications.cancelAllScheduledNotificationsAsync();      

      const data = await Notifications.getAllScheduledNotificationsAsync();
      // console.log("--- NOTIFICAÇÕES AGENDAS ---")
      // console.log(data);
    }

    notifications();
    
    return () => subscription.remove();

  },[])
  // const getNotificationListener = useRef<any>();
  // const responseNotificationListener = useRef<any>();

  // useEffect(() => {getPushNotificationToken();},[])
  // useEffect(() => {
    
  //   getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     console.log(notification);
  //   });

  //   responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response)
  //   });

  //   return () => {
  //     if(getNotificationListener.current && responseNotificationListener.current) {
  //       Notifications.removeNotificationSubscription(getNotificationListener.current);
  //       Notifications.removeNotificationSubscription(responseNotificationListener.current);
  //     }
  //   }
  // }, []);
  var [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Sacramento_400Regular
  })

  // fontsLoaded = false
  const { colorMode, toggleColorMode } = useColorMode();
  const { colors } = THEME;
  


  return (
    <NativeBaseProvider theme={THEME}  colorModeManager={colorModeManager}>
      <AuthProvider>
        <StatusBar 
          backgroundColor="transparent"
          translucent
        />
        { fontsLoaded ? <NavAuth /> : <Loading _showBg />}
      </AuthProvider>
      {/* <Welcome /> */}
    </NativeBaseProvider>
  );
}