import { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        if (count < stock) setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) setCount(count - 1);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '10px' }}>
            {/* Selector con alineación exacta */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: '#f9fafb',
                height: '38px',
                padding: '0 8px',
                boxSizing: 'border-box'
            }}>
                <button
                    onClick={decrement}
                    disabled={count <= 1 || stock === 0}
                    style={{
                        minWidth: '32px',
                        height: '100%',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: count <= 1 || stock === 0 ? 'not-allowed' : 'pointer',
                        opacity: count <= 1 || stock === 0 ? 0.3 : 1,
                        padding: 0
                    }}
                >
                    -
                </button>

                <span style={{
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#111827'
                }}>
                    {count}
                </span>

                <button
                    onClick={increment}
                    disabled={count >= stock || stock === 0}
                    style={{
                        minWidth: '32px',
                        height: '100%',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: count >= stock || stock === 0 ? 'not-allowed' : 'pointer',
                        opacity: count >= stock || stock === 0 ? 0.3 : 1,
                        padding: 0
                    }}
                >
                    +
                </button>
            </div>

            {/* Botón principal */}
            <button
                onClick={() => onAdd(count)}
                disabled={stock === 0}
                style={{
                    backgroundColor: stock === 0 ? '#d1d5db' : '#c86400',
                    color: '#ffffff',
                    border: 'none',
                    height: '38px',
                    borderRadius: '6px',
                    cursor: stock === 0 ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }}
            >
                {stock === 0 ? 'Sin Stock' : 'Agregar al carrito'}
            </button>
        </div>
    );
};

export default ItemCount;