import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Checkout = () => {
    const [buyer, setBuyer] = useState({
        name: '',
        phone: '',
        email: '',
        emailConfirm: ''
    });
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { cart, total, clearCart } = useContext(CartContext);

    const handleInputChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        });
    };

    const handleConfirmOrder = async (e) => {
        e.preventDefault();
        setError('');

        if (!buyer.name || !buyer.phone || !buyer.email) {
            setError('Por favor completa todos los campos.');
            return;
        }

        if (buyer.email !== buyer.emailConfirm) {
            setError('Los correos electrónicos no coinciden.');
            return;
        }

        setLoading(true);

        const order = {
            buyer: {
                name: buyer.name,
                phone: buyer.phone,
                email: buyer.email
            },
            items: cart.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity
            })),
            total: total(),
            date: serverTimestamp()
        };

        try {
            const ordersRef = collection(db, 'orders');
            const docRef = await addDoc(ordersRef, order);
            setOrderId(docRef.id);
            clearCart();
        } catch (err) {
            console.error('Error al crear la orden:', err);
            setError('Hubo un problema al procesar la orden. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (orderId) {
        return (
            <div style={{ textAlign: 'center', margin: '3rem auto', maxWidth: '600px', padding: '2rem', background: 'var(--card-bg)', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
                <h2>¡Gracias por tu compra!</h2>
                <p style={{ margin: '1rem 0' }}>Tu pedido se ha registrado correctamente.</p>
                <p>Tu código de seguimiento es: <strong>{orderId}</strong></p>
                <Link to="/" className="btn-primary" style={{ marginTop: '1.5rem', inlineSize: 'fit-content' }}>
                    Volver al inicio
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', margin: '3rem auto' }}>
                <h2>El carrito está vacío</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>
                    Ver productos
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Finalizar Compra</h1>

            <div className="detail-card" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                    <h3>Resumen del Pedido</h3>
                    <div style={{ marginTop: '1rem' }}>
                        {cart.map((prod) => (
                            <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                <span>{prod.title} (x{prod.quantity})</span>
                                <strong>${prod.price * prod.quantity}</strong>
                            </div>
                        ))}
                    </div>
                    <h3 style={{ marginTop: '1.5rem', textAlign: 'right', color: 'var(--primary-color)' }}>
                        Total: ${total()}
                    </h3>
                </div>

                <div>
                    <h3>Datos del Comprador</h3>
                    <form onSubmit={handleConfirmOrder} className="checkout-form" style={{ maxWidth: '100%' }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre y Apellido"
                            value={buyer.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Teléfono"
                            value={buyer.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={buyer.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="emailConfirm"
                            placeholder="Confirmar Correo electrónico"
                            value={buyer.emailConfirm}
                            onChange={handleInputChange}
                            required
                        />

                        {error && <p style={{ color: 'var(--accent-red)', fontSize: '0.9rem' }}>{error}</p>}

                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                            Confirmar Orden
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;