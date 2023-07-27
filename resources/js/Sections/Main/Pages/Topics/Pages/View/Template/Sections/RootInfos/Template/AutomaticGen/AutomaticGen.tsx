import { Input, PageSpinner, Switch } from "@/Components";
import { classNames } from "@/Utils";
import api from "@/Utils/api";
import { Transition } from "@headlessui/react";
import { Form, Formik, FormikHelpers } from "formik";
import {ChangeEvent} from 'react'
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";

export default function AutomaticGen(){
    const {id} = useParams()
    const {data, isFetching} = useQuery("getTopicGenInfo", async ()=>await api.get(`/api/topics/${id}/autogen`))
    const initialValues = {
        generate: data?.data.generate,
        frequency: data?.data.frequency,
    }
    const handleSubmit = async (
        values:typeof initialValues,
        {setSubmitting}:FormikHelpers<any>) => 
    {
        await api.patch(`/api/topics/${id}/autogen`, values)
        setSubmitting(false)
    }
    return(
        <>
        {isFetching
        ?
            <PageSpinner/>
        :
            <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            
            >
                {({values, handleChange, isSubmitting})=>
                (
                    <Form className="grid w-full justify-start gap-2">
                        <Switch
                            name="generate"
                            label="Geração automática"
                            checked={!!values.generate}
                            onChange={(e)=>handleChange("generate")({target:{value: e}} as ChangeEvent<any>)}
                            disabled={isSubmitting}
                        />
                        <Transition
                            show={!!values.generate}
                            enterFrom="opacity-5 -translate-y-7 h-0"
                            enterTo="opacity-100 h-16"
                            leaveFrom="opacity-100 h-16"
                            leaveTo="opacity-5 -translate-y-7 h-0"
                            className="transition-all mb-0.5"
                        >
                            <Input
                                name="frequency"
                                type="number"
                                label="Digite a frequencia de geração (em minutos)"
                                disabled={isSubmitting}
                                onChange={handleChange("frequency")}
                                value={values.frequency}
                            />
                        </Transition>
                        <button 
                            type="submit"
                            className={classNames(
                                " rounded p-1.5 text-white dark:text-black w-24 transition-all ",
                                isSubmitting ? "bg-gray-700 dark:bg-gray-300" : "bg-black dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300"
                            )}
                            disabled={isSubmitting}
                        >
                            Enviar
                        </button>
                    </Form>
                )}
            </Formik>
        }
        </>
    )
}