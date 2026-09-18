import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

const ItemDetail = ({ id, title, price, pictureUrl, stock, category, description }) => {
    const { addItem } = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        const itemToAdd = { id, title, price, pictureUrl, stock, category };
        addItem(itemToAdd, quantity);
    };

    return (
        <div style={{ width: '100%', minHeight: 'calc(100vh - 120px)', padding: '40px 20px', boxSizing: 'border-box' }}>
            <article style={{
                display: 'flex',
                gap: '40px',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                padding: '40px',
                borderRadius: '12px',
                maxWidth: '1000px',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
            }}>
                {/* Lado Izquierdo: Imagen Amplia */}
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={pictureUrl}
                        alt={title}
                        style={{
                            width: '100%',
                            maxHeight: '420px',
                            objectFit: 'contain',
                            borderRadius: '8px'
                        }}
                    />
                </div>

                {/* Lado Derecho: Información Completa */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                        {title}
                    </h1>

                    <p style={{ color: '#6b7280', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                        Categoría: {category}
                    </p>

                    <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                        {description}
                    </p>

                    <p style={{ color: '#c86400', fontSize: '32px', fontWeight: 'bold', margin: '8px 0' }}>
                        ${price}
                    </p>

                    <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                        Stock disponible: {stock}
                    </p>

                    {/* Selector y Botón de compra */}
                    <div style={{ marginTop: '12px' }}>
                        <ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ItemDetail;