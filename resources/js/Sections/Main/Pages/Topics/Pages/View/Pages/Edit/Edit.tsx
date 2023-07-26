import { BigButton, Input, PageSpinner, Select } from "<>"
import { titleHandler } from "@/Utils";
import api from "@/Utils/api"
import { Form, Formik, FormikHelpers } from "formik"
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { object, string} from "yup"
export default function EditTopicRootInfo(){
    const navigate = useNavigate()
    const {id, infoid} = useParams()
    titleHandler(`Editar Informação Raiz ${infoid} do tópico ${id}`)
    const {data, isFetching} = useQuery("getTopicRootInfo", async ()=>await api.get(`/api/topics/${id}/${infoid}`))
    const initialValues = {
        info: data?.data.info,
        type: data?.data.type,
    }
    const validation = object({
        info: string().required("é um campo obrigatório"),
        type: string().required("é um campo obrigatório"),
    })
    const handleSubmit = async (values:typeof initialValues, {setSubmitting}:FormikHelpers<typeof initialValues>) => {
        try{
            await api.put(`/api/topics/${id}/${infoid}`, values)
            navigate(`/topicos/${id}`)
        } catch(err){
            alert("Erro na criação!")
        }
        setSubmitting(false)

    }
    return(
        <div>
            <header className="text-2xl">
                <h1>
                    <b>Editar Informação raiz: {id}</b>
                </h1>
            </header>
            {isFetching
            ? 
                <PageSpinner/> 
            :
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
                                error={errors.type as string}
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
            }
        </div>
    )
}