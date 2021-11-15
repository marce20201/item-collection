import React, { useContext } from 'react';
import {CartContext} from './../../context/CartContext'
import {Table} from 'react-bootstrap'
import {ImCross} from 'react-icons/im'
import swal from 'sweetalert'
import "./Cart.css";


function Cart() {
    const {cartList, guardarItem,removeItem,costoTotal,cleanList}= useContext(CartContext)
    console.log(guardarItem)


    const compraRealizada = ()=>{
        swal({
            title:`Compra realizada por $${costoTotal()}, Muchas gracias`,
            icon:"success",
            timer:"5000",
            button: false,

        })
        cleanList()
    }

    return (
        <>
        <h2>Carrito de compras</h2>
        {cartList.length === 0?

            <p>El carrito esta vacio</p>

        :
            <div>
                <button className="btn-vaciar-finalizar" onClick={cleanList}>Vaciar Carrito</button>
            <Table size="sm">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Total</th>
                </tr>
                </thead>
                <tbody>
                {cartList.map(item => 
                    <tr key = {item.item.id}>
                        <td><img src={item.item.imgDir} width='30px' height='40px' alt="" /><p>{item.item.nombre}</p></td>
                        <td>{item.itemQ}</td>
                        <td>${item.item.precio}</td>
                        <td><ImCross className="remove"onClick={()=>{removeItem(item)}}/></td> 
                    </tr>
                )}
                    <tr>
                        {`Total a pagar : $${costoTotal()}`} 
                    </tr>
                </tbody>
                <button className="btn-vaciar-finalizar" onClick={compraRealizada}>Realizar compra</button>
                </Table>
            </div>
            
        
        }
            
            
            
        </>
        
    )
}

export default Cart
