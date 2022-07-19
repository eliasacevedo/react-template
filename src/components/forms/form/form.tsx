import useForm from "./useForm"

export interface FormProps {
    children: any
}

function Form({ children }: FormProps) {
    const {  } = useForm({})
    return (
        <form>
            {children}
        </form>
    )
}

export default Form