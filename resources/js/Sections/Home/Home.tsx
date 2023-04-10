import React, { useContext, useReducer } from 'react';
import RootContext from './Contexts/RootContext';
import Square from './Template/Square/Square';
import { BiErrorAlt } from 'react-icons/all';

const Home = () => {
    return (
        <div className='grid content-start gap-2'>
            <header className="text-2xl">
                <span>Bem vindo, </span>
                <b>usuário!</b>
            </header>
            <div className="grid content-start gap-inherit">
                <h3>Acesso rápido:</h3>
                <div className='grid grid-cols-3'>
                    <Square
                        title={
                            <>
                                <BiErrorAlt className='text-red-500'/>
                                <span className=''>Erros</span>
                            </>
                        }
                        to="erros"
                    >
                        asd
                    </Square>
                </div>
            </div>
        </div>
    )
}
export default Home