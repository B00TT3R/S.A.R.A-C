import { BigButton, Input, Select } from "<>"
import { titleHandler } from "@/Utils";
import api from "@/Utils/api"
import {Form, Formik, FormikHelpers} from "formik"
import { useNavigate } from "react-router-dom";
import { object, string} from "yup"
const NewUser = () =>{
    titleHandler(`Criar Informação Raiz`)
    const navigate = useNavigate()
    const initialValues = {
        info: "",
        type:"",
    }
    const validation = object({
        info: string().required("é um campo obrigatório"),
        type: string().required("é um campo obrigatório"),
    })
    const handleSubmit = async (values:typeof initialValues, {setSubmitting}:FormikHelpers<typeof initialValues>) => {
        try{
            const res = await api.post("/api/rootInfos", values)
            navigate("/inforaiz")
        } catch(err){
            alert("Erro na criação!")
        }
        setSubmitting(false)

    }
    return(
        <div>
            <header className="text-2xl">
                <h1>
                    <b>Criar Informação raiz:</b>
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
                        <Select
                            label="Tipo"
                            value={values.type}
                            onChange={handleChange("type")}
                            error={errors.type}
                        >
                            <option value="" label="Selecione um valor"/>
                            <option value="text" label="Estilo de Texto"/>
                            <option value="textinfo" label="Informação Chave"/>
                            <option value="image" label="Estilo de Imagem"/>
                        </Select>
                        <Input
                            label="Informação"
                            placeholder="Digite a Informação"
                            name="info"
                            value={values.info}
                            onChange={handleChange("info")}
                            error={errors.info}
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
export default NewUser;