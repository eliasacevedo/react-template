import useInput from "./useInput"

interface InputProps {

}

function Input(props: InputProps) {
    const {} = useInput({})
    return (
        <input />
    )
}

export default Input