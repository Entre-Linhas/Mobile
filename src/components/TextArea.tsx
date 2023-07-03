import { TextArea as NativeTextArea, ITextAreaProps} from "native-base";


export function TextArea({...rest}: ITextAreaProps) {
    return (
        <NativeTextArea 
            autoCompleteType={null}
            px={2}
            fontSize="md"
            _light={{
                bg: "white",
                _focus: {
                    bg: "cyan.50",
                    borderColor: "turquoise.400",
                    borderLeftWidth: 3
                }
            }}
            _dark={{
                bg: "gray.800",
                _focus: {
                    bgColor: "gray.800",
                    borderColor: "turquoise.400",
                    borderLeftWidth: 3
                }
            }}
            {...rest}
        />
    )
}