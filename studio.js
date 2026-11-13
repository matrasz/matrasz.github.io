"use strict";
// Example topics are NOT live market data, affiliate listings, or verified commission rates.
const products=["Mini phone tripod","Kitchen storage containers","Car phone holder","Reusable stainless bottle","LED desk light","Drawer organizer","Modular shoe rack","Travel packing cubes","Microfiber cloth","Pet grooming brush","Tote bag","Neutral color scarf"];
const templates={
  problem:{hook:(p)=>`Ever find it difficult to stay organized? Here is a closer look at ${p}.`,body:(p,a,f)=>`For ${a}, explore how ${p} might fit into an everyday routine. Demonstrate the actual item and verify any feature before making a claim: ${f}.`,cta:"Review the product details and compare your options before deciding."},
  demo:{hook:(p)=>`Let's look at the real features of ${p}.`,body:(p,a,f)=>`Show close-up shots of the product, dimensions, materials and normal usage. Explain only features you can verify: ${f}. Mention what an intended audience such as ${a} may want to check.`,cta:"Check verified specifications and seller policies before purchasing."},
  routine:{hook:(p)=>`A simple daily routine idea featuring ${p}.`,body:(p,a,f)=>`Film a short, honest scene with ${p} in use. Keep it relevant to ${a}. Include useful detail based on hands-on inspection: ${f}.`,cta:"Explore the listing and decide whether it suits your needs."}
};
const $=id=>document.getElementById(id);
products.forEach((p,i)=>{const o=document.createElement('option');o.value=p;o.textContent=`${String(i+1).padStart(2,'0')}. ${p}`;$('product').appendChild(o);});
let current='';
$('generate').addEventListener('click',()=>{
  const p=$('product').value,angle=$('angle').value,a=$('audience').value.trim().slice(0,120)||'the intended audience',f=$('feature').value.trim().slice(0,220)||'features verified from the actual item';
  const t=templates[angle];
  current=`AFFILIATE AI ROBOT PRO — DRAFT (EXAMPLE ONLY)\n\nProduct: ${p}\nAngle: ${angle}\n\nHOOK (0-3s): ${t.hook(p)}\n\nVIDEO SCRIPT (3-20s): ${t.body(p,a,f)}\n\nCTA (20-25s): ${t.cta}\n\nCAPTION: ${p}: a practical look at how it may fit your routine. Check specifications, price and seller details before choosing. #ProductDemo #ContentIdea\n\nDISCLOSURE: Add the platform-required promotional / affiliate disclosure if applicable.\n\nCHECKLIST: Verify factual claims and commission, use licensed assets, and obtain approval before publishing.\n\nNo real TikTok connection or posting took place.`;
  $('result').textContent=current;$('download').disabled=false;$('copy').disabled=false;$('status').textContent='Draft generated locally in this browser. No data was transmitted.';
});
$('copy').addEventListener('click',async()=>{if(!current)return;try{await navigator.clipboard.writeText(current);$('status').textContent='Draft copied.'}catch(e){$('status').textContent='Copy unavailable in this browser. Select text manually.'}});
$('download').addEventListener('click',()=>{if(!current)return;let blob=new Blob([current],{type:'text/plain;charset=utf-8'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='content-draft-demo.txt';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);$('status').textContent='Local .txt file saved.'});
