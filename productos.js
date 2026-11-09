/* =========================================================
   NARA — PRODUCTOS DE EJEMPLO
   ⚠️ Ya NO se editan aquí: ahora se agregan, cambian y quitan
   desde el PANEL (Productos y Categorías), con su stock por
   talla y hasta 4 fotos. Esta lista solo se usa como ejemplo
   y para «Cargar ejemplos» la primera vez.

   Campos:
   id       → número único (no repetir)
   nombre   → nombre del producto
   cat      → vestidos | tops | sastreria | abrigos | accesorios
   precio   → precio actual en soles
   antes    → precio anterior (para mostrar el descuento) o null
   foto     → enlace de la foto
   flash    → true si aparece en "Ofertas Flash"
   vendido  → % vendido que se muestra en la barra de Ofertas Flash
   nuevo    → true si aparece en "Últimas novedades"
   rating   → calificación de 1 a 5 (ejemplo)
   tallas   → lista de tallas disponibles
   color    → color de la prenda
   desc     → descripción
   ========================================================= */
const FOTO_EJ = id => "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=700&q=80";
const TALLAS_EJ = ["XS", "S", "M", "L", "XL"];

const CATEGORIAS_EJEMPLO = {
  vestidos:   "Vestidos",
  tops:       "Blusas y tops",
  sastreria:  "Sastrería",
  abrigos:    "Abrigos",
  accesorios: "Accesorios"
};

