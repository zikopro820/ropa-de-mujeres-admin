/* =========================================================
   NARA — Datos de ejemplo y ajustes iniciales
   (este archivo es IGUAL en la web y en el panel)
   Lo que cambies en el PANEL › Ajustes reemplaza estos valores.
   ========================================================= */
window.NARA_AJUSTES = {
  nombre: "NARA", logoLetra: "N", logo: "", ruc: "",
  whatsapp: "51984713695", telefono: "+51 984 713 695", email: "hola@tumarca.com",
  horario: "Lun a Sáb · 9:00 a.m. – 8:00 p.m.", direccion: "Lima, Perú · Tienda online",
  redes: { facebook: "", instagram: "", tiktok: "", youtube: "" },
  topbar: "🚚 Envío *GRATIS* en Lima desde S/ 199 · Paga con Yape, Plin o transferencia",
  slides: [
    { sub: "Temporada Otoño", tit: "¡Mega ofertas NARA!", txt: "Vestidos, blazers y accesorios con descuentos que no vas a creer.", btn: "Comprar ahora", link: "catalogo?ofertas=1", b1: "Hasta", b2: "-50%", foto: "" },
    { sub: "Solo por hoy", tit: "Ofertas Flash", txt: "Precios especiales por tiempo limitado. ¡Corre antes de que se agoten!", btn: "Ver Ofertas Flash", link: "catalogo?flash=1", b1: "Desde", b2: "S/39", foto: "" },
    { sub: "Nueva colección", tit: "Sastrería que empodera", txt: "Blazers y trajes de corte impecable para la oficina y más allá.", btn: "Descubrir", link: "catalogo?cat=sastreria", b1: "Nuevos", b2: "-30%", foto: "" }
  ],
  cambiosDias: 15,
  // Pagos
  pagoYape: true, yapeQR: "", yapeNum: "984 713 695", yapeTitular: "NARA Moda",
  pagoPlin: true, plinQR: "", plinNum: "984 713 695", plinTitular: "NARA Moda",
  pagoTransf: true, cuentas: [
    { id: "bcp0", banco: "BCP", num: "191-12345678-0-55", cci: "002-191-112345678055-12", titular: "NARA Moda EIRL", url: "https://www.viabcp.com" },
    { id: "interbank1", banco: "Interbank", num: "200-3001234567", cci: "003-200-013001234567-48", titular: "NARA Moda EIRL", url: "https://interbank.pe" }],
  contraEntrega: true, pagoOCR: true,
  // Envíos
  zonas: [{ n: "Lima Metropolitana", costo: 12 }, { n: "Callao y Lima periferia", costo: 15 }, { n: "Provincias (por agencia)", costo: 20 }],
  envioGratisDesde: 199, recojo: false, stockMinimo: 2
};

