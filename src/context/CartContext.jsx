import React, { createContext, useState} from 'react';

export const CartContext = createContext();


export default function UseCartContext({ children }){

  const [cartList, setCartList] = useState([]); // {nombre: nombre, precio:precio,itemQ: qty} 

  function guardarItem(newItem) {
    const index = cartList.findIndex( item => newItem.item.id=== item.item.id) // si no lo encuentra me devuelve -1, si lo encuentra me duelve la posicion 
    
    if (index===-1) { // si no encuentra nada, lo agrega al cartList
      setCartList([...cartList, newItem]) // [...cartList, newItem] para ir agregando nuevos objetos en el cartList y se vayan acumulando
    } else {
      const newQty = cartList[index].itemQ + newItem.itemQ
      const oldList = cartList.filter(old=> old.item.id !== newItem.item.id)
      setCartList([...oldList, {item: newItem.item , itemQ: newQty}])
    }
    
    
  }   
//elimimina un producto del carrito
  const removeItem=(oldItem)=>{
    const oldList = cartList.filter(item=> item.item.id !== oldItem.item.id)
    setCartList(oldList)
  }

  //calcula el costo total
  const costoTotal=()=>{
    return cartList.reduce((acumulador, valor)=>(acumulador + (valor.itemQ*valor.item.precio)),0)
  }


  //limpia la lista de productos en el carrito
  const cleanList= ()=>{
    setCartList([])
  }


  return (
    <CartContext.Provider value={{
        cartList,
        cantidad:cartList.length,
        removeItem,
        costoTotal,
        cleanList,
        guardarItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

