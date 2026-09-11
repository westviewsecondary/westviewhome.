
(() => {
'use strict';
const $=(q,r=document)=>r.querySelector(q); const $$=(q,r=document)=>[...r.querySelectorAll(q)];
const body=document.body;
// Scroll progress
const progress=()=>{const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;h.style.setProperty('--wv-scroll',max?String(h.scrollTop/max):'0')};
document.addEventListener('scroll',progress,{passive:true});progress();
// Active link highlighting
const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();$$('a[href]').forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();if(href===file){a.setAttribute('aria-current','page');a.classList.add('wv-current')}});
// Close desktop dropdown when another opens
$$('.nav details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.nav details').forEach(o=>{if(o!==d)o.open=false})}));
document.addEventListener('click',e=>{if(!e.target.closest('.nav'))$$('.nav details[open]').forEach(d=>d.open=false)});
// Floating dock
if(!body.matches('.wv-admin')){
 const dock=document.createElement('div');dock.className='wv-float-dock';dock.innerHTML='<button type="button" data-wv-search aria-label="Quick search" title="Quick search">⌕</button><a href="calendar.html" aria-label="Calendar" title="Calendar">▦</a><button type="button" data-wv-top aria-label="Back to top" title="Back to top">↑</button>';body.appendChild(dock);dock.querySelector('[data-wv-top]').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
 const modal=document.createElement('div');modal.className='wv-command-search';modal.innerHTML='<div class="wv-command-search-box" role="dialog" aria-modal="true" aria-label="Westview quick search"><input id="wvQuickSearch" placeholder="Search Westview…" autocomplete="off"/><div class="wv-command-search-links"><a href="calendar.html">Calendar</a><a href="documents.html">Documents</a><a href="news.html">News</a><a href="staff.html">Staff</a><a href="transport.html">Transport</a><a href="igradeplus.html">iGradePlus</a><a href="exams.html">Exams</a><a href="safeguarding.html">Safeguarding</a><a href="contact.html">Contact</a></div><p class="wv-command-search-hint">Press Enter for the full search page · Esc to close</p></div>';body.appendChild(modal);
 const input=modal.querySelector('input'); const open=()=>{modal.classList.add('show');setTimeout(()=>input.focus(),0)}; const close=()=>modal.classList.remove('show');
 dock.querySelector('[data-wv-search]').addEventListener('click',open);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')){e.preventDefault();open()}});input.addEventListener('keydown',e=>{if(e.key==='Enter'&&input.value.trim())location.href='search.html?q='+encodeURIComponent(input.value.trim())});
}
// Current school year/term summaries used on homepage.
const terms=[
 {name:'Term 1',start:'2026-09-03',end:'2026-10-23',next:'Autumn break'},
 {name:'Term 2',start:'2026-11-02',end:'2026-12-18',next:'Winter holiday'},
 {name:'Term 3',start:'2027-01-04',end:'2027-02-12',next:'February break'},
 {name:'Term 4',start:'2027-02-22',end:'2027-03-25',next:'Spring holiday'},
 {name:'Term 5',start:'2027-04-12',end:'2027-05-28',next:'May break'},
 {name:'Term 6',start:'2027-06-07',end:'2027-07-23',next:'Summer holiday'}
];
const localToday=new Date();localToday.setHours(12,0,0,0);const parse=s=>new Date(s+'T12:00:00');const fmt=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
let current=terms.find(t=>localToday>=parse(t.start)&&localToday<=parse(t.end));let upcoming=terms.find(t=>parse(t.start)>localToday);
const termEl=$('#wvCurrentTerm'),nextEl=$('#wvNextTerm'),nextDateEl=$('#wvNextKeyDate');if(termEl)termEl.textContent=current?current.name:'Summer break';if(nextEl)nextEl.textContent=current?`${current.next} after ${fmt(parse(current.end))}`:upcoming?`${upcoming.name} starts ${fmt(parse(upcoming.start))}`:'2026/27 year complete';if(nextDateEl&&!nextDateEl.dataset.liveFilled)nextDateEl.textContent=upcoming?`${fmt(parse(upcoming.start))} · ${upcoming.name}`:'Check the school calendar';
})();
