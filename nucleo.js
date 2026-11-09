/* =========================================================
   NARA — Panel · Núcleo (datos, sesión, interfaz común)
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const CFG = window.FIREBASE_CONFIG || {}, DEMO = !CFG.apiKey || String(CFG.apiKey).startsWith("PEGA"), APP = window.APP || {};
const S = n => "S/ " + (Math.round((+n || 0) * 100) / 100).toLocaleString("es-PE", { minimumFractionDigits: (+n || 0) % 1 ? 2 : 0, maximumFractionDigits: 2 });
const r2 = n => Math.round((+n || 0) * 100) / 100;
const isoD = d => { const z = new Date(d); z.setMinutes(z.getMinutes() - z.getTimezoneOffset()); return z.toISOString().slice(0, 10); };
const HOY = () => isoD(new Date());
const addD = (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return isoD(d); };
const nochesDe = (a, b) => { const l = []; if (!a || !b || b <= a) return l; for (let d = a; d < b; d = addD(d, 1)) l.push(d); return l; };
const difD = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 864e5);
const fmtF = (iso, o) => iso ? new Date(String(iso).slice(0, 10) + "T12:00:00").toLocaleDateString("es-PE", o || { weekday: "short", day: "numeric", month: "short" }) : "";
const fmtH = iso => iso ? new Date(iso).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }) : "";
const hace = iso => { const m = Math.round((Date.now() - new Date(iso)) / 60000); return m < 1 ? "ahora" : m < 60 ? `hace ${m} min` : m < 1440 ? `hace ${Math.round(m / 60)} h` : fmtF(iso); };
const codigo = (p = "NR") => p + "-" + Array.from(crypto.getRandomValues(new Uint8Array(6)), b => "23456789ABCDEFGHJKMNPQRSTUVWXYZ"[b % 31]).join("");
const llaveQR = () => Array.from(crypto.getRandomValues(new Uint8Array(10)), b => "abcdefghijkmnpqrstuvwxyz23456789"[b % 32]).join("");
const pin4 = () => String(1000 + (crypto.getRandomValues(new Uint16Array(1))[0] % 9000));
const wa = (num, txt) => { let n = String(num || "").replace(/\D/g, ""); if (n.length === 9) n = "51" + n; return `https://wa.me/${n}${txt ? "?text=" + encodeURIComponent(txt) : ""}`; };
const abrirWA = (num, txt) => window.open(wa(num, txt), "_blank", "noopener");
function toast(m, bad) { let x = $("#toast"); if (!x) { x = document.createElement("div"); x.id = "toast"; x.setAttribute("role", "status"); document.body.appendChild(x); } x.textContent = m; x.className = "show" + (bad ? " bad" : ""); clearTimeout(x._t); x._t = setTimeout(() => x.className = "", 3500); }
function cargarScript(src) { return new Promise((ok, no) => { if ($(`script[src="${src}"]`)) return ok(); const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
const IMG = (id, w = 600) => !id ? "" : String(id).startsWith("data:") || String(id).startsWith("http") ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
function redimensionar(file, max = 1000, q = .8, tipo = "image/jpeg") { return new Promise((ok, no) => { const fr = new FileReader(); fr.onerror = no; fr.onload = () => { const im = new Image(); im.onerror = no; im.onload = () => {
  const k = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
  const g = c.getContext("2d"); if (tipo === "image/jpeg") { g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); } g.drawImage(im, 0, 0, c.width, c.height); ok(c.toDataURL(tipo, q)); }; im.src = fr.result; }; fr.readAsDataURL(file); }); }

/* ---------- Íconos ---------- */
const IC = {
  home: '<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  bed: '<path d="M2 18V6M2 14h20v4M22 18v-6a3 3 0 0 0-3-3H10v5M6 11h.01"/>', bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>', qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
  broom: '<path d="M19 3l-7 7M14 8l-9 9 2 4 4 2 9-9z"/>', bag: '<path d="M6 7h12l1 14H5zM9 7a3 3 0 0 1 6 0"/>', building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>', users: '<circle cx="9" cy="8" r="4"/><path d="M1 21a8 8 0 0 1 16 0M17 4a4 4 0 0 1 0 8M23 21a8 8 0 0 0-5-7.4"/>',
  check: '<path d="M5 12l5 5L20 7"/>', x: '<path d="M18 6L6 18M6 6l12 12"/>', plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>', edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>', wa: '<path d="M3 21l1.6-4.7A9 9 0 1 1 8 19.6z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1.2-1.2 2 .8v1.6c-4 .5-8.7-4.2-8.2-8.2h1.6l.8 2z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>', in: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>', out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>', tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>', print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>', compass: '<circle cx="12" cy="12" r="10"/><path d="M16 8l-2 6-6 2 2-6z"/>', camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', left: '<path d="M15 18l-6-6 6-6"/>', right: '<path d="M9 18l6-6-6-6"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>', lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'
};
Object.assign(IC, { cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6"/>', box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10"/>', tag: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>', truck: '<path d="M1 4h14v12H1zM15 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="18.5" r="2"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', pos: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h2M14 14h2M8 18h2M14 18h2"/>', store: '<path d="M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6"/>', grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>' });
const ico = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || IC.check}</svg>`;

/* ---------- Datos: demo (este navegador) o Firebase ---------- */
const FB_V = "10.12.2"; let FBX = null;
async function fb() {
  if (FBX) return FBX;
  const base = `https://www.gstatic.com/firebasejs/${FB_V}/`;
  const [app, fs, au] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js"), import(base + "firebase-auth.js")]);
  const a = app.getApps().length ? app.getApp() : app.initializeApp(CFG);
  FBX = { fs, au, db: fs.getFirestore(a), auth: au.getAuth(a) }; return FBX;
}
const LDB = { get() { let d = store.get("nara_db", null); if (!d) { d = window.NARA_SEMILLA(); store.set("nara_db", d); } return d; }, save(d) { store.set("nara_db", d); } };
const OPS = { "==": (a, b) => a === b, ">=": (a, b) => a >= b, "<=": (a, b) => a <= b, ">": (a, b) => a > b, "<": (a, b) => a < b, "in": (a, b) => b.includes(a) };
const DB = {
  async list(col, ...conds) {
    if (DEMO) return Object.entries(LDB.get()[col] || {}).map(([id, v]) => ({ ...v, id })).filter(x => conds.every(([f, o, v]) => OPS[o](x[f], v)));
    const { fs, db } = await fb();
    const q = conds.length ? fs.query(fs.collection(db, col), ...conds.map(([f, o, v]) => fs.where(f, o, v))) : fs.collection(db, col);
    return (await fs.getDocs(q)).docs.map(x => ({ ...x.data(), id: x.id }));
  },
  async get(col, id) {
    if (DEMO) { const v = (LDB.get()[col] || {})[id]; return v ? { ...v, id } : null; }
    const { fs, db } = await fb(), x = await fs.getDoc(fs.doc(db, col, id)); return x.exists() ? { ...x.data(), id: x.id } : null;
  },
  async set(col, id, data, merge = true) { return DB.batch([{ op: "set", col, id, data, merge }]); },
  async del(col, id) { return DB.batch([{ op: "del", col, id }]); },
  async batch(ops) {
    ops = ops.map(o => o.data ? { ...o, data: limpiar(o.data) } : o);
    if (DEMO) { const d = LDB.get(); ops.forEach(o => { d[o.col] = d[o.col] || {}; if (o.op === "del") delete d[o.col][o.id]; else d[o.col][o.id] = o.merge === false ? o.data : { ...(d[o.col][o.id] || {}), ...o.data }; }); LDB.save(d); return; }
    const { fs, db } = await fb();
    for (let i = 0; i < ops.length; i += 450) { const b = fs.writeBatch(db); ops.slice(i, i + 450).forEach(o => o.op === "del" ? b.delete(fs.doc(db, o.col, o.id)) : b.set(fs.doc(db, o.col, o.id), o.data, { merge: o.merge !== false })); await b.commit(); }
  }
};
function limpiar(o) { if (Array.isArray(o)) return o.map(limpiar); if (o && typeof o === "object") { const r = {}; for (const k in o) if (o[k] !== undefined) r[k] = limpiar(o[k]); return r; } return o; }


