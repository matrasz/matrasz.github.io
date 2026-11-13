"use strict";
// All example products and scores are editorial placeholders, not TikTok Shop data.
const SAMPLE=[
 ["Tripod mini telefon","Gajet",88],["Bekas simpanan dapur","Rumah",91],
 ["Pemegang telefon kereta","Aksesori",82],["Botol air tahan karat","Gaya hidup",80],
 ["Lampu meja LED","Rumah",87],["Organizer laci","Rumah",94],
 ["Rak kasut modular","Rumah",86],["Beg organizer perjalanan","Travel",85],
 ["Kain microfiber","Penjagaan",77],["Berus bulu haiwan","Haiwan",79],
 ["Beg tote","Fesyen",75],["Shawl warna neutral","Fesyen",83]
];
const angles={
 masalah:{label:"Masalah → penyelesaian",hook:p=>`Pernah terfikir cara nak jadikan rutin lebih teratur? Jom tengok ${p} dari dekat.`,intro:p=>`Mulakan dengan situasi harian yang berkaitan dengan ${p}; jangan mereka-reka hasil penggunaannya.`,middle:p=>`Tunjukkan ${p} sebenar, cara penggunaan yang selamat dan perkara yang boleh diperhatikan sendiri.`,cta:"Semak ukuran, harga, ulasan serta maklumat penjual sebelum buat keputusan."},
 demo:{label:"Demonstrasi produk",hook:p=>`Apa yang patut kita semak sebelum pilih ${p}?`,intro:p=>`Tunjuk ${p} dari beberapa sudut, termasuk saiz dan pembungkusannya jika tersedia.`,middle:p=>`Demonstrasi penggunaan biasa ${p}; sebut hanya fungsi yang benar-benar disahkan.`,cta:"Bandingkan spesifikasi dan pilihan lain dalam senarai produk."},
 rutin:{label:"Rutin harian",hook:p=>`Jom masukkan ${p} dalam satu idea rutin harian.`,intro:p=>`Rakam latar atau situasi sebenar yang berkaitan dengan ${p}.`,middle:p=>`Tunjukkan langkah menggunakan ${p}, tanpa menjanjikan hasil tertentu.`,cta:"Tengok maklumat penuh produk dahulu untuk pastikan sesuai dengan keperluan."}
};
let products=SAMPLE.map(([name,category,creative_score],i)=>({id:`DEMO-${i+1}`,name,category,creative_score,price_rm:null,commission_pct:null,verified_features:"",source:"SENARAI CONTOH"}));
let current="";let currentProduct=null;let currentHook="";
const el=id=>document.getElementById(id);
function safeNum(x){if(x===undefined||x===null||String(x).trim()==="")return null;const n=Number(x);return Number.isFinite(n)&&n>=0?n:null;}
function cm(p){return p.price_rm!==null&&p.commission_pct!==null?(p.price_rm*p.commission_pct/100):null;}
function sorted(){return [...products].sort((a,b)=>b.creative_score-a.creative_score||a.name.localeCompare(b.name));}
function labelMoney(x){return x===null?"Belum ada data":`RM ${x.toFixed(2)}`;}
function render(){
 const sel=el("product");const old=sel.value;sel.replaceChildren();
 for(const p of products){const o=new Option(p.name,p.id);sel.add(o);}if(products.some(p=>p.id===old))sel.value=old;
 const body=el("productTable");body.replaceChildren();
 sorted().forEach((p,i)=>{
  const tr=document.createElement("tr");
  const vals=[String(i+1),p.name,p.category,String(p.creative_score),labelMoney(cm(p))];
  vals.forEach((v,j)=>{const td=document.createElement("td");td.textContent=v;if(j>=3)td.className="num";tr.appendChild(td);});
  const td=document.createElement("td"),btn=document.createElement("button");btn.type="button";btn.className="mini";btn.textContent="Pilih";
  btn.addEventListener("click",()=>{sel.value=p.id;el("feature").value=p.verified_features||"";el("status").textContent=`Produk dipilih: ${p.name}`;el("generate").focus();});td.appendChild(btn);tr.appendChild(td);body.appendChild(tr);
 });
 el("productCount").textContent=String(products.length);el("draftCount").textContent=String(products.length*3);
}
function createDraft(p,angle,audience,verified){
 const t=angles[angle];let featureText=verified?.trim()?`Fakta yang pengguna masukkan untuk DISAHKAN: ${verified.trim()}`:"Fakta khusus belum disahkan: elakkan tuntutan tentang kualiti, prestasi atau bahan.";
 const money=cm(p)===null?"Tiada data komisen yang disahkan.":`Anggaran komisen seunit (berdasarkan nilai yang dimasukkan): ${labelMoney(cm(p))}; semak semula kadar sebenar.`;
 const hook=t.hook(p.name);
 const text=`AFFILIATE AI ROBOT PRO v0.4 — DRAF BAHASA MELAYU (SEMAK DULU)\n\nPRODUK: ${p.name}\nKATEGORI: ${p.category}\nSUDUT: ${t.label}\nSASARAN: ${audience}\nDATA: ${p.source}\n${money}\n\nHOOK 0–3s:\n${hook}\n\nSKRIP 3–8s:\n${t.intro(p.name)}\n\nSKRIP 8–15s:\n${t.middle(p.name)}\n${featureText}\n\nCTA 15–20s:\n${t.cta}\n\nSHOTLIST:\n1. Paparan nama dan visual produk sendiri/berizin.\n2. Rakaman sebenar produk dari dekat.\n3. Demonstrasi dengan maklumat yang sudah disemak.\n4. Penutup: ajak semak spesifikasi & penjual.\n\nCAPTION CADANGAN:\n${p.name} — kita tengok apa yang perlu diperiksa sebelum memilih. Semak ciri sebenar, harga semasa dan ulasan penjual. #IdeaProduk #ReviewProduk #KandunganBM\n\nPENDEDAHAN: Jika digunakan sebagai promosi/affiliate, aktifkan label promosi yang diwajibkan platform dan terangkan hubungan komersial.\nCHECKLIST: Sahkan produk, media berizin, komisen, tiada testimoni palsu dan kelayakan akaun.\nSTATUS: Tiada sambungan TikTok atau posting automatik.\n`;
 return {text,hook};
}
function produce(){const p=products.find(x=>x.id===el("product").value);if(!p)return;
 const audience=el("audience").value.trim().slice(0,100)||"pengguna yang sedang membandingkan produk";
 const verified=el("feature").value.trim().slice(0,220);
 const d=createDraft(p,el("angle").value,audience,verified);current=d.text;currentHook=d.hook;currentProduct=p;
 el("result").textContent=current;["copy","download","poster"].forEach(id=>el(id).disabled=false);
 el("status").textContent=`Skrip ${p.name} siap. Boleh salin, simpan TXT atau buat poster PNG.`;el("result").scrollIntoView({behavior:"smooth",block:"nearest"});}
