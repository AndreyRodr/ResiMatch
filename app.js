const slides = [...document.querySelectorAll(".slide")];
const notes = [
  {time:"10–15 segundos",speech:"Olá! Nós somos a ResiMatch. A nossa proposta é simples: o que sobra no processo de uma indústria pode gerar valor para outra. Vamos apresentar como a tecnologia pode aproximar esses dois lados do mercado."},
  {time:"30–35 segundos",speech:"Indústrias agroindustriais enfrentam custos com armazenamento, transporte e descarte de resíduos. Ao mesmo tempo, muitas não conseguem encontrar quem poderia comprar ou reaproveitar esses materiais. Isso cria desperdício econômico. A ResiMatch pretende resolver essa dificuldade cadastrando resíduos, identificando aplicações possíveis e conectando empresas interessadas."},
  {time:"35–40 segundos",speech:"Nosso Lean Canvas reúne três problemas principais: descarte caro, falta de compradores e desperdício de materiais. A solução é uma plataforma de cadastro inteligente com matching e conexões B2B. O diferencial proposto é o Circular Match Score, que relaciona as características dos resíduos às necessidades dos compradores. A receita vem de assinaturas, intermediação, planos personalizados e inteligência de mercado."},
  {time:"30–35 segundos",speech:"O modelo é bilateral. Do lado vendedor estão indústrias de frutas, café, laticínios e cacau. Do lado comprador, setores como cosméticos, nutrição animal, geração de energia e insumos agrícolas. Analisamos também B2Blue e RESI, que já atuam no setor. A ResiMatch pretende competir pela especialização nos resíduos agroindustriais. Nossos principais fornecedores operacionais seriam de nuvem, APIs, dados e serviços técnicos."},
  {time:"30–35 segundos",speech:"Nossa missão proposta é transformar resíduos em oportunidades. Queremos uma operação transparente, eficiente e sustentável. No PNBOX planejamos quatro ofertas: acesso mensal por trezentos reais, intermediação por mil reais, contratos personalizados por dois mil e quinhentos reais e inteligência de mercado por dois mil reais. São preços planejados, ainda não resultados de vendas."},
  {time:"25–30 segundos",speech:"A operação proposta é digital e enxuta. Primeiro a indústria cadastra seu resíduo. Depois o sistema analisa suas características e sugere possíveis aplicações. Em seguida, conecta compradores e vendedores e apoia a negociação. O planejamento financeiro inclui quatro notebooks e um smartphone, e a estrutura inicial considera os quatro sócios, sem funcionários adicionais previstos na planilha."},
  {time:"40–50 segundos",speech:"Nosso investimento inicial estimado soma vinte e dois mil cento e doze reais e setenta e quatro centavos, incluindo equipamentos, despesas pré-operacionais e capital de giro. A simulação mensal do PNBOX prevê onze mil e quinhentos reais de receita, três mil e quarenta e sete reais e cinquenta centavos de custos variáveis e quatro mil oitocentos e vinte de custos fixos. Nesse cenário, o resultado operacional seria de três mil seiscentos e trinta e dois reais e cinquenta centavos. O relatório exportado traz receitas anuais zeradas; por isso estamos apresentando apenas a simulação mensal, que ainda precisa de validação."},
  {time:"35–40 segundos",speech:"Nossa análise estratégica identifica tecnologia, preço competitivo e presença digital como forças. A principal dificuldade será ganhar reputação e experiência no mercado. Também existem oportunidades de redução de custos com insumos alternativos, mas precisamos acompanhar normas e mudanças tecnológicas. A estratégia apontada pelo PNBOX é de manutenção: usar nossas forças para reduzir riscos e construir credibilidade. A ResiMatch ainda é um projeto, mas queremos transformar potencial de reaproveitamento em conexões comerciais reais. Obrigado!"}
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
