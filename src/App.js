import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

function App() {
  const showCart = useSelector(state => state.ui.isCartVisible)
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