window.NARA_SEMILLA = function () {
  const db = { ajustes: { general: JSON.parse(JSON.stringify(window.NARA_AJUSTES)) }, categorias: {}, productos: {}, fotos_prod: {}, pedidos: {}, capturas: {}, movimientos: {}, mensajes: {} };
  const U = (id, w = 500) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
  const FOTOS_CAT = { vestidos: "1785348056883-f5f92f2dc4ea", tops: "1509631179647-0177331693ae", sastreria: "1610765431323-d88c88a2b2c8", abrigos: "1731589802397-6a1088d63630", accesorios: "1618522755367-bcbb050438b6" };
  Object.entries(typeof CATEGORIAS_EJEMPLO !== "undefined" ? CATEGORIAS_EJEMPLO : {}).forEach(([k, n], i) => db.categorias[k] = { nombre: n, foto: FOTOS_CAT[k] ? U(FOTOS_CAT[k], 400) : "", menu: true, orden: i });
  const CANT = [6, 3, 8, 2, 5, 4, 10, 7, 9, 5, 3, 6, 4, 12, 8, 5];
  (typeof PRODUCTOS_EJEMPLO !== "undefined" ? PRODUCTOS_EJEMPLO : []).forEach((p, i) => {
    const stock = {}; p.tallas.forEach((t, k) => stock[t] = Math.max(0, CANT[(i + k) % 16] - (k === p.tallas.length - 1 && i % 3 === 0 ? CANT[(i + k) % 16] : 0)));
    db.productos["p" + p.id] = { nombre: p.nombre, cat: p.cat, precio: p.precio, antes: p.antes, color: p.color, foto: p.foto, flash: !!p.flash, vendido: p.vendido || 0, nuevo: !!p.nuevo, rating: p.rating || 4.7,
      tallas: p.tallas.slice(), stock, desc: p.desc || "", activo: true, orden: i };
  });
  db.fotos_prod = { p1: { fotos: [U("1781496266499-a4516f159c10", 1200), U("1704775991121-a7c5423ef8d3", 1200)] }, p3: { fotos: [U("1785348056883-f5f92f2dc4ea", 1200)] } };
  if (window.NARA_DEMO_PEDIDOS !== false) {
    const now = Date.now(), h = n => new Date(now - n * 3600e3).toISOString(), hoy = new Date().toISOString().slice(0, 10);
    db.pedidos["NR-DEMO01"] = { codigo: "NR-DEMO01", items: [{ id: "p1", n: "Vestido satinado Caramelo · Talla M", talla: "M", color: "Caramelo", precio: 129.9, cant: 1 }, { id: "p14", n: "Set de pulseras doradas", talla: "Única", color: "Dorado", precio: 39.9, cant: 1 }], subtotal: 169.8, envio: 12, total: 181.8,
      entrega: "domicilio", zona: "Lima Metropolitana", direccion: "Av. Brasil 1450, Pueblo Libre", referencia: "Edificio azul, dpto 302", nombre: "Camila Rojas", celular: "984111222", doc: "", comprobante: "Boleta", pago: "Yape", banco: "", monto: 181.8, operacion: "24681357",
      estado: "por-validar", origen: "web", creado: h(1), montoLeido: 181.8, coincide: true };
    db.capturas["NR-DEMO01"] = { pedido: "NR-DEMO01", captura: "" };
    db.pedidos["NR-DEMO02"] = { codigo: "NR-DEMO02", items: [{ id: "p10", n: "Blazer clásico Negro · Talla S", talla: "S", color: "Negro", precio: 179.9, cant: 1 }, { id: "p8", n: "Top sin mangas Blanco · Talla S", talla: "S", color: "Blanco", precio: 39.9, cant: 2 }], subtotal: 259.7, envio: 0, total: 259.7,
      entrega: "domicilio", zona: "Callao y Lima periferia", direccion: "Jr. Las Gardenias 210, Bellavista", referencia: "", nombre: "Andrea Salas", celular: "984333444", doc: "47851236", comprobante: "Boleta", pago: "Contra entrega", banco: "", monto: 259.7, estado: "nuevo", origen: "web", creado: h(3) };
    db.pedidos["NR-DEMO03"] = { codigo: "NR-DEMO03", items: [{ id: "p7", n: "Vestido negro Esencial · Talla L", talla: "L", color: "Negro", precio: 79.9, cant: 1 }], subtotal: 79.9, envio: 12, total: 91.9, entrega: "domicilio", zona: "Lima Metropolitana", direccion: "Calle Los Cedros 88, Surco",
      nombre: "Lucía Paredes", celular: "984555666", comprobante: "Boleta", pago: "Plin", monto: 91.9, estado: "preparando", stockDescontado: true, pagado: 91.9, origen: "web", creado: h(26) };
    db.movimientos["MV-DEMO1"] = { fecha: hoy, hora: h(2), concepto: "Venta en tienda · 2 prendas", monto: 169.8, metodo: "Efectivo", usuario: "Ventas" };
    db.mensajes["MS-DEMO1"] = { nombre: "Rosa Medina", telefono: "984777888", asunto: "Ayuda con mi talla", mensaje: "Hola, mido 1.60 y uso talla S en blusas. ¿Qué talla me recomiendan para el blazer oversize?", estado: "nuevo", creado: h(5) };
  }
  return db;
};
