import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [buyer, setBuyer] = useState({
        name: '',
        phone: '',
        email: '',
        emailConfirm: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
    });
    const [error, setError] = useState('');

    const { cart, totalPrice, clearCart } = useContext(CartContext);

    // Obtener el valor numérico según si totalPrice es función o número
    const totalAmount = typeof totalPrice === 'function' ? totalPrice() : totalPrice;

    const handleInputChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const createOrder = async (e) => {
        e.preventDefault();
        setError('');

        if (buyer.email !== buyer.emailConfirm) {
            setError('Los correos electrónicos no coinciden.');
            return;
        }

        setLoading(true);

        const orderObj = {
            buyer: {
                name: buyer.name,
                phone: buyer.phone,
                email: buyer.email,
                address: buyer.address,
                city: buyer.city,
                postalCode: buyer.postalCode,
                notes: buyer.notes
            },
            items: cart.map(item => ({
                id: item.id,
                title: item.title || item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: totalAmount,
            date: Timestamp.fromDate(new Date())
        };

        try {
            const ordersRef = collection(db, 'orders');
            const orderAdded = await addDoc(ordersRef, orderObj);
            setOrderId(orderAdded.id);
            clearCart();
        } catch (err) {
            console.error("Error al generar la orden:", err);
            setError("Ocurrió un error al procesar tu compra. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.65rem 0.8rem',
        fontSize: '0.9rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        outline: 'none',
        boxSizing: 'border-box'
    };

    if (loading) return <Loader />;

    if (orderId) {
        return (
            <main className="container" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
                <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                    <span style={{ fontSize: '3.5rem' }}>🎉</span>
                    <h2 style={{ margin: '1rem 0 0.5rem' }}>¡Gracias por tu compra!</h2>
                    <p style={{ color: '#666' }}>Tu pedido fue registrado con éxito.</p>
                    <div style={{ margin: '1.5rem 0', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px dashed #ccc' }}>
                        <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem', color: '#555' }}>Código de seguimiento:</p>
                        <strong style={{ fontSize: '1.2rem', color: '#6f42c1' }}>{orderId}</strong>
                    </div>
                    <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
                        Volver al Inicio
                    </Link>
                </div>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="container" style={{ textAlign: 'center', margin: '4rem auto' }}>
                <h2>Tu carrito está vacío 🛒</h2>
                <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>
                    Ir a la Tienda
                </Link>
            </main>
        );
    }

    return (
        <main className="container" style={{ maxWidth: '1050px', margin: '2rem auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Finalizar Compra</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '2.5rem',
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
                {/* Columna Izquierda: Formulario detallado */}
                <div>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📋 Datos del Comprador y Envío
                    </h3>

                    <form onSubmit={createOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {/* Nombre completo */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ej: Baltazar Méndez"
                                value={buyer.name}
                                onChange={handleInputChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        {/* Teléfono y Código Postal */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Ej: 1166631492"
                                    value={buyer.phone}
                                    onChange={handleInputChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                    Código Postal
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Ej: 1752"
                                    value={buyer.postalCode}
                                    onChange={handleInputChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Correos electrónicos */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="correo@ejemplo.com"
                                    value={buyer.email}
                                    onChange={handleInputChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                    Confirmar Correo
                                </label>
                                <input
                                    type="email"
                                    name="emailConfirm"
                                    placeholder="Repite tu correo"
                                    value={buyer.emailConfirm}
                                    onChange={handleInputChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Dirección y Ciudad */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                    Dirección de Envío
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Calle y altura (Ej: Av. Siempreviva 742)"
                                    value={buyer.address}
                                    onChange={handleInputChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                    Ciudad / Localidad
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ej: Buenos Aires"
                                    value={buyer.city}
                                    onChange={handleInputChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Notas Adicionales */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                Notas adicionales para la entrega (Opcional)
                            </label>
                            <input
                                type="text"
                                name="notes"
                                placeholder="Piso, departamento, timbre o aclaraciones"
                                value={buyer.notes}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        {error && (
                            <p style={{ color: '#d9534f', fontSize: '0.85rem', fontWeight: 'bold', margin: '0' }}>
                                ⚠️ {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            style={{
                                marginTop: '0.5rem',
                                padding: '0.9rem',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                backgroundColor: '#5a2d0c',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Confirmar y Pagar
                        </button>
                    </form>
                </div>

                {/* Columna Derecha: Resumen de productos y Total */}
                <div>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
                        🛒 Resumen de Compra
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '320px', overflowY: 'auto', paddingRight: '0.3rem' }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #eee' }}>
                                <div>
                                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>{item.title || item.name}</strong>
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>
                                        {item.quantity} un. × ${item.price}
                                    </span>
                                </div>
                                <strong style={{ color: '#333' }}>
                                    ${item.price * item.quantity}
                                </strong>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '1.2rem', borderTop: '2px dashed #eee', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.95rem' }}>
                            <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} productos):</span>
                            <span>${totalAmount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#28a745', fontSize: '0.95rem', fontWeight: 'bold' }}>
                            <span>Envío:</span>
                            <span>Gratis</span>
                        </div>
                        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0.5rem 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total a pagar:</span>
                            <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#6f42c1' }}>
                                ${totalAmount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckoutForm;