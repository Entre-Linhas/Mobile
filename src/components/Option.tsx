import { Center, IPressableProps, Pressable, Text } from "native-base";

interface OptionProps extends IPressableProps {
    title: string;
    _isSelected: boolean
}

export function Option({ title, _isSelected = false, ...rest}: OptionProps) {
    return (
        <Pressable flex={1} h={7} maxH={7} {...rest}>
            <Center h="full" w="full" rounded='sm' 
                _light={{
                    bgColor: _isSelected ? "coolGray.200" : "transparent"
                }}
                _dark={{
                    bgColor: _isSelected ? "gray.800" : "transparent"
                }}
            >
                <Text fontFamily="Nunito.heading" fontSize='md' fontWeight="semibold">
                    {title}
                </Text>
            </Center>
        </Pressable>
    )
}