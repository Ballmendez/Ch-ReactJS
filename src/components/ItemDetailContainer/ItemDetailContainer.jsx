import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);
        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then(response => {
                if (response.exists()) {
                    setProduct({ id: response.id, ...response.data() });
                } else {
                    setProduct(null);
                }
            })
            .catch(error => console.error("Error al obtener detalle:", error))
            .finally(() => setLoading(false));
    }, [itemId]);

    if (loading) return <Loader />;
    if (!product) return <h2 className="container">El producto no existe.</h2>;

    return (
        <main className="container">
            <ItemDetail {...product} />
        </main>
    );
};

export default ItemDetailContainer;