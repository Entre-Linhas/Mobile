import { Box, Center, Image, Text } from "native-base";
import NoData from "../assets/no_data.svg";

interface EmptyProps {
    title?: string;
    btnAction?: React.ReactNode;
}

export function Empty({ title = "Não há nada por aqui..." }: EmptyProps) {
    return (
        <Box flex={1} alignItems="center" my="auto">
            <Center>
                <NoData height={125} />
                <Text fontWeight="semibold" fontSize="xl">{title}</Text>
            </Center>
        </Box>
    )
}