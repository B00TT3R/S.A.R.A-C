import { titleHandler } from '@/Utils';
import Errors from './Template/Cards/Errors';
import Generations from './Template/Cards/Generations';
import Posts from './Template/Cards/Posts';
import LastPost from './Template/LastPost/LastPost';

const Home = () => {
    titleHandler("Home")
    return (
        <div className='grid content-start gap-2'>
            <header className="text-2xl">
                <span>Bem vindo, </span>
                <b>{localStorage.getItem("userName")}</b>
            </header>
            <div className="grid content-start gap-inherit">
                <h3>Acesso rápido:</h3>
                <div className='grid md:grid-cols-3 gap-2'>
                    <Errors/>
                    <Generations/>
                    <Posts/>
                </div>
            </div>
            <div className="grid content-start gap-inherit">
                <h3>Ultimo Post:</h3>
                <LastPost/>
            </div>
        </div>
    )
}
export default Home