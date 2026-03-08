import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

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
const auth = getAuth(app);
const db = getFirestore(app);

let editingProductId = null;

// Autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        loadProducts();
    } else {
        document.getElementById('login-section').style.display = 'flex';
        document.getElementById('admin-section').style.display = 'none';
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        errorMsg.textContent = '';
    } catch (error) {
        errorMsg.textContent = 'Email ou senha incorretos.';
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth);
});

// Carregar produtos
async function loadProducts() {
    const productsList = document.getElementById('products-list');
    
    try {
        const querySnapshot = await getDocs(collection(db, 'produtos'));
        
        if (querySnapshot.empty) {
            productsList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            return;
        }
        
        productsList.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const produto = { id: doc.id, ...doc.data() };
            const card = createAdminProductCard(produto);
            productsList.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function createAdminProductCard(produto) {
    const card = document.createElement('div');
    card.className = 'admin-product-card';
    
    card.innerHTML = `
        <img src="${produto.imagem || 'https://via.placeholder.com/100?text=Sem+Imagem'}" alt="${produto.nome}">
        <div>
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <p>
                ${produto.promocao ? '<span class="badge badge-promo">PROMOÇÃO</span>' : ''}
                ${produto.destaque ? '<span class="badge" style="background: #3498db; color: white;">DESTAQUE</span>' : ''}
                ${!produto.estoque ? '<span class="badge badge-out">FORA DE ESTOQUE</span>' : ''}
            </p>
        </div>
        <div class="admin-product-actions">
            <button class="btn btn-primary" onclick="editProduct('${produto.id}')">Editar</button>
            <button class="btn btn-danger" onclick="deleteProduct('${produto.id}')">Excluir</button>
        </div>
    `;
    
    return card;
}

// Modal de formulário
document.getElementById('add-product-btn').addEventListener('click', () => {
    editingProductId = null;
    document.getElementById('form-title').textContent = 'Adicionar Produto';
    document.getElementById('product-form').reset();
    document.getElementById('preview-image').style.display = 'none';
    document.getElementById('product-form-modal').style.display = 'block';
});

document.querySelector('.close-form').addEventListener('click', () => {
    document.getElementById('product-form-modal').style.display = 'none';
});

// Editar produto
window.editProduct = async function(productId) {
    editingProductId = productId;
    document.getElementById('form-title').textContent = 'Editar Produto';
    
    try {
        const docRef = doc(db, 'produtos', productId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const produto = docSnap.data();
            
            document.getElementById('product-id').value = productId;
            document.getElementById('nome').value = produto.nome;
            document.getElementById('descricao').value = produto.descricao;
            document.getElementById('preco').value = produto.preco;
            document.getElementById('precoPromocional').value = produto.precoPromocional || '';
            document.getElementById('cores').value = produto.cores.join(', ');
            document.getElementById('imagem-url').value = produto.imagem || '';
            document.getElementById('promocao').checked = produto.promocao;
            document.getElementById('destaque').checked = produto.destaque;
            document.getElementById('estoque').checked = produto.estoque;
            
            // Tamanhos
            document.querySelectorAll('input[name="tamanho"]').forEach(checkbox => {
                checkbox.checked = produto.tamanhos.includes(checkbox.value);
            });
            
            // Preview da imagem
            if (produto.imagem) {
                document.getElementById('preview-image').src = produto.imagem;
                document.getElementById('preview-image').style.display = 'block';
            }
            
            document.getElementById('product-form-modal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
    }
};

// Deletar produto
window.deleteProduct = async function(productId) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
        await deleteDoc(doc(db, 'produtos', productId));
        loadProducts();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        alert('Erro ao deletar produto.');
    }
};

// Salvar produto
document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const precoPromocional = parseFloat(document.getElementById('precoPromocional').value) || null;
    const cores = document.getElementById('cores').value.split(',').map(c => c.trim());
    const promocao = document.getElementById('promocao').checked;
    const destaque = document.getElementById('destaque').checked;
    const estoque = document.getElementById('estoque').checked;
    
    const tamanhos = Array.from(document.querySelectorAll('input[name="tamanho"]:checked'))
        .map(cb => cb.value);
    
    if (tamanhos.length === 0) {
        alert('Selecione pelo menos um tamanho.');
        return;
    }
    
    try {
        // Usar URL da imagem diretamente (sem upload)
        let imagemUrl = document.getElementById('imagem-url').value || null;
        
        // Se não houver URL e estiver editando, manter a imagem anterior
        if (!imagemUrl && editingProductId) {
            imagemUrl = document.getElementById('preview-image').src;
        }
        
        const produtoData = {
            nome,
            descricao,
            preco,
            precoPromocional,
            cores,
            tamanhos,
            promocao,
            destaque,
            estoque,
            imagem: imagemUrl
        };
        
        if (editingProductId) {
            await updateDoc(doc(db, 'produtos', editingProductId), produtoData);
        } else {
            await addDoc(collection(db, 'produtos'), produtoData);
        }
        
        document.getElementById('product-form-modal').style.display = 'none';
        document.getElementById('product-form').reset();
        document.getElementById('preview-image').style.display = 'none';
        loadProducts();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        alert('Erro ao salvar produto: ' + error.message);
    }
});

// Preview de imagem ao digitar URL
document.getElementById('imagem-url').addEventListener('input', (e) => {
    const url = e.target.value;
    if (url) {
        document.getElementById('preview-image').src = url;
        document.getElementById('preview-image').style.display = 'block';
        document.getElementById('preview-image').onerror = () => {
            document.getElementById('preview-image').style.display = 'none';
        };
    } else {
        document.getElementById('preview-image').style.display = 'none';
    }
});
