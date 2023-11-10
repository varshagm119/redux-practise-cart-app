import React, { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { uiActions } from './store/ui-slice';
import { useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.isCartVisible);
  const cart = useSelector(state => state.cart);
  let isInitial = true;
  const notification = useSelector(state => state.ui.notification)
  useEffect(()=>{
    const sendCartData = async() => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data'
      }))
     const response =await fetch('https://redux-practise-app-cart-default-rtdb.firebaseio.com/cart.json',{
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      if(!response.ok){
        throw new Error("Sending cart data failed.")
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success...',
        message: 'Sent cart data successfully'
      }))

    }
    if(isInitial){
      isInitial=false;
      return;
    }
   sendCartData().catch((error) => {
    dispatch(uiActions.showNotification({
      status: 'error',
      title: 'Error...',
      message: 'Sending cart data failed'
    }))
   } )
  },[cart, dispatch])
  return (
    <React.Fragment>
      {notification && <Notification status={notification.status}
      title={notification.title}
      message={notification.message}/>}
      <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </React.Fragment>
    
  );
}

export default App;
