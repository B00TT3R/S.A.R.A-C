import { BigButton, Input, Select } from "<>"
import { titleHandler } from "@/Utils";
import api from "@/Utils/api"
import {Form, Formik, FormikHelpers} from "formik"
import { useNavigate } from "react-router-dom";
import { object, string} from "yup"
const NewTopic = () =>{
    titleHandler(`Criar Tópico`)
    const navigate = useNavigate()
    const initialValues = {
        name: "",
    }
    const validation = object({
        name: string().required("é um campo obrigatório"),
    })
    const handleSubmit = async (values:typeof initialValues, {setSubmitting}:FormikHelpers<typeof initialValues>) => {
        try{
            await api.post("/api/topics", values)
            navigate("/topicos")
        } catch(err){
            alert("Erro na criação!")
        }
        setSubmitting(false)

    }
    return(
        <div>
            <header className="text-2xl">
                <h1>
                    <b>Criar Tópico:</b>
                </h1>
            </header>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validation}
                validateOnChange={false}
            >
                {({
                    handleChange,
                    isSubmitting,
                    values,
                    errors,
                }) => (
                    <Form className="grid gap-2">
                        
                        <Input
                            label="Nome"
                            placeholder="Digite o nome do tópico"
                            name="name"
                            value={values.name}
                            onChange={handleChange("name")}
                            error={errors.name}
                        />
                        <BigButton
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default NewTopic;