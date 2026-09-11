
(() => {
'use strict';
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
// Reveal motion
const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('wv-in');io.unobserve(e.target)}}),{threshold:.08}):null;
$$('.wv-reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%6,5)*45}ms`;if(io)io.observe(el);else el.classList.add('wv-in')});
// Add theme control to floating dock (visual preference only)
const dock=$('.wv-float-dock');
if(dock && !document.body.classList.contains('wv-admin')){
 const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Switch light or night theme');b.title='Light / night theme';b.textContent='◐';dock.insertBefore(b,dock.firstChild);
 const apply=v=>{if(v==='night')document.documentElement.dataset.wvTheme='night';else delete document.documentElement.dataset.wvTheme;b.textContent=v==='night'?'☀':'◐'};
 let pref=localStorage.getItem('westview-theme')||'light';apply(pref);b.addEventListener('click',()=>{pref=document.documentElement.dataset.wvTheme==='night'?'light':'night';localStorage.setItem('westview-theme',pref);apply(pref)});
}else{
 const pref=localStorage.getItem('westview-theme');if(pref==='night')document.documentElement.dataset.wvTheme='night';
}
// Term countdown
const countdown=$('#wvTermCountdown');
if(countdown){
 const terms=[['Term 1','2026-09-03','2026-10-23'],['Term 2','2026-11-02','2026-12-18'],['Term 3','2027-01-04','2027-02-12'],['Term 4','2027-02-22','2027-03-25'],['Term 5','2027-04-12','2027-05-28'],['Term 6','2027-06-07','2027-07-23']];const now=new Date();now.setHours(12,0,0,0);const d=s=>new Date(s+'T12:00:00');let cur=terms.find(t=>now>=d(t[1])&&now<=d(t[2]));let nxt=terms.find(t=>d(t[1])>now);if(cur){const days=Math.max(0,Math.ceil((d(cur[2])-now)/86400000));countdown.textContent=`${days} day${days===1?'':'s'} until ${cur[0]} ends`;}else if(nxt){const days=Math.max(0,Math.ceil((d(nxt[1])-now)/86400000));countdown.textContent=`${days} day${days===1?'':'s'} until ${nxt[0]} begins`;}else countdown.textContent='2026/27 school year complete';
}
// Lightweight live metrics, using the same publishable-key/RLS setup as the rest of Westview.
const cfg=window.WESTVIEW_CONFIG||{};const base=String(cfg.supabaseUrl||'').replace(/\/$/,'');const key=String(cfg.supabaseKey||'');const ok=/^https:\/\/.+\.supabase\.co$/i.test(base)&&key&&!key.startsWith('PASTE_');
async function rows(table,q=''){const r=await fetch(`${base}/rest/v1/${table}${q}`,{headers:{apikey:key,Accept:'application/json'}});if(!r.ok)throw new Error(table);return r.json()}
const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
if(ok && ($('#wvMetricStaff')||$('#wvStatStaff'))){Promise.allSettled([
 rows('staff','?select=id&published=eq.true'),rows('documents','?select=id,published_on&published=eq.true'),rows('news','?select=id,published_on&published=eq.true'),rows('events','?select=id,event_date&published=eq.true&order=event_date.asc')
]).then(res=>{const now=new Date();now.setHours(23,59,59,999);const val=i=>res[i].status==='fulfilled'?res[i].value:[];const staff=val(0).length;const docs=val(1).filter(x=>new Date(x.published_on+'T12:00:00')<=now).length;const news=val(2).filter(x=>new Date(x.published_on+'T12:00:00')<=now).length;const ev=val(3).filter(x=>new Date(x.event_date+'T12:00:00')>=new Date(new Date().setHours(0,0,0,0))).length;set('wvMetricStaff',staff);set('wvMetricDocs',docs);set('wvMetricNews',news);set('wvMetricEvents',ev);set('wvStatStaff',staff?`${staff} profiles`:'Directory');set('wvStatDocs',docs?`${docs} files`:'Document Hub');set('wvStatEvents',ev?`${ev} upcoming`:'Calendar')})}
// Make mobile menu include new hubs even on older page markup
const mobile=$('.mobile-panel');if(mobile&&!mobile.querySelector('a[href="today.html"]')){const label=document.createElement('div');label.className='mobile-label';label.textContent='Portals';const a1=document.createElement('a');a1.href='today.html';a1.textContent='Westview Today';const a2=document.createElement('a');a2.href='student-hub.html';a2.textContent='Student Hub';mobile.prepend(a2);mobile.prepend(a1);mobile.prepend(label)}
})();
