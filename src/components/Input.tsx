import { Input as InputNative, IInputProps } from "native-base";

export interface InputProps extends IInputProps {}

export function Input({ ...rest }: IInputProps) {
    return (
        <InputNative
            px={2}
            fontSize="md"
            _light={{
                bg: "white",
                _focus: {
                    bg: "cyan.50",
                    borderLeftWidth: 3,
                    focusOutlineColor: "turquoise.400"
                }
            }}
            _dark={{
                bg: "gray.800",
                _focus: {
                    bgColor: "gray.800",
                    borderLeftWidth: 3,
                    focusOutlineColor: "turquoise.400"
                }
            }}
            {...rest}
        />
    )
}