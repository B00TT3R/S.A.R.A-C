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