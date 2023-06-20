import React, { useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik';
import { string, object } from 'yup'
import { Input } from '@/Components';
import api from '@/Utils/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState<string|undefined>()
    const handleSubmit = async (values:typeof initial, {setSubmitting}:FormikHelpers<typeof initial>) => {
        try{
            const response = await api.post('/api/login', values)
            localStorage.setItem('token', response.data.token)
            api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token
            localStorage.setItem('userName', response.data.name)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('permissions', JSON.stringify(response.data.permissions))
            navigate('/')

        } catch (error){
            if(api.isAxiosError(error) && error.response?.status == 401){
                setError(error.response.data.message)
            }
        }
        setSubmitting(false)
    }
    const initial = {
        email: "",
        password: ""
    }
    const validation = object({
        email: string().email("Precisa ser um email").required("É um campo obrigatório"),
        password: string().required("É um campo obrigatório")
    })
    return (
        <main className='w-full h-screen flex flex-col justify-center items-center bg-gray-100'>
            <Formik 
                onSubmit={handleSubmit}
                initialValues={initial}
                validationSchema={validation}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({
                    handleChange,
                    errors,
                    isSubmitting
                }) => (
                    <Form
                        className='w-80 sm:w-96 border-2 bg-white rounded-md shadow-md shadow-gray-300 p-3 items-center flex flex-col gap-4'
                    >
                        <div className='text-center'>
                            <h1 className="text-3xl">
                                S.A.R.A
                            </h1>
                            <h1 className="text-2xl">
                                Login
                            </h1>
                        </div>
                        <Input
                            onChange={handleChange('email')}
                            name="email"
                            label='Email'
                            placeholder='Digite o Email'
                            error={errors.email}
                        />
                        <Input
                            onChange={handleChange('password')}
                            name="password"
                            type='password'
                            label='Senha'
                            placeholder='Digite a senha'
                            error={errors.password}
                        />
                        {error && 
                            <span className='text-red-600'>
                                {error}
                            </span>
                        }
                        <button type="submit" className='bg-black rounded text-white p-2 disabled:bg-gray-500' disabled={isSubmitting}>Enviar</button>
                    </Form>
                )}
                
            </Formik>

        </main>
    )
}
