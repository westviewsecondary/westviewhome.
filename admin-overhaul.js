
(() => {
'use strict';
const $=(q,r=document)=>r.querySelector(q), $$=(q,r=document)=>[...r.querySelectorAll(q)];
document.body.classList.add('wv-admin');
const dash=$('#dashboard'); if(!dash)return;
// IDs for jump navigation, preserving all existing form IDs.
const cards=$$('#dashboard .grid > .card');
const ids=['closure-card','banner-card','school-details-card','houses-card','news-card-admin','events-card-admin','staff-card','transport-card','vacancies-card','results-card','documents-card'];
cards.forEach((c,i)=>{if(!c.id)c.id=ids[i]||`admin-card-${i+1}`});
const side=document.createElement('aside');side.className='admin-side';side.innerHTML=`<div class="side-title">Control sections</div><nav>
<a href="#closure-card">Urgent notices</a><a href="#school-details-card">School details</a><a href="#houses-card">House points</a><div class="side-sep"></div><a href="#news-card-admin">News</a><a href="#events-card-admin">Events</a><a href="#staff-card">Staff</a><a href="#transport-card">Transport</a><a href="#vacancies-card">Vacancies</a><a href="#results-card">Exam results</a><a href="#documents-card">PDF library</a><div class="side-sep"></div><a href="index.html" target="_blank">Open public website ↗</a></nav>`;
const main=document.createElement('div');main.className='admin-main';while(dash.firstChild)main.appendChild(dash.firstChild);dash.append(side,main);
// command shortcuts
const intro=$('.intro',main);if(intro){const cmd=document.createElement('div');cmd.className='admin-command';cmd.innerHTML='<a href="#documents-card"><span>Fast action</span><strong>Upload a PDF</strong></a><a href="#staff-card"><span>People</span><strong>Add / edit staff</strong></a><a href="#events-card-admin"><span>Calendar</span><strong>Add an event</strong></a><a href="#closure-card"><span>Emergency</span><strong>School notice</strong></a>';intro.insertAdjacentElement('afterend',cmd)}
const safety=$('.safety-note',main);if(safety){const filter=document.createElement('div');filter.className='admin-filter';filter.innerHTML='<label for="adminSectionFilter">Find a control</label><input id="adminSectionFilter" placeholder="Type staff, transport, exams, PDF…"/>';safety.insertAdjacentElement('afterend',filter);const inp=$('#adminSectionFilter');inp.addEventListener('input',()=>{const q=inp.value.trim().toLowerCase();cards.forEach(c=>c.style.display=!q||c.textContent.toLowerCase().includes(q)?'':'none')})}
// last sync indicator
const sync=document.createElement('div');sync.className='wv-sync';sync.id='wvLastSync';sync.textContent='Ready to sync';const introCopy=$('.intro .muted',main);introCopy?.insertAdjacentElement('afterend',sync);
const refresh=$('#refreshAll');refresh?.addEventListener('click',()=>sync.textContent='Last refreshed: '+new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}));
// Unsaved-change indicator, informational only.
const ind=document.createElement('div');ind.className='wv-save-indicator';ind.textContent='Unsaved changes on this screen';document.body.appendChild(ind);let timer;$$('input,textarea,select',main).forEach(el=>el.addEventListener('input',()=>{ind.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>ind.classList.remove('show'),4000)}));$$('button',main).forEach(b=>b.addEventListener('click',()=>ind.classList.remove('show')));
})();
