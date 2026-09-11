
(() => {
'use strict';const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)];
const dash=$('#dashboard');if(!dash)return;
const main=$('.admin-main')||dash;
// HUD
const hud=document.createElement('div');hud.className='wv-admin-hud';hud.innerHTML='<div><strong>Westview Control Room</strong><div style="font-size:.72rem;margin-top:2px">Horizon admin cockpit · existing Supabase data preserved</div></div><div class="wv-admin-hud-actions"><button class="wv-admin-mini" data-expand>Expand all</button><button class="wv-admin-mini" data-collapse>Collapse all</button><a class="wv-admin-mini" href="today.html" target="_blank" style="text-decoration:none">Open Today ↗</a></div>';
main.prepend(hud);
// Collapsible admin cards without changing any form IDs.
const cards=$$('.card',main).filter(c=>!c.classList.contains('intro'));
cards.forEach(c=>{const h=c.querySelector('h2');if(!h)return;const b=document.createElement('button');b.className='wv-admin-collapse';b.type='button';b.title='Collapse section';b.textContent='−';h.prepend(b);b.addEventListener('click',e=>{e.stopPropagation();const collapsed=c.classList.toggle('wv-card-collapsed');[...c.children].forEach(ch=>{if(ch!==h)ch.hidden=collapsed});b.textContent=collapsed?'+':'−'})});
$('[data-collapse]')?.addEventListener('click',()=>cards.forEach(c=>{const h=c.querySelector('h2'),b=c.querySelector('.wv-admin-collapse');if(!h||!b)return;c.classList.add('wv-card-collapsed');[...c.children].forEach(ch=>{if(ch!==h)ch.hidden=true});b.textContent='+'}));
$('[data-expand]')?.addEventListener('click',()=>cards.forEach(c=>{const h=c.querySelector('h2'),b=c.querySelector('.wv-admin-collapse');if(!h||!b)return;c.classList.remove('wv-card-collapsed');[...c.children].forEach(ch=>ch.hidden=false);b.textContent='−'}));
// Toast significant status messages.
const toast=document.createElement('div');toast.className='wv-admin-toast';document.body.appendChild(toast);let t;
const obs=new MutationObserver(ms=>ms.forEach(m=>{const el=m.target;if(!el.classList?.contains('status'))return;const txt=el.textContent.trim();if(!txt||/loading/i.test(txt))return;toast.textContent=txt;toast.classList.add('show');clearTimeout(t);t=setTimeout(()=>toast.classList.remove('show'),2600)}));$$('.status').forEach(s=>obs.observe(s,{childList:true,subtree:true,characterData:true}));
})();
