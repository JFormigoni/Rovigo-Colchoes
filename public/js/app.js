import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Configure Firebase (substitua com suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyCLCV-n4hyy5MWI0NcuEiKjJNgn9-pcytQ",
  authDomain: "rovigo-colchoes-2.firebaseapp.com",
  projectId: "rovigo-colchoes-2",
  storageBucket: "rovigo-colchoes-2.firebasestorage.app",
  messagingSenderId: "1095448555377",
  appId: "1:1095448555377:web:cd7e80d4ca3287eba3d0d0",
  measurementId: "G-78FBVQ3C6D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Carregar produtos em destaque
async function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-grid');
    
    try {
        const q = query(
            collection(db, 'produtos'),
            where('destaque', '==', true),
            where('estoque', '==', true)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            featuredGrid.innerHTML = '<p>Nenhum produto em destaque no momento.</p>';
            return;
        }
        
        featuredGrid.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const produto = doc.data();
            const card = createProductCard(produto);
            featuredGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        featuredGrid.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}

function createProductCard(produto) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const hasPromo = produto.promocao && produto.precoPromocional;
    
    card.innerHTML = `
        <img src="${produto.imagem || 'https://via.placeholder.com/300x250?text=Sem+Imagem'}" alt="${produto.nome}">
        <div class="product-info">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao.substring(0, 80)}...</p>
            <div class="price-container">
                ${hasPromo ? 
                    `<span class="original-price">R$ ${produto.preco.toFixed(2)}</span>
                     <span class="promo-price">R$ ${produto.precoPromocional.toFixed(2)}</span>` :
                    `<span class="price">R$ ${produto.preco.toFixed(2)}</span>`
                }
            </div>
            ${hasPromo ? '<span class="badge badge-promo">PROMOÇÃO</span>' : ''}
        </div>
    `;
    
    card.addEventListener('click', () => {
        window.location.href = 'produtos.html';
    });
    
    return card;
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadFeaturedProducts);
