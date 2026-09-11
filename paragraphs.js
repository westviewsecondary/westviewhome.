(()=>{'use strict';
const ids=['docBody','docSummary','newsSummary','closureMessage','eventDetails','transportDetails','vacancySummary'];
for(const id of ids){
 const area=document.getElementById(id);if(!area)continue;
 const tools=document.createElement('div');tools.className='paragraph-toolbar';tools.setAttribute('aria-label','Paragraph tools');
 const add=document.createElement('button'),space=document.createElement('button'),undo=document.createElement('button');
 for(const b of [add,space,undo])b.type='button';add.textContent='Add paragraph';space.textContent='Space existing lines';undo.textContent='Undo formatting';undo.disabled=true;
 tools.append(add,space,undo);area.insertAdjacentElement('beforebegin',tools);
 const details=document.createElement('details');details.className='paragraph-preview';
 const summary=document.createElement('summary');summary.textContent='Preview text';
 const preview=document.createElement('div');preview.className='letter-preview';details.append(summary,preview);area.insertAdjacentElement('afterend',details);
 let previous=null;
 const render=()=>{preview.replaceChildren();const text=area.value.trim();if(!text){const p=document.createElement('p');p.textContent='Your preview will appear here.';preview.append(p);return}text.split(/\n[ \t]*\n+/).forEach(chunk=>{const p=document.createElement('p');p.textContent=chunk;preview.append(p)})};
 const update=(value,cursor)=>{if(area.maxLength>0&&value.length>area.maxLength){alert('This change would exceed the text limit. Shorten the text first.');return}previous=area.value;undo.disabled=false;area.value=value;area.dispatchEvent(new Event('input',{bubbles:true}));area.focus();if(cursor!==undefined)area.setSelectionRange(cursor,cursor)};
 add.addEventListener('click',()=>{const start=area.selectionStart,end=area.selectionEnd;update(area.value.slice(0,start)+'\n\n'+area.value.slice(end),start+2)});
 space.addEventListener('click',()=>update(area.value.replace(/\r\n?/g,'\n').split(/\n+/).map(s=>s.trim()).filter(Boolean).join('\n\n')));
 undo.addEventListener('click',()=>{if(previous===null)return;area.value=previous;previous=null;undo.disabled=true;area.dispatchEvent(new Event('input',{bubbles:true}));area.focus()});
 area.addEventListener('input',render);area.closest('form')?.addEventListener('reset',()=>{previous=null;undo.disabled=true;setTimeout(render,0)});render();
}
})();
