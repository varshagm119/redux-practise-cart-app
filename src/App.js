import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { uiActions } from "./store/ui-slice";
import { useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart);
  let isInitial = true;
  const notification = useSelector((state) => state.ui.notification);


  useEffect(() => {
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() => {
    if(cart.changed){
      dispatch(sendCartData(cart))

    }
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
