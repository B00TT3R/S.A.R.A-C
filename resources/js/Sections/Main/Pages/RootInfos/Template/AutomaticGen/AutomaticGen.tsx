import { Input, PageSpinner, Switch } from "@/Components";
import { classNames } from "@/Utils";
import api from "@/Utils/api";
import { Transition } from "@headlessui/react";
import { Form, Formik, FormikHelpers } from "formik";
import {ChangeEvent} from 'react'
import { useQuery } from "react-query";

export default function AutomaticGen(){
    const {data, isFetching} = useQuery("getGenInfo", async ()=>await api.get("/api/rootInfos/autogen"))
    const initialValues = {
        generate: data?.data.generate,
        frequency: data?.data.frequency,
    }
    const handleSubmit = async (
        values:typeof initialValues,
        {setSubmitting}:FormikHelpers<any>) => 
    {
        await api.post("/api/rootInfos/autogen", values)
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
                            checked={values.generate}
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
                                " rounded p-1.5 text-white w-24 ",
                                isSubmitting ? "bg-gray-700" : "bg-black"
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