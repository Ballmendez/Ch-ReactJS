import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext);

    return (
        <Link to="/cart" className="cart-widget">
            🛒
            {totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
        </Link>
    );
};

export default CartWidget;