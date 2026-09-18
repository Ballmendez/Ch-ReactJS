const CartItem = ({ id, name, price, quantity, removeItem }) => {
    return (
        <div className="cart-item">
            <h4>{name}</h4>
            <p>Cantidad: {quantity}</p>
            <p>Precio Unitario: ${price}</p>
            <p>Subtotal: ${price * quantity}</p>
            <button onClick={() => removeItem(id)}>Eliminar</button>
        </div>
    );
};

export default CartItem;