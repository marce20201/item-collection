import React,{useEffect , useState} from 'react'
import ItemDetail from './ItemDetail/ItemDetail'
import { useParams } from "react-router-dom";
import { getFirestore } from './../../../../../services/firebaseService.js';

import './ItemDetailContainer.css'



function ItemDetailContainer() {
    const [item, setItem]=useState([])
    const {id}=useParams()

    useEffect(() => {

        const dbQuery = getFirestore()
        dbQuery.collection('items').doc(id).get()
        .then(respuesta => setItem({...respuesta.data(), id: respuesta.id}))

    }, [])



    
    return (
        <>
        <div className='detail-container'>
            <h2 className="detalle-tit">Detalles del Producto Seleccionado</h2>
                <ItemDetail item={item} />  {/*paso mi estado "item" a ItemDetail */}
        </div>
            
        </>
    )
}   

export default ItemDetailContainer
