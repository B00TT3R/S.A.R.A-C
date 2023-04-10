import React, { useContext, useReducer } from 'react';
import RootContext from './Contexts/RootContext';
import Square from './Template/Square/Square';
import { BiErrorAlt } from 'react-icons/all';
import { useQuery } from 'react-query';
import axios from 'axios';
import Errors from './Template/Cards/Errors';
import Generations from './Template/Cards/Generations';

const Home = () => {
    
    return (
        <div className='grid content-start gap-2'>
            <header className="text-2xl">
                <span>Bem vindo, </span>
                <b>usuário!</b>
            </header>
            <div className="grid content-start gap-inherit">
                <h3>Acesso rápido:</h3>
                <div className='grid sm:grid-cols-3 gap-2'>
                    <Errors/>
                    <Generations/>
                    
                </div>
            </div>
        </div>
    )
}
export default Home