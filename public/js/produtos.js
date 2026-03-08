import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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

let currentProduct = null;
const WHATSAPP_NUMBER = '5547997794812'; // Substitua pelo número real

// Carregar todos os produtos
async function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    try {
        const querySnapshot = await getDocs(collection(db, 'produtos'));
        
        if (querySnapshot.empty) {
            productsGrid.innerHTML = '<p>Nenhum produto disponível no momento.</p>';
            return;
        }
        
        productsGrid.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const produto = { id: doc.id, ...doc.data() };
            const card = createProductCard(produto);
            productsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        productsGrid.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}

function createProductCard(produto) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const hasPromo = produto.promocao && produto.precoPromocional;
    const outOfStock = !produto.estoque;
    
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
            ${outOfStock ? '<span class="badge badge-out">FORA DE ESTOQUE</span>' : ''}
        </div>
    `;
    
    if (!outOfStock) {
        card.addEventListener('click', () => openProductModal(produto));
    }
    
    return card;
}

function openProductModal(produto) {
    currentProduct = produto;
    const modal = document.getElementById('product-modal');
    
    document.getElementById('modal-image').src = produto.imagem || 'https://via.placeholder.com/400x400?text=Sem+Imagem';
    document.getElementById('modal-name').textContent = produto.nome;
    document.getElementById('modal-description').textContent = produto.descricao;
    
    const hasPromo = produto.promocao && produto.precoPromocional;
    if (hasPromo) {
        document.getElementById('modal-price').innerHTML = `<span class="original-price">R$ ${produto.preco.toFixed(2)}</span>`;
        document.getElementById('modal-promo-price').textContent = `R$ ${produto.precoPromocional.toFixed(2)}`;
    } else {
        document.getElementById('modal-price').textContent = `R$ ${produto.preco.toFixed(2)}`;
        document.getElementById('modal-promo-price').textContent = '';
    }
    
    // Preencher cores
    const colorSelect = document.getElementById('color-select');
    colorSelect.innerHTML = '';
    produto.cores.forEach(cor => {
        const option = document.createElement('option');
        option.value = cor;
        option.textContent = cor;
        colorSelect.appendChild(option);
    });
    
    // Preencher tamanhos
    const sizeSelect = document.getElementById('size-select');
    sizeSelect.innerHTML = '';
    produto.tamanhos.forEach(tamanho => {
        const option = document.createElement('option');
        option.value = tamanho;
        option.textContent = tamanho;
        sizeSelect.appendChild(option);
    });
    
    modal.style.display = 'block';
}

function sendWhatsAppMessage() {
    if (!currentProduct) return;
    
    const cor = document.getElementById('color-select').value;
    const tamanho = document.getElementById('size-select').value;
    
    const message = `Olá, tenho interesse no colchão ${currentProduct.nome}.
Cor: ${cor}
Tamanho: ${tamanho}.
Poderia me passar mais informações?`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    whatsappBtn.addEventListener('click', sendWhatsAppMessage);
});
