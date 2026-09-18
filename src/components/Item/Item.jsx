import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

const Item = ({ id, title, price, pictureUrl, stock, category }) => {
    const { addItem } = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        const itemToAdd = { id, title, price, pictureUrl, stock, category };
        addItem(itemToAdd, quantity);
    };

    return (
        <article style={{
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
        }}>
            <img
                src={pictureUrl}
                alt={title}
                style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '12px' }}
            />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '6px' }}>{title}</h3>
            <p style={{ color: '#c86400', fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>${price}</p>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>Stock disponible: {stock}</p>

            <ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />

            <Link to={`/item/${id}`} style={{ display: 'inline-block', marginTop: '10px', color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>
                Ver detalle completo
            </Link>
        </article>
    );
};

export default Item;