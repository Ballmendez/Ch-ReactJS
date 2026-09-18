import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/config';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';

const categoryTitles = {
    'cuerdas-madera': 'Cuerdas & Madera',
    'parches-percusion': 'Parches & Percusión',
    'estudio-sesiones': 'Estudio & Sesiones',
    'cuerdas': 'Cuerdas & Madera',
    'percusion': 'Parches & Percusión',
    'estudio': 'Estudio & Sesiones'
};

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const productsRef = collection(db, 'products');

        getDocs(productsRef)
            .then((snapshot) => {
                const productsAdapted = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (categoryId) {
                    const filtered = productsAdapted.filter((prod) => {
                        const prodCategory = prod.category ? prod.category.toLowerCase().trim() : '';
                        const urlCategory = categoryId.toLowerCase().trim();

                        return (
                            prodCategory === urlCategory ||
                            (urlCategory === 'cuerdas' && prodCategory.includes('cuerda')) ||
                            (urlCategory === 'percusion' && prodCategory.includes('percu')) ||
                            (urlCategory === 'estudio' && prodCategory.includes('estudio'))
                        );
                    });
                    setProducts(filtered);
                } else {
                    setProducts(productsAdapted);
                }
            })
            .catch((error) => {
                console.error('Error al obtener productos:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    if (loading) {
        return <Loader />;
    }

    const title = categoryId
        ? (categoryTitles[categoryId.toLowerCase()] || categoryId)
        : greeting;

    return (
        <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
                {title}
            </h1>

            {products.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No se encontraron productos en esta categoría.</p>
            ) : (
                <ItemList products={products} />
            )}
        </main>
    );
};

export default ItemListContainer;