function download(name,blob){const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),600);}
function slug(s){return s.toLocaleLowerCase("ms").normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,35)||"produk";}
function csvCell(s){const val=String(s??"").replace(/^[=+@\-]/,m=>"'"+m);return '"'+val.replaceAll('"','""')+'"';}
function exportAll(){const header=["produk","kategori","skor_idea_editorial","sudut","hook","skrip_lengkap","komisen_seunit_berdasarkan_input"];
 const rows=[header.map(csvCell).join(",")];
 products.forEach(p=>Object.keys(angles).forEach(a=>{const d=createDraft(p,a,"pengguna Malaysia","" );rows.push([p.name,p.category,p.creative_score,angles[a].label,d.hook,d.text,cm(p)===null?"":"RM "+cm(p).toFixed(2)].map(csvCell).join(","));}));
 download("Affiliate_AI_PRO_"+products.length*3+"_draf.csv",new Blob(["\uFEFF",rows.join("\r\n")],{type:"text/csv;charset=utf-8"}));el("status").textContent=`${products.length*3} draf dieksport sebagai CSV. Semua data diproses dalam browser.`;}
function wrap(ctx,text,maxWidth,fs){ctx.font=`700 ${fs}px system-ui, sans-serif`;const out=[];let line="";for(const w of text.split(/\s+/)){const t=line?line+" "+w:w;if(ctx.measureText(t).width>maxWidth&&line){out.push(line);line=w;}else line=t;}if(line)out.push(line);return out.slice(0,6);}
function createPoster(){if(!currentProduct)return;
 const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1920;const ctx=canvas.getContext("2d");
 const grad=ctx.createLinearGradient(0,0,980,1850);grad.addColorStop(0,"#111e3d");grad.addColorStop(0.62,"#192f4e");grad.addColorStop(1,"#0b1227");ctx.fillStyle=grad;ctx.fillRect(0,0,1080,1920);
 ctx.fillStyle="rgba(89,237,210,0.08)";ctx.beginPath();ctx.arc(1000,230,360,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(255,116,156,0.07)";ctx.beginPath();ctx.arc(120,1560,410,0,Math.PI*2);ctx.fill();
 ctx.fillStyle="#55e8d1";ctx.font="700 38px system-ui,sans-serif";ctx.fillText("AFFILIATE AI ROBOT PRO",85,130);
 ctx.fillStyle="#dde9ff";ctx.font="600 30px system-ui,sans-serif";ctx.fillText("IDEA KANDUNGAN · POSTER DEMO",86,195);
 ctx.strokeStyle="#49708b";ctx.lineWidth=2;ctx.strokeRect(72,300,936,975);
 ctx.fillStyle="#0f2340";ctx.fillRect(91,320,900,935);
 ctx.fillStyle="#5beed0";ctx.font="700 36px system-ui,sans-serif";ctx.fillText(currentProduct.category.toLocaleUpperCase("ms"),134,415);
 ctx.fillStyle="#ffffff";let y=530;for(const line of wrap(ctx,currentProduct.name,790,86)){ctx.font="800 86px system-ui,sans-serif";ctx.fillText(line,127,y);y+=108;}
 ctx.fillStyle="#c7daf4";y+=65;for(const line of wrap(ctx,currentHook,815,54)){ctx.font="700 54px system-ui,sans-serif";ctx.fillText(line,127,y);y+=77;}
 ctx.fillStyle="#9db7d2";ctx.font="38px system-ui,sans-serif";ctx.fillText("Sisipkan visual produk sebenar / berizin",128,1185);
 ctx.fillStyle="#58ecd2";ctx.fillRect(90,1360,900,155);ctx.fillStyle="#0c1830";ctx.font="800 50px system-ui,sans-serif";ctx.fillText("SEMAK MAKLUMAT PRODUK",120,1458);
 ctx.fillStyle="#c9d5e6";ctx.font="36px system-ui,sans-serif";ctx.fillText("Konsep promosi · Bukan produk sebenar",90,1665);ctx.font="30px system-ui,sans-serif";ctx.fillText("Semak fakta dan label kandungan komersial",90,1730);
 canvas.toBlob(b=>{if(b)download(`poster_${slug(currentProduct.name)}.png`,b);},"image/png");}
function parseCSV(text){const rows=[];let row=[],v="",q=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(q&&text[i+1]==='"'){v+='"';i++;}else q=!q;}else if(c===","&&!q){row.push(v);v="";}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&text[i+1]==='\n')i++;row.push(v);v="";if(row.some(x=>x.trim()))rows.push(row);row=[];}else v+=c;}
 if(q)throw new Error("Petikan CSV tidak lengkap.");row.push(v);if(row.some(x=>x.trim()))rows.push(row);return rows;
}
async function importCSV(file){if(!file)return;if(file.size>1000000)throw new Error("Fail CSV melebihi 1 MB.");
 const text=await file.text();const rows=parseCSV(text.replace(/^\uFEFF/,""));if(rows.length<2)throw new Error("CSV mesti ada header dan sekurang-kurangnya satu produk.");const heads=rows.shift().map(x=>x.trim().toLowerCase());
 const col=name=>heads.indexOf(name);if(col("name")<0)throw new Error("CSV mesti ada kolum 'name'.");const list=[];
 for(const [i,row] of rows.slice(0,200).entries()){
 const read=k=>col(k)<0?"":String(row[col(k)]||"").trim();const name=read("name").slice(0,110);if(!name)continue;
 const score=safeNum(read("creative_score"));const price=safeNum(read("price_rm")),percent=safeNum(read("commission_pct"));
 list.push({id:`CSV-${i}`,name,category:read("category").slice(0,60)||"Import",creative_score:Math.min(100,Math.round(score??50)),price_rm:price,commission_pct:percent!==null&&percent<=100?percent:null,verified_features:read("verified_features").slice(0,220),source:"CSV pengguna — perlu disahkan"});
 }
 if(!list.length)throw new Error("Tiada baris produk yang sah.");products=list;current="";currentProduct=null;el("result").textContent="Pilih produk dan jana draf baharu.";["copy","download","poster"].forEach(id=>el(id).disabled=true);render();el("status").textContent=`${list.length} produk dibaca daripada CSV secara setempat. Semak nilai dan fakta sebelum guna.`;
}
el("generate").addEventListener("click",produce);
el("download").addEventListener("click",()=>{if(current)download(`draf_${slug(currentProduct.name)}.txt`,new Blob(["\uFEFF",current],{type:"text/plain;charset=utf-8"}));});
el("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(current);el("status").textContent="Skrip disalin.";}catch{el("status").textContent="Salinan tidak tersedia; gunakan Muat turun TXT.";}});
el("poster").addEventListener("click",createPoster);el("batch").addEventListener("click",exportAll);
el("importCSV").addEventListener("change",async e=>{try{await importCSV(e.target.files[0]);}catch(err){el("status").textContent="CSV gagal dibaca: "+err.message;}e.target.value="";});
render();
