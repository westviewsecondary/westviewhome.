(()=>{'use strict';
const button=document.querySelector('.menu-toggle'),nav=document.getElementById('school-navigation');
button?.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
document.addEventListener('click',e=>{if(button?.getAttribute('aria-expanded')==='true'&&!e.target.closest('.header')){button.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.nav details[open]').forEach(d=>d.open=false);if(button?.getAttribute('aria-expanded')==='true'){button.click();button.focus()}}});
// Keep the previous quick search and give its dialog keyboard focus containment.
const dialog=document.querySelector('.wv-command-search');
dialog?.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=[...dialog.querySelectorAll('input,a,button')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
const input=document.getElementById('wvQuickSearch');if(input)input.setAttribute('aria-label','Search Westview');
const docSearch=document.getElementById('wvDocSearch');if(docSearch)docSearch.setAttribute('aria-label','Search school documents');
})();
