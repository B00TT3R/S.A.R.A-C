import React, { useState } from 'react'
import { Input } from '@/Components';
import api from '@/Utils/api';
import { useNavigate } from 'react-router-dom';
import { PageSpinner } from '<>'
import { useQuery } from 'react-query';

export default function Logout() {
    const navigate = useNavigate()
    const {data, isFetching} = useQuery('logout', async ()=> {
        await api.post('/api/logout')
        navigate('/login')
    })

    return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        {
            isFetching && <PageSpinner label="Deslogando, aguarde..."/>
        }     
    </div>
    )
}
