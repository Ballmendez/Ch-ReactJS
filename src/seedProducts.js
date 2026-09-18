import { db } from './services/firebase/config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const products = [
    // --- AERÓFONOS Y CUERDAS ORIGINARIAS ---
    {
        title: 'Charango Profesional de Naranjillo',
        description: 'Charango autóctono tallado en madera de naranjillo, 10 cuerdas y excelente afinación.',
        price: 135000,
        stock: 6,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Quena Autóctona de Bambú',
        description: 'Quena andina tradicional afinada en Sol (G), elaborada artesanalmente en bambú seleccionado.',
        price: 45000,
        stock: 12,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1573871669414-010dbf73ca84?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Siku / Zampoña de Caña',
        description: 'Zampoña de doble hilera de cañas bambú, afinación tradicional andina.',
        price: 68000,
        stock: 9,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Quenacho en Re (D)',
        description: 'Aerófono andino de mayor dimensión que la quena tradicional, con tono grave y registro profundo.',
        price: 58000,
        stock: 8,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Antara de Cerámica Autóctona',
        description: 'Zampoña recta de una sola hilera construida en barro cocido artesanal.',
        price: 74000,
        stock: 5,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Erke Quebradeño Tradicional',
        description: 'Instrumento de gran longitud construido con caña y pabellón de cuerno vacuno.',
        price: 110000,
        stock: 3,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Erkencho de Cuerno y Caña',
        description: 'Aerófono de viento con lengüeta de caña y pabellón de cuerno natural.',
        price: 42000,
        stock: 10,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=600&q=80'
    },

    // --- CUERDAS FOLKLÓRICAS ---
    {
        title: 'Guitarra Criolla de Concierto',
        description: 'Guitarra de estudio construida en pino abeto y algarrobo, tiro tradicional folklórico.',
        price: 195000,
        stock: 5,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Ronroco Profesional',
        description: 'Hermano mayor del charango, afinado una cuarta más baja. Sonido profundo y envolvente.',
        price: 175000,
        stock: 4,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Cuatro Venezolano / Llanero',
        description: 'Instrumento de 4 cuerdas de nylon ideal para joropo y rasgueos folklóricos.',
        price: 145000,
        stock: 4,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Tiple Colombiano / Andino',
        description: 'Instrumento de 12 cuerdas metálicas agrupadas en 4 órdenes triples.',
        price: 220000,
        stock: 2,
        category: 'cuerdas-madera',
        pictureUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80'
    },

    // --- PARCHES Y PERCUSIÓN ---
    {
        title: 'Bombo Legüero Autóctono',
        description: 'Bombo legüero santiagueño construido en tronco de ceibo con parches de cuero.',
        price: 160000,
        stock: 4,
        category: 'parches-percusion',
        pictureUrl: 'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Caja Coplera Vallista',
        description: 'Caja coplera artesanal con chirlera y mazo de madera wrapped en lana.',
        price: 52000,
        stock: 7,
        category: 'parches-percusion',
        pictureUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Udu Drum de Arcilla',
        description: 'Vasija de percusión de origen africano/sudamericano con agujero lateral.',
        price: 89000,
        stock: 6,
        category: 'parches-percusion',
        pictureUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Chajchas de Pezuñas de Llama',
        description: 'Sonajero ancestral confeccionado con pezuñas cosidas sobre cinta tejida a mano.',
        price: 18000,
        stock: 20,
        category: 'parches-percusion',
        pictureUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Palo de Lluvia de Cactus (1 metro)',
        description: 'Efecto de sonido de lluvia elaborado con esqueleto seco de cactus y espinas internas.',
        price: 35000,
        stock: 15,
        category: 'parches-percusion',
        pictureUrl: 'https://images.unsplash.com/photo-1573871669414-010dbf73ca84?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Pandeiro Folklórico de Madera',
        description: 'Pandeiro con cuerpo de madera nativa, parche de cuero de cabra y sonajas de bronce.',
        price: 64000,
        stock: 8,
        category: 'parches-percusion',
        pictureUrl: 'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=600&q=80'
    },

    // --- ESTUDIO Y SESIONES ---
    {
        title: 'Micrófono Condenser de Estudio',
        description: 'Captador de condensador de gran diafragma para grabación de acústicos y voces.',
        price: 210000,
        stock: 3,
        category: 'estudio-sesiones',
        pictureUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Interfaz de Audio para Estudio 2x2',
        description: 'Placa de sonido USB de 2 canales con preamps de bajo ruido para instrumentistas.',
        price: 180000,
        stock: 5,
        category: 'estudio-sesiones',
        pictureUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Auriculares de Monitoreo Cerrados',
        description: 'Auriculares profesionales con aislamiento acústico para grabación de voces e instrumentos.',
        price: 98000,
        stock: 7,
        category: 'estudio-sesiones',
        pictureUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
    }
];

export const populateFirestore = async () => {
    try {
        const productsRef = collection(db, 'products');

        // 1. Limpiar la colección previa
        const snapshot = await getDocs(productsRef);
        for (const document of snapshot.docs) {
            await deleteDoc(doc(db, 'products', document.id));
        }

        // 2. Cargar los 20 productos actualizados
        for (const product of products) {
            await addDoc(productsRef, product);
        }
        console.log('¡Catálogo de 20 productos e imágenes actualizado exitosamente!');
    } catch (error) {
        console.error('Error al actualizar productos:', error);
    }
};