/* ---------- Catálogo (categorías, productos y ajustes) ---------- */
let CAT = { aj: {}, cats: [], prods: [] };
async function cargarCatalogo() {
  const [aj, cats, prods] = await Promise.all([DB.get("ajustes", "general"), DB.list("categorias"), DB.list("productos")]);
  CAT = { aj: { ...window.NARA_AJUSTES, ...(aj || {}) }, cats: cats.sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99)), prods: prods.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999) || String(a.nombre).localeCompare(b.nombre)) };
  return CAT;
}
const catDe = id => CAT.cats.find(c => c.id === id) || {};
const prodDe = id => CAT.prods.find(p => p.id === id);
const NOMBRE = () => CAT.aj.nombre || "NARA";
function marcaPanel() {
  const a = CAT.aj || {}, b = document.querySelector(".s-brand"); if (!b) return;
  b.querySelector(".ic, img, .s-letra")?.replaceWith(Object.assign(document.createElement("span"), { innerHTML: a.logo ? `<img class="s-logo" src="${esc(a.logo)}" alt="">` : `<span class="s-letra">${esc((a.logoLetra || NOMBRE()).charAt(0))}</span>` }).firstChild);
  b.querySelector("b").textContent = NOMBRE();
  if (a.logo) { const l = document.querySelector('link[rel="icon"]'); if (l) { l.type = "image/png"; l.href = a.logo; } }
}

