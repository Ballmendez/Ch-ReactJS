import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
    const { cart, removeItem, updateQuantity, clearCart, totalPrice } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <h2 style={{ fontSize: '24px', color: '#111827' }}>Tu carrito está vacío</h2>
                <p style={{ color: '#6b7280', margin: '12px 0 24px' }}>
                    ¿Aún no te decidiste? Explora nuestros productos folklóricos.
                </p>
                <Link
                    to="/"
                    style={{
                        backgroundColor: '#c86400',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Ir al catálogo
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
                Tu Carrito
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cart.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'space-between',
                            backgroundColor: '#ffffff',
                            padding: '16px 20px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                            gap: '16px'
                        }}
                    >
                        {/* Imagen + Título */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '2' }}>
                            <img
                                src={product.pictureUrl}
                                alt={product.title}
                                style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px' }}
                            />
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px', color: '#111827' }}>
                                    {product.title}
                                </h3>
                                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                                    Precio un: ${product.price}
                                </p>
                            </div>
                        </div>

                        {/* Contador Editable */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            backgroundColor: '#f9fafb',
                            height: '36px',
                            padding: '0 8px'
                        }}>
                            <button
                                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                disabled={product.quantity <= 1}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: product.quantity <= 1 ? 'not-allowed' : 'pointer',
                                    opacity: product.quantity <= 1 ? 0.3 : 1,
                                    padding: '0 8px'
                                }}
                            >
                                -
                            </button>

                            <span style={{ fontWeight: 'bold', fontSize: '15px', padding: '0 12px', color: '#111827' }}>
                                {product.quantity}
                            </span>

                            <button
                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                disabled={product.quantity >= product.stock}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: product.quantity >= product.stock ? 'not-allowed' : 'pointer',
                                    opacity: product.quantity >= product.stock ? 0.3 : 1,
                                    padding: '0 8px'
                                }}
                            >
                                +
                            </button>
                        </div>

                        {/* Subtotal */}
                        <div style={{ flex: '1', textAlign: 'right' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#c86400' }}>
                                ${product.price * product.quantity}
                            </span>
                        </div>

                        {/* Botón Eliminar */}
                        <button
                            onClick={() => removeItem(product.id)}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#ef4444',
                                border: '1px solid #fca5a5',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '13px'
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            {/* Resumen Final */}
            <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '2px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>
                    Total de la compra: ${totalPrice}
                </h2>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                        onClick={clearCart}
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#ef4444',
                            border: '1px solid #ef4444',
                            padding: '12px 20px',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Vaciar Carrito
                    </button>

                    <Link
                        to="/checkout"
                        style={{
                            backgroundColor: '#c86400',
                            color: '#ffffff',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            textDecoration: 'none'
                        }}
                    >
                        Finalizar Compra
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;