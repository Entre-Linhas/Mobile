import { Avatar, Box, Button, Center, HStack, Heading, Pressable, Progress, ScrollView, Text, VStack, useColorMode } from "native-base";
import { useContext, useEffect, useState } from "react"
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { BellSimple, Check } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { CardInfo } from "../components/CardInfo"
import moment from "moment";
import "moment/locale/pt-br";
import { HeaderScreen } from "../components/HeaderScreen";
import { Trail } from "../components/Trail";
import { AuthContext } from "../context/AuthProvider";

export interface ExerciseProps {
    id: number;
    _title: string;

}

export function Home() {
    // moment.locale("pt-br");
    const { atividades, atualizarAtividade, nivelamento, setNivelamento, perfil } = useContext(AuthContext);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [exercise, setExercise] = useState("");
    const { toggleColorMode, colorMode } = useColorMode();
    const { navigate } = useNavigation();

        
    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} _dark={{bgColor: "gray.900"}}>
            {/* <Header /> */}
            <HeaderScreen />
            <Center flex={1}>
                <Text textAlign="center" fontWeight="bold" fontSize={18}>Trilha Educacional</Text>

                <Box>
                  <Text>Saiba mais sobre nossa trilha</Text>
                </Box>           
            </Center>
        </Box>
    )
}