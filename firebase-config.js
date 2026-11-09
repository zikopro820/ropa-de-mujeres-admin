/* =========================================================
   CONFIGURACIÓN — Panel de NARA (tienda de ropa)
   Mientras apiKey diga "PEGA_AQUI", el panel funciona en MODO DEMO.
   ========================================================= */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDucxjMhYw_29kTpP1fCurny6gtw_RvlQY",
  authDomain: "tienda-de-ropa-93237.firebaseapp.com",
  projectId: "tienda-de-ropa-93237",
  storageBucket: "tienda-de-ropa-93237.firebasestorage.app",
  messagingSenderId: "1091743571959",
  appId: "1:1091743571959:web:585f4bab9dce448aad18f2"
};

window.APP = {
  web: "https://zikopro820.github.io/ropa-de-mujeres",   // dirección de la web pública (para enlaces de seguimiento)

  /* EQUIPO Y PERMISOS — cada persona entra con su correo.
     "Administración" → todo · "Ventas" → pedidos, venta en tienda, productos, caja, clientes y mensajes.
     Usa los MISMOS correos en firestore.rules. */
  equipo: [
    { email: "admin@naramoda.pe", nombre: "Administración", rol: "Administración" },
    { email: "ventas@naramoda.pe", nombre: "Ventas", rol: "Ventas" }
  ]
};
