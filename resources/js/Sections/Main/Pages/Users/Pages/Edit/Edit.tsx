import { Input, ListSwitch, PageSpinner } from "<>"
import { GlobalContext } from "@/Context/GlobalContext";
import { titleHandler, api } from "@/Utils";
import {Form, Formik, FormikHelpers} from "formik"
import { ChangeEvent, useContext } from "react"
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {array, object, string} from "yup"
const EditUser = () =>{
    const {id} = useParams();
    titleHandler(`Editar usuário ${id}`)
    const navigate = useNavigate()
    const {data, isFetching, error} =useQuery("getUserData", async ()=>await api.get(`/api/users/${id}`))
    const {allPermissions} = useContext(GlobalContext);
    const initialValues = {
        name: data?.data.name,
        email:data?.data.email,
        password: "",
        permissions: data?.data.permissions
    }
    const validation = object({
        name: string().required("é um campo obrigatório"),
        email: string().email("Precisa ser um email").required("É um campo obrigatório"),
        password: string().required("É um campo obrigatório"),
        permissions: array().min(1, "Selecione ao menos uma permissão").required("Selecione ao menos uma permissão")

    })
    const handleSubmit = async (values:typeof initialValues, {setSubmitting}:FormikHelpers<typeof initialValues>) => {
        try{
            const res = await api.post(`/api/users/${id}`, values)
            navigate("/usuarios")
        } catch(err){
            alert("Erro na criação!")
        }
        setSubmitting(false)
    }
    return(
        <div>
            <header className="text-2xl">
                <h1>
                    <b>Editar usuário: {id}</b>
                </h1>
            </header>
            {isFetching
            ?
                <PageSpinner />
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
                            <Input
                                label="Nome"
                                placeholder="Digite o nome do usuário"
                                name="name"
                                value={values.name}
                                onChange={handleChange("name")}
                                error={errors.name}
                            />
                            <Input
                                label="E-mail"
                                placeholder="Digite o email do usuário"
                                name="email"
                                value={values.email}
                                onChange={handleChange("email")}
                                error={errors.email}
                            />
                            <Input
                                label="Senha"
                                placeholder="Digite a senha do usuário"
                                name="password"
                                value={values.password}
                                onChange={handleChange("password")}
                                error={errors.password}
                            />
                            <ListSwitch
                                keys={allPermissions}
                                values={values.permissions}
                                onChange={(e)=>handleChange("permissions")(e as ChangeEvent<any>)}
                                error={errors.permissions}
                            />
                            <button
                                className="bg-black rounded hover:bg-gray-800 text-white p-2 hover:ring-2 ring-black transition-all duration-300 disabled:bg-gray-700"
                                disabled={isSubmitting}
                                type="submit"
                            >Editar Usuário</button>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    )
}
export default EditUser;