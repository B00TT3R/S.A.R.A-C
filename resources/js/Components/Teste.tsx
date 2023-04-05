import { useContext } from 'react';
import RootContext from '../Context/RootContext';
const Teste = () => {
    const { state, dispatch } = useContext(RootContext);
    return (
        <div onClick={()=>dispatch({type:"toggle"})}>
            {
                state.sidebar? "sidebar aberta" : "sidebar fechada"
            }
        </div>
    )
}
export default Teste