const PRODUCTOS_EJEMPLO = [
  { id: 1, nombre: "Vestido satinado Caramelo", cat: "vestidos", precio: 129.90, antes: 189.90, color: "Caramelo",
    foto: FOTO_EJ("1704775990154-b87562565d4c"), flash: true, vendido: 72, nuevo: true, rating: 4.8, tallas: TALLAS_EJ,
    desc: "Vestido midi de satén con caída fluida y tirantes finos. Brillo suave que funciona de día con sandalias y de noche con tacos." },
  { id: 2, nombre: "Vestido fruncido Cacao", cat: "vestidos", precio: 99.90, antes: 169.90, color: "Cacao",
    foto: FOTO_EJ("1704775991121-a7c5423ef8d3"), flash: true, vendido: 85, nuevo: false, rating: 4.7, tallas: TALLAS_EJ,
    desc: "Vestido ceñido con fruncido lateral que estiliza la figura. Tela con elasticidad para moverte con total comodidad." },
  { id: 3, nombre: "Vestido de volantes Arena", cat: "vestidos", precio: 119.90, antes: 199.90, color: "Arena",
    foto: FOTO_EJ("1785348056988-c4d7c2248248"), flash: false, vendido: 0, nuevo: true, rating: 4.6, tallas: ["S", "M", "L"],
    desc: "Vestido largo de capas con volantes y lazos en los hombros. Ligero, fresco y romántico." },
  { id: 4, nombre: "Vestido de gala Marfil", cat: "vestidos", precio: 279.90, antes: 349.90, color: "Marfil",
    foto: FOTO_EJ("1776841818483-700f88aace44"), flash: false, vendido: 0, nuevo: true, rating: 4.9, tallas: ["XS", "S", "M", "L"],
    desc: "Vestido largo de noche con silueta envolvente. Pensado para matrimonios, galas y ocasiones especiales." },
  { id: 5, nombre: "Vestido Granate", cat: "vestidos", precio: 139.90, antes: 179.90, color: "Granate",
    foto: FOTO_EJ("1764265148862-7ee72a4fb367"), flash: false, vendido: 0, nuevo: true, rating: 4.5, tallas: TALLAS_EJ,
    desc: "Vestido en tono granate profundo, de corte limpio y elegante. Un básico de temporada que no pasa de moda." },
  { id: 6, nombre: "Vestido bicolor manga larga", cat: "vestidos", precio: 149.90, antes: 199.90, color: "Negro y blanco",
    foto: FOTO_EJ("1601597565151-70c4020dc0e1"), flash: false, vendido: 0, nuevo: false, rating: 4.6, tallas: TALLAS_EJ,
    desc: "Vestido de manga larga con contraste blanco y negro. Sofisticado para la oficina o una cena." },
  { id: 7, nombre: "Vestido negro Esencial", cat: "vestidos", precio: 79.90, antes: 159.90, color: "Negro",
    foto: FOTO_EJ("1586079615844-c0abfb04dc79"), flash: true, vendido: 91, nuevo: false, rating: 4.8, tallas: TALLAS_EJ,
    desc: "El vestido negro que toda mujer necesita: sin mangas, línea recta y tela de excelente caída." },
  { id: 8, nombre: "Top sin mangas Blanco", cat: "tops", precio: 39.90, antes: 79.90, color: "Blanco",
    foto: FOTO_EJ("1509631179647-0177331693ae"), flash: true, vendido: 64, nuevo: false, rating: 4.5, tallas: TALLAS_EJ,
    desc: "Top de algodón pima sin mangas, de cuello alto y calce perfecto. Combínalo con sastrería o jeans." },
  { id: 9, nombre: "Blusa manga larga Noir", cat: "tops", precio: 69.90, antes: 99.90, color: "Negro",
    foto: FOTO_EJ("1590131222139-91ba5992e4ed"), flash: false, vendido: 0, nuevo: false, rating: 4.4, tallas: TALLAS_EJ,
    desc: "Blusa negra de manga larga con tela suave y opaca. Elegante y fácil de combinar." },
  { id: 10, nombre: "Blazer clásico Negro", cat: "sastreria", precio: 179.90, antes: 259.90, color: "Negro",
    foto: FOTO_EJ("1612731486606-2614b4d74921"), flash: true, vendido: 58, nuevo: true, rating: 4.9, tallas: TALLAS_EJ,
    desc: "Blazer de corte recto con hombros estructurados y forro interior. La pieza clave de un clóset elegante." },
  { id: 11, nombre: "Traje sastre Oxford", cat: "sastreria", precio: 249.90, antes: 389.90, color: "Gris",
    foto: FOTO_EJ("1613915617430-8ab0fd7c6baf"), flash: false, vendido: 0, nuevo: false, rating: 4.7, tallas: ["S", "M", "L", "XL"],
    desc: "Conjunto de blazer y pantalón recto de tiro alto. Se pueden usar juntos o por separado." },
  { id: 12, nombre: "Blazer oversize Ciudad", cat: "sastreria", precio: 199.90, antes: 279.90, color: "Negro",
    foto: FOTO_EJ("1610765431323-d88c88a2b2c8"), flash: false, vendido: 0, nuevo: true, rating: 4.6, tallas: TALLAS_EJ,
    desc: "Blazer amplio de inspiración masculina, con bolsillos con tapa. Moderno y con mucha actitud." },
  { id: 13, nombre: "Abrigo largo Noche", cat: "abrigos", precio: 259.90, antes: 449.90, color: "Negro",
    foto: FOTO_EJ("1731589802397-6a1088d63630"), flash: true, vendido: 77, nuevo: false, rating: 4.8, tallas: ["S", "M", "L"],
    desc: "Abrigo largo de paño con solapa ancha y cinturón. Abriga sin perder elegancia." },
  { id: 14, nombre: "Set de pulseras doradas", cat: "accesorios", precio: 39.90, antes: 89.90, color: "Dorado",
    foto: FOTO_EJ("1675113627456-c280ed77fdb9"), flash: true, vendido: 69, nuevo: false, rating: 4.7, tallas: ["Única"],
    desc: "Tres pulseras de cadena con baño de oro, para usar juntas o por separado. Resistentes al agua." },
  { id: 15, nombre: "Anillos dorados Statement", cat: "accesorios", precio: 49.90, antes: 69.90, color: "Dorado",
    foto: FOTO_EJ("1764181237984-70ac5f211b06"), flash: false, vendido: 0, nuevo: true, rating: 4.6, tallas: ["Única"],
    desc: "Set de anillos gruesos con baño de oro, ajustables. El detalle que transforma cualquier look." },
  { id: 16, nombre: "Aretes de perla Aurora", cat: "accesorios", precio: 59.90, antes: 79.90, color: "Dorado y perla",
    foto: FOTO_EJ("1770721478216-3e5dbbe8dcc2"), flash: false, vendido: 0, nuevo: false, rating: 4.9, tallas: ["Única"],
    desc: "Aretes dorados con perlas de agua dulce. Clásicos, delicados y perfectos para regalar." }
];
