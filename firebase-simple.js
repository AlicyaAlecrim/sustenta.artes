// firebase-simple.js - Sistema Simplificado
console.log('🛍️ Sistema Firebase Simplificado - Carregando...');

class FirebaseProducts {
  constructor() {
    this.db = null;
    this.initialized = false;
    this.init();
  }

  init() {
    try {
      if (typeof firebase === 'undefined') {
        throw new Error('Firebase SDK não carregado');
      }

      if (!firebase.apps.length) {
        console.error('Firebase não foi inicializado no firebase-config.js');
        return;
      }

      this.db = firebase.firestore();
      this.initialized = true;
      
      console.log('✅ Firebase Products - Inicializado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar Firebase Products:', error);
      this.initialized = false;
    }
  }

  // Carregar todos os produtos
  async loadProducts() {
    if (!this.initialized) {
      console.log('⚠️ Firebase não inicializado, retornando array vazio');
      return [];
    }

    try {
      console.log('📥 Carregando produtos do Firebase...');
      
      const snapshot = await this.db.collection('products')
        .orderBy('createdAt', 'desc')
        .get();
      
      const products = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log(`✅ ${products.length} produtos carregados do Firebase`);
      return products;
      
    } catch (error) {
      console.error('❌ Erro ao carregar produtos:', error);
      
      if (error.code === 'permission-denied') {
        console.error('🔐 ERRO DE PERMISSÃO: Configure as regras do Firestore');
      }
      
      return [];
    }
  }

  // Testar conexão
  async testConnection() {
    if (!this.initialized) {
      return { success: false, message: 'Firebase não inicializado' };
    }

    try {
      // Teste simples
      await this.db.collection('test').doc('connection').set({
        test: true,
        timestamp: new Date()
      });
      
      return { success: true, message: 'Conexão funcionando!' };
      
    } catch (error) {
      return { 
        success: false, 
        message: `Erro: ${error.message}`,
        code: error.code 
      };
    }
  }
}

// Inicializar automaticamente
const firebaseProducts = new FirebaseProducts();

// Expor globalmente
window.FirebaseProducts = firebaseProducts;
window.SimpleFirebase = firebaseProducts;