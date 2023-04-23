import { Input, ListSwitch } from "<>"
import { GlobalContext } from "@/Context/GlobalContext";
import api from "@/Utils/api";
import {Form, Formik, FormikHelpers} from "formik"
import { ChangeEvent, useContext } from "react"
import { useNavigate } from "react-router-dom";
import {array, object, string} from "yup"
const NewUser = () =>{
    const navigate = useNavigate()
    const {allPermissions} = useContext(GlobalContext);
    const initialValues = {
        name: "",
        email:"",
        password: "",
        permissions: []
    }
    const validation = object({
        name: string().required("é um campo obrigatório"),
        email: string().email("Precisa ser um email").required("É um campo obrigatório"),
        password: string().required("É um campo obrigatório"),
        permissions: array().min(1, "Selecione ao menos uma permissão").required("Selecione ao menos uma permissão")

    })
    const handleSubmit = async (values:typeof initialValues, {setSubmitting}:FormikHelpers<typeof initialValues>) => {
        try{
            const res = await api.post("/api/users", values)
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
                    <b>Criar usuário:</b>
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
                            placeholder="Digite o nome do novo usuário"
                            name="name"
                            value={values.name}
                            onChange={handleChange("name")}
                            error={errors.name}
                        />
                        <Input
                            label="E-mail"
                            placeholder="Digite o email do novo usuário"
                            name="email"
                            value={values.email}
                            onChange={handleChange("email")}
                            error={errors.email}
                        />
                        <Input
                            label="Senha"
                            placeholder="Digite a senha do novo usuário"
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
                        >Criar Usuário</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default NewUser;