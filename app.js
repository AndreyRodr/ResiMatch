const slides = [...document.querySelectorAll(".slide")];
const notes = [
  {time:"8s",speech:"Olá! Somos a ResiMatch. Acreditamos que o resíduo de uma indústria pode ser oportunidade para outra."},
  {time:"20s",speech:"Indústrias agroindustriais gastam com armazenamento e descarte, enquanto materiais com potencial de reaproveitamento ficam sem compradores. Nossa proposta é conectar essas empresas e transformar desperdício em oportunidade comercial."},
  {time:"23s",speech:"Nosso Canvas parte de três problemas: descarte caro, busca difícil e desperdício. A plataforma prevê cadastro de resíduos, matching e negociação B2B. O Circular Match Score é o diferencial proposto para recomendar conexões compatíveis."},
  {time:"23s",speech:"Atendemos dois públicos: geradores, como processadoras de frutas e café, e compradores, como fabricantes de cosméticos e insumos agrícolas. Analisamos B2Blue e RESI. Queremos nos diferenciar pela especialização agroindustrial; dependemos de nuvem, APIs e apoio técnico."},
  {time:"22s",speech:"Nossa missão proposta é transformar resíduos em oportunidades com inovação e transparência. Planejamos quatro receitas: assinatura de trezentos reais, intermediação de mil, contrato personalizado de dois mil e quinhentos e inteligência de mercado de dois mil reais."},
  {time:"21s",speech:"A operação prevista é digital: cadastrar o lote, analisar características, recomendar compradores e apoiar a negociação. O plano inclui quatro notebooks, um smartphone e a atuação inicial de quatro sócios."},
  {time:"34s",speech:"O investimento estimado soma vinte e dois mil cento e doze reais. No cenário mensal da DRE, projetamos onze mil e quinhentos reais de receita, custos totais de sete mil oitocentos e sessenta e sete reais e resultado operacional de três mil seiscentos e trinta e dois reais. São simulações: o relatório anual do PNBOX apresenta inconsistências."},
  {time:"21s",speech:"Nossas forças planejadas incluem tecnologia e presença digital. Os desafios são conquistar reputação e atender às exigências legais. Nossa estratégia é desenvolver confiança e especialização. ResiMatch: conectar resíduos a novas oportunidades. Obrigado!"}
];
let current=0;
const stage=document.getElementById("slides");
const progress=document.getElementById("progress-fill");
const counter=document.querySelector(".top-counter");
const sectionLabel=document.getElementById("section-label");
const previous=document.getElementById("prev-slide");
const next=document.getElementById("next-slide");
const dots=document.getElementById("slide-dots");
const notesPanel=document.getElementById("speaker-notes");
let notesVisible=false;

slides.forEach((slide,index)=>{
  const dot=document.createElement("button");
  dot.type="button";
  dot.title="Ir para slide "+(index+1)+": "+slide.dataset.title;
  dot.setAttribute("aria-label",dot.title);
  dot.addEventListener("click",()=>showSlide(index));
  dots.appendChild(dot);
});
function showSlide(index){
  const bounded=Math.max(0,Math.min(index,slides.length-1));
  current=bounded;
  slides.forEach((slide,i)=>{
    slide.classList.toggle("active",i===current);
    slide.setAttribute("aria-hidden",String(i!==current));
    if(i===current)slide.scrollTop=0;
  });
  [...dots.children].forEach((dot,i)=>{
    dot.classList.toggle("active",i===current);
    dot.setAttribute("aria-current",i===current?"step":"false");
  });
  counter.textContent=String(current+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
  sectionLabel.textContent=slides[current].dataset.title;
  progress.style.width=((current+1)/slides.length*100)+"%";
  previous.disabled=current===0;
  next.disabled=current===slides.length-1;
  document.getElementById("notes-title").textContent=slides[current].dataset.title;
  document.getElementById("notes-content").textContent=notes[current].speech;
  document.getElementById("notes-duration").textContent="Duração sugerida: "+notes[current].time;
  if(location.hash!=="#slide-"+(current+1))history.replaceState(null,"","#slide-"+(current+1));
}
function setNotes(visible){
  notesVisible=visible;
  notesPanel.classList.toggle("open",visible);
  notesPanel.setAttribute("aria-hidden",String(!visible));
  document.getElementById("notes-toggle").setAttribute("aria-pressed",String(visible));
}
function toggleFullscreen(){
  const root=document.querySelector(".app-shell");
  if(document.fullscreenElement){document.exitFullscreen?.();return;}
  root.requestFullscreen?.();
}
previous.addEventListener("click",()=>showSlide(current-1));
next.addEventListener("click",()=>showSlide(current+1));
document.getElementById("notes-toggle").addEventListener("click",()=>setNotes(!notesVisible));
document.getElementById("notes-close").addEventListener("click",()=>setNotes(false));
document.getElementById("fullscreen-toggle").addEventListener("click",toggleFullscreen);
document.addEventListener("keydown",(event)=>{
  const target=event.target;
  if(target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(target.tagName))return;
  const key=event.key.toLowerCase();
  if(["arrowright","arrowdown","pagedown"," "].includes(key)){
    event.preventDefault();showSlide(current+1);
  }else if(["arrowleft","arrowup","pageup"].includes(key)){
    event.preventDefault();showSlide(current-1);
  }else if(key==="home"){event.preventDefault();showSlide(0);}
  else if(key==="end"){event.preventDefault();showSlide(slides.length-1);}
  else if(key==="n"){setNotes(!notesVisible);}
  else if(key==="f"){toggleFullscreen();}
  else if(key==="escape"&&notesVisible){setNotes(false);}
});
window.addEventListener("hashchange",()=>{
  const hashIndex=Number(location.hash.replace("#slide-",""))-1;
  if(Number.isInteger(hashIndex)&&hashIndex>=0&&hashIndex<slides.length&&hashIndex!==current)showSlide(hashIndex);
});
const initial=Number(location.hash.replace("#slide-",""))-1;
showSlide(Number.isInteger(initial)?initial:0);