/* ---------- Sesión y permisos ---------- */
let USER = null;
const YO = () => USER || {};
const esAdm = () => YO().rol === "Administración";
function perfil(email) { return (APP.equipo || []).find(p => p.email.toLowerCase() === String(email || "").toLowerCase()) || null; }

/* ---------- Interfaz común ---------- */
/* ---------- Interfaz común ---------- */
function modal(titulo, html, onOk, txtOk = "Guardar", opts = {}) {
  let m = $("#modal"); if (!m) { document.body.insertAdjacentHTML("beforeend", `<div id="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="mT"><div class="m-box"><header><h2 id="mT"></h2><button class="m-x" aria-label="Cerrar">${ico("x")}</button></header><form id="mF" novalidate><div id="mB"></div><footer><button type="button" class="btn btn-light m-c">Cancelar</button><button class="btn btn-pri" id="mOk"></button></footer></form></div></div>`); m = $("#modal");
    m.addEventListener("click", e => { if (e.target === m || e.target.closest(".m-x,.m-c")) cerrarModal(); }); document.addEventListener("keydown", e => { if (e.key === "Escape" && m.classList.contains("open")) cerrarModal(); }); }
  $("#mT").textContent = titulo; $("#mB").innerHTML = html; $("#mOk").textContent = txtOk; $("#mOk").hidden = !onOk; $(".m-c", m).textContent = onOk ? "Cancelar" : "Cerrar";
  m.querySelector(".m-box").classList.toggle("wide", !!opts.wide);
  m.classList.add("open"); document.body.style.overflow = "hidden";
  const F = $("#mF"); F.onsubmit = async e => { e.preventDefault(); if (!onOk) return cerrarModal();
    const req = $$("[required]", F).find(x => !String(x.value).trim()); if (req) { req.focus(); return toast("Completa: " + (req.closest("label")?.querySelector("span")?.textContent || "campo obligatorio"), true); }
    const b = $("#mOk"); b.disabled = true; try { const r = await onOk(datosForm(F), F); if (r !== false) cerrarModal(); } catch (er) { console.error(er); toast("Error: " + er.message, true); } b.disabled = false; };
  setTimeout(() => $("input:not([type=hidden]),select,textarea", F)?.focus(), 50);
  opts.alAbrir && opts.alAbrir(F);
}
function cerrarModal() { $("#modal")?.classList.remove("open"); document.body.style.overflow = ""; }
function datosForm(F) { const o = {}; $$("[name]", F).forEach(x => { if (x.type === "radio") { if (x.checked) o[x.name] = x.value; } else if (x.type === "checkbox") o[x.name] = x.checked; else if (x.type === "number") o[x.name] = x.value === "" ? "" : +x.value; else if (x.type !== "file") o[x.name] = x.value.trim(); }); return o; }
const fld = (name, label, val = "", o = {}) => {
  const id = "f_" + name + Math.random().toString(36).slice(2, 6);
  if (o.type === "checkbox") return `<label class="chk ${o.full ? "full" : ""}"><input type="checkbox" name="${name}" ${val ? "checked" : ""}><span>${label}${o.ph ? `<small>${o.ph}</small>` : ""}</span></label>`;
  const inner = o.opts ? `<select id="${id}" name="${name}" ${o.req ? "required" : ""}>${o.opts.map(x => { const [v, t] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(v)}" ${String(v) === String(val) ? "selected" : ""}>${esc(t)}</option>`; }).join("")}</select>`
    : o.type === "textarea" ? `<textarea id="${id}" name="${name}" rows="${o.rows || 3}" placeholder="${esc(o.ph || "")}" ${o.req ? "required" : ""}>${esc(val)}</textarea>`
    : `<input id="${id}" name="${name}" type="${o.type || "text"}" value="${esc(val)}" placeholder="${esc(o.ph || "")}" ${o.req ? "required" : ""} ${o.extra || ""}>`;
  return `<label class="fld ${o.full ? "full" : ""}" for="${id}"><span>${label}${o.req ? " *" : ""}</span>${inner}${o.help ? `<small>${o.help}</small>` : ""}</label>`;
};
const topBar = (t, sub, acc = "") => `<div class="v-h"><div><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ""}</div><div class="v-a">${acc}</div></div>`;
const vacio = t => `<div class="empty">${ico("box")}<p>${t}</p></div>`;
const EST_P = { "por-validar": ["Pago por validar", "warn"], nuevo: ["Nuevo", "pri"], preparando: ["Preparando", "pri"], enviado: ["En camino", "pri"], entregado: ["Entregado", "ok"], rechazado: ["Pago rechazado", "bad"], anulado: ["Anulado", "bad"] };
const estP = (e, p) => { const [t, c] = EST_P[e] || [e, "mute"]; return `<span class="st ${c}">${p && p.entrega === "recojo" && e === "enviado" ? "Listo para recoger" : t}</span>`; };
const METODOS = ["Efectivo", "Yape", "Plin", "Transferencia", "Tarjeta"];
const beep = () => { try { const a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value = 880; g.gain.setValueAtTime(.15, a.currentTime); o.start(); o.frequency.setValueAtTime(1175, a.currentTime + .15); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + .45); o.stop(a.currentTime + .45); } catch (e) {} };

/* ---------- PDF: nota de venta y ticket ---------- */
const QR_LIB = "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js", PDF_LIB = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
async function qrCanvas(texto, px = 300, color = "#111") {
  await cargarScript(QR_LIB); const q = qrcode(0, "M"); q.addData(texto); q.make();
  const n = q.getModuleCount(), m = 2, k = Math.max(1, Math.floor(px / (n + m * 2))), c = document.createElement("canvas"); c.width = c.height = k * (n + m * 2);
  const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.fillStyle = color;
  for (let r = 0; r < n; r++) for (let col = 0; col < n; col++) if (q.isDark(r, col)) g.fillRect((col + m) * k, (r + m) * k, k, k);
  return c;
}
async function jsPDF_() { await cargarScript(PDF_LIB); return window.jspdf.jsPDF; }
const colPDF = () => { const h = String(CAT.aj.colorPri || "#15171c").replace("#", ""), n = parseInt(h, 16); return isNaN(n) ? [31, 42, 55] : [n >> 16, (n >> 8) & 255, n & 255]; };
function logoPDF(doc, x, y, t) { if (!CAT.aj.logo) return false; try { doc.setFillColor(255, 255, 255); doc.roundedRect(x - 1, y - 1, t + 2, t + 2, 2.5, 2.5, "F"); doc.addImage(CAT.aj.logo, CAT.aj.logo.includes("image/png") ? "PNG" : "JPEG", x, y, t, t); return true; } catch (e) { return false; } }
const linkPedido = c => `${String(APP.web || "").replace(/\/$/, "")}/pedido?c=${encodeURIComponent(c)}`;
async function pdfNota(p, ticket) {
  const J = await jsPDF_(), aj = CAT.aj, items = p.items || [];
  if (ticket) {   // ticket de 80 mm para impresora térmica
    const alto = 92 + items.length * 9, doc = new J({ unit: "mm", format: [80, alto] }); let y = 8;
    if (logoPDF(doc, 31, 4, 18)) y = 27;
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text(NOMBRE(), 40, y, { align: "center" }); y += 5;
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); [aj.direccion, `Tel. ${aj.telefono || ""}`, aj.ruc ? `RUC ${aj.ruc}` : ""].filter(Boolean).forEach(t => { doc.text(String(t), 40, y, { align: "center", maxWidth: 70 }); y += 3.8; });
    y += 2; doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text(`RECIBO DE COMPRA ${p.codigo || p.id}`, 40, y, { align: "center" }); y += 4.5;
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.text(new Date(p.creado || Date.now()).toLocaleString("es-PE"), 40, y, { align: "center" }); y += 4;
    if (p.nombre) { doc.text(`Cliente: ${p.nombre}${p.doc ? " · " + p.doc : ""}`, 5, y, { maxWidth: 70 }); y += 4; }
    if (p.boleta) { doc.setFont("helvetica", "bold"); doc.text(`${p.comprobante || "Boleta"} electrónica N° ${p.boleta}`, 40, y, { align: "center" }); doc.setFont("helvetica", "normal"); y += 4; }
    doc.setLineDashPattern([1, 1], 0); doc.line(5, y, 75, y); y += 4;
    items.forEach(i => { doc.setFontSize(8); doc.text(doc.splitTextToSize(`${i.cant} x ${i.n}`, 50)[0], 5, y); doc.text(S(i.precio * i.cant), 75, y, { align: "right" }); y += 4; doc.setFontSize(6.8); doc.setTextColor(110); doc.text(`${S(i.precio)} c/u`, 8, y); doc.setTextColor(0); y += 5; });
    doc.line(5, y, 75, y); y += 5;
    [["Subtotal", p.subtotal ?? p.total], ...(p.envio ? [["Envío", p.envio]] : []), ...(p.descuento ? [["Descuento", -p.descuento]] : [])].forEach(([a, b]) => { doc.setFontSize(8); doc.text(a, 5, y); doc.text(S(b), 75, y, { align: "right" }); y += 4.2; });
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text("TOTAL", 5, y + 1); doc.text(S(p.total), 75, y + 1, { align: "right" }); y += 7;
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.text(`Pago: ${p.pago || ""}${p.banco ? " " + p.banco : ""}`, 5, y); y += 4; if (p.vuelto) { doc.text(`Recibido ${S(p.recibido)} · Vuelto ${S(p.vuelto)}`, 5, y); y += 4; }
    doc.setFontSize(7); doc.text("¡Gracias por su compra!", 40, y + 3, { align: "center" }); doc.text("Este recibo no reemplaza la boleta o factura electrónica.", 40, y + 6.5, { align: "center", maxWidth: 72 });
    return doc.save(`Ticket-${p.codigo || p.id}.pdf`);
  }
  const doc = new J({ unit: "mm", format: "a5" }), W = 148;
  doc.setFillColor(11, 58, 168); doc.rect(0, 0, W, 26, "F"); doc.setFillColor(47, 196, 212); doc.rect(0, 26, W, 2, "F");
  const X = logoPDF(doc, 9, 4, 18) ? 32 : 10; doc.setTextColor(255); doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.text(NOMBRE(), X, 12);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.text(`${aj.direccion || ""} · Tel. ${aj.telefono || ""}${aj.ruc ? " · RUC " + aj.ruc : ""}`, X, 18, { maxWidth: W - X - 8 });
  doc.setTextColor(25); doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.text("RECIBO DE COMPRA", 10, 38); doc.setFontSize(10); doc.text(p.codigo || p.id, W - 10, 38, { align: "right" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); let y = 45;
  [["Fecha", new Date(p.creado || Date.now()).toLocaleString("es-PE")], ["Cliente", `${p.nombre || "Cliente"}${p.doc ? " · " + p.doc : ""}`], ["Celular", p.celular || "—"],
    ["Entrega", p.entrega === "domicilio" ? `Envío · ${p.zona || ""} · ${p.direccion || ""}${p.referencia ? " (" + p.referencia + ")" : ""}` : p.entrega === "recojo" ? "Recojo en tienda" : "Venta en tienda"], ["Comprobante", (p.comprobante || "—") + (p.boleta ? ` electrónica N° ${p.boleta}` : " (pendiente de emitir)")], ["Estado", ({ "por-validar": "Pago en revisión", nuevo: "Confirmado", preparando: "Preparando", enviado: "En camino", entregado: "Entregado", anulado: "Anulado", rechazado: "Rechazado" })[p.estado] || p.estado || "—"]]
    .forEach(([a, b]) => { doc.setFont("helvetica", "bold"); doc.text(a, 10, y); doc.setFont("helvetica", "normal"); const l = doc.splitTextToSize(String(b), W - 48); doc.text(l, 38, y); y += 5.2 * l.length; });
  y += 3; doc.setFillColor(244, 245, 247); doc.rect(10, y - 4, W - 20, 7, "F"); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5);
  doc.text("Cant.", 12, y); doc.text("Producto", 26, y); doc.text("P. unit.", 104, y, { align: "right" }); doc.text("Importe", W - 12, y, { align: "right" }); y += 7; doc.setFont("helvetica", "normal");
  items.forEach(i => { const l = doc.splitTextToSize(i.n, 64); doc.text(String(i.cant), 12, y); doc.text(l, 26, y); doc.text(S(i.precio), 104, y, { align: "right" }); doc.text(S(i.precio * i.cant), W - 12, y, { align: "right" }); y += 5 * l.length + 1; if (y > 180) { doc.addPage(); y = 15; } });
  doc.setDrawColor(220); doc.line(10, y, W - 10, y); y += 6;
  [["Subtotal", p.subtotal ?? p.total], ...(p.envio ? [["Envío", p.envio]] : []), ...(p.descuento ? [["Descuento", -p.descuento]] : [])].forEach(([a, b]) => { doc.text(a, 104, y, { align: "right" }); doc.text(S(b), W - 12, y, { align: "right" }); y += 5; });
  doc.setFont("helvetica", "bold"); doc.setFontSize(11.5); doc.text("TOTAL", 104, y + 1, { align: "right" }); doc.text(S(p.total), W - 12, y + 1, { align: "right" }); y += 9;
  doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.text(`Pago: ${p.pago || ""}${p.banco ? " " + p.banco : ""}${p.operacion ? " · Op. " + p.operacion : ""}`, 10, y);
  doc.setFontSize(7.5); doc.setTextColor(120); try { const q = await qrCanvas(linkPedido(p.codigo || p.id), 200, "#111"); if (y > 160) { doc.addPage(); y = 15; } doc.addImage(q.toDataURL(), "PNG", W - 34, y + 6, 24, 24); doc.setFontSize(7); doc.setTextColor(120); doc.text("Ver pedido en línea", W - 22, y + 33, { align: "center" }); } catch (e) {}
  doc.setFontSize(7.5); doc.setTextColor(90); doc.setFont("helvetica", "bold"); doc.text("Este recibo no reemplaza la boleta o factura electrónica.", 10, 200);
  doc.save(`Recibo-${p.codigo || p.id}.pdf`);
}
