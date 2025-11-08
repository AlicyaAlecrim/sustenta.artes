// firebase-config.js - CONFIGURAÇÃO CORRIGIDA
console.log('🔥 Inicializando Firebase...');

const firebaseConfig = {
  apiKey: "AIzaSyBL_uJGR2tceJcmoBZdno9fFx8ERoEfOWo",
  authDomain: "sustenta-artes.firebaseapp.com",
  projectId: "sustenta-artes",
  storageBucket: "sustenta-artes.firebasestorage.app",
  messagingSenderId: "570000231603",
  appId: "1:570000231603:web:4dfef3f91b560c4b5b34c6",
  measurementId: "G-HZF9SR1MVT"
};

try {
  // Verificar se Firebase está disponível
  if (typeof firebase === 'undefined') {
    console.error('❌ Firebase SDK não carregou');
    throw new Error('Firebase SDK não carregou');
  }

  // Inicializar Firebase
  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado:', app.name);
  } else {
    app = firebase.app();
    console.log('✅ Firebase já estava inicializado');
  }

  // Configurar Firestore
  const db = firebase.firestore();
  
  // Configurações para desenvolvimento
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    db.settings({
      experimentalForceLongPolling: true
    });
  }

  console.log('✅ Firestore configurado');

  // Expor globalmente para debug
  window.firebaseApp = app;
  window.firebaseDb = db;

} catch (error) {
  console.error('❌ Erro crítico na configuração do Firebase:', error);
}