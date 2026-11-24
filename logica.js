const imagem = document.getElementById('img');
const btnLamp = document.getElementById('lampBtn');
const dark = document.getElementById('filtroLuz');
const btnLaptop = document.getElementById('laptopBtn');
const laptop = document.getElementById('containerLaptop');
const laptopSairBtn = document.getElementById('sairLaptop');

//som efeito

const papelSom = document.getElementById('somPapel');
const btnSom = document.getElementById('somBtn');
const escritaSom = document.getElementById('somEscrita');
const livroSom = document.getElementById('somLivro');
const lampadaSom = document.getElementById('somLampada');

//diario
const mostrarNota = document.getElementById('notaMostrar');






btnLamp.addEventListener('click', () => {
    lampadaSom.currentTime = 0;
    lampadaSom.play();
    dark.classList.toggle('apagada'); //pega a div, interruptor ativa
});


//NOTEBOOK

btnLaptop.addEventListener('click', () => {
    laptop.style.display ='flex';
});

laptopSairBtn.addEventListener('click', () => {
    laptop.style.display ='none';
});







//-----------------DIÁRIO---------------------------------------
const diary = document.getElementById('diario');

const btnDiary = document.getElementById('diarioBtn');
const backBtnDiary = document.getElementById('sairDiario');
const btnSave = document.getElementById('salvar');
const btnApagar = document.getElementById('apagar');

const inputName = document.getElementById('nomeDiario');
const inputDate = document.getElementById('dataDiario');
const inputHumor = document.getElementById('humorDiario');
const inputText = document.getElementById('textoCaixa');

//abrir janela
btnDiary.addEventListener('click', () => {
    diary.style.display = 'flex';
    papelSom.currentTime = 0;
    papelSom.play();
});
 
 let indexAtual = null; //ele vai guardar a aba que está aberta(depois que clica no btn da nota)
 

 function renderizarDiario() {
    const list = document.getElementById('lista'); //html
    const notasSalvas = JSON.parse(localStorage.getItem('notas'))  || []; //lê oq está na gaveta do localstorage

    list.innerText = "";//limpei?

    notasSalvas.forEach((nota, index) => {
        const botao = document.createElement('button'); //crio um btn
        botao.innerText = nota.nome; 
        botao.classList.add('btnLista');

        botao.addEventListener('click', () => { //quando clicar no btn
            papelSom.currentTime = 0;
            papelSom.play(); //som do btn
            const infoNotaLocal = document.getElementById('localinfoNota');
            const textoLocal = document.getElementById('localTexto'); //onde o texto salvo vai ficar 
            textoLocal.style.fontFamily = "Caveat, cursive";
            infoNotaLocal.style.fontFamily = "Caveat, cursive";
            indexAtual = index; //variavel vai guardar o id(usar depois)
            infoNotaLocal.innerHTML = ` 
            <p><strong>Nome: </strong>${nota.nome}</p>
            <p><strong>Data: </strong>${nota.data}</p>
            <p><strong>Emoção: </strong>${nota.humor}</p>
            ` 
            textoLocal.innerHTML = ` 
            <p>${nota.texto}</p>
            ` 

            mostrarNota.style.display = 'flex'; //abro o popup
        });

        list.appendChild(botao); //tentei por na lista
        
    });
     
 };

 renderizarDiario();



 const listaGuarda = JSON.parse(localStorage.getItem('notas')) || [];

// SALVAR NOTA


btnSave.addEventListener('click', () => {
    escritaSom.currentTime = 0;
    escritaSom.play();
    
    const nameInput = inputName.value.trim();
    const dateInput = inputDate.value.trim();
    const humorInput = inputHumor.value.trim();
    const textInput = inputText.value.trim();

    if(nameInput === "" || dateInput === "" || humorInput === "" || textInput === "") {
        msgErro.innerHTML = "Ei! Preencha todos os campos por favor :3"
        return;
    }

    const nota = { //crio o objeto
        nome: nameInput,
        data: dateInput,
        humor: humorInput,
        texto: textInput
    };

    listaGuarda.push(nota); //coloca o objt na lista ao adicionar

    localStorage.setItem("notas", JSON.stringify(listaGuarda)); 
    //1: setItem ponhe, 2: "o nome da gaveta", 3: json.stringify transforma a array em texto (local n entende array) 
    //4: (o nome da minha array)
   
    //dou uma limpadinha depois 
    inputName.value = "";
    inputDate.value = "";
    inputHumor.value = "";
    inputText.value = "";

    msgErro.innerText = ""; //limpa caso tenha dado erro anteriormente

    renderizarDiario();
});

btnApagar.addEventListener('click', () => {
    inputName.value = "";
    inputDate.value = "";
    inputHumor.value = "";
    inputText.value = "";
});

//fechar janela
backBtnDiary.addEventListener('click', () => {
    diary.style.display = 'none';
    papelSom.currentTime = 0;
    papelSom.play(); //som do btn
})




//POPUP: MOSTRAR NOTA SALVA

const notaVoltarBtn = document.getElementById('voltarNota'); //btn voltar
const notaExcluirBtn = document.getElementById('excluirNota'); //btn excluir

notaVoltarBtn.addEventListener('click', () => {
    mostrarNota.style.display = "none";
    papelSom.currentTime = 0;
    papelSom.play(); //som do btn
});

notaExcluirBtn.addEventListener('click', () => {
   listaGuarda.splice(indexAtual,1); //arranca um item do index referente ao btn clicado
   localStorage.setItem("notas",JSON.stringify(listaGuarda)); //salva a lista de novo sem a nota excluida
   mostrarNota.style.display = 'none'; //fecho já que essa nota n existe mais
   renderizarDiario(); //desenha os btns de novo
});




//------------------------------FIM DO DIÁRIO---------------------------------------//








//----------------------------------POEMA-------------------------------------------//
const btnPoema = document.getElementById('poemaBtn');
const btnPoemaSair = document.getElementById('btnSairPoema');
const poemaTela = document.getElementById('poema');

const inputTitulo = document.getElementById('tituloPoema');
const inputPoema = document.getElementById('inputPoema');



//abrir a tela do poema
btnPoema.addEventListener('click', () =>{
    poemaTela.style.display = 'flex';
    btnSom.currentTime = 0;
    btnSom.play();
});


//MOSTRAR POEMA

const btnSairMostrarPoema = document.getElementById('sairMostrarPoema');
const poemaMostrar = document.getElementById('mostrarPoema');
const cincobtn = document.querySelectorAll('.btnPoema'); //carrega os 5 btn de uma vez
const poemaAdicionar = document.getElementById('adicionarPoema');
const poemaDeletar = document.getElementById('deletarPoema');


let indexPoemaAberto = null; //vários elem abriram uma unica coisa, precisa do index de cada

const poemas = JSON.parse(localStorage.getItem("poemas")) || [{titulo: "", poema: ""}, {titulo: "", poema: ""}, {titulo: "", poema: ""},
    {titulo: "", poema: ""}, {titulo: "", poema: ""}
]; //uma lista com 5 objetos vazios;





//abrir mostrarPoema
cincobtn.forEach((botao, index) =>{ //como é uma lista de 5 btn, precisa ter o evento em cada um dos elementos

    botao.addEventListener('click', () => { //click do botao
    livroSom.currentTime = 0;
    livroSom.play();

    poemaMostrar.style.display = 'flex'; //abre o poema escrito
    indexPoemaAberto = index; //pega o id do objeto e guarda na v do começo

    renderizarPoema(indexPoemaAberto); //renderiza o poema aberto
})
});

//ADICIONAR
poemaAdicionar.addEventListener('click',() => {
    escritaSom.currentTime = 0;
    escritaSom.play();
     ""
    function adicionarPoema() {

    //Guarda o input na array, no objeto com id na v. aberto
        poemas[indexPoemaAberto].titulo = inputTitulo.value.trim();
        poemas[indexPoemaAberto].poema = inputPoema.value.trim();


        //salva a array no localstorage
        localStorage.setItem("poemas", JSON.stringify(poemas));


        inputTitulo.value = "";
        inputPoema.value = "";      
        poemaMostrar.style.display = 'none';
};

adicionarPoema();
renderizarPoema(indexPoemaAberto);
});

function carregarEstante(){ //carregar ao dar F5, lerá cada objeto, e não o aberto atualmente
    cincobtn.forEach((botao,index) =>{
        botao.innerText = poemas[index].titulo //coloca o titulo dentro do btn(variável com 5 btns não 5 objetos)

    });
};

carregarEstante();

function renderizarPoema(indexPoemaAberto){ //renderiza um único objeto

    inputTitulo.value = ""; //tentando limpar
    inputTitulo.value = "";

    inputTitulo.value = poemas[indexPoemaAberto].titulo; //inverso: ponhe o titulo desse id da array em uma variável
    inputPoema.value = poemas[indexPoemaAberto].poema;

    if(poemas[indexPoemaAberto].titulo === ""){ // se o titulo desse poema estiver vazio...
        cincobtn[indexPoemaAberto].innerText = ""; //limpa o botao do poema aberto
        poemaAdicionar.style.display = 'block'; //Usa 'block' para um btn simples, 'flex' ativa flexbox (justify, align..)
        poemaDeletar.style.display = 'none';
        inputTitulo.readOnly = false;  //readOnly permite só a leitura, como 'false' está desativada
        inputPoema.readOnly = false;
    }else{ //se tiver titulo na memória
        poemaAdicionar.style.display = 'none'; 
        poemaDeletar.style.display = 'block';

        //ponhe o titulo no btn (livro)

        cincobtn[indexPoemaAberto].innerText = poemas[indexPoemaAberto].titulo; 

        inputTitulo.readOnly = true; //apenas leitura
        inputPoema.readOnly = true;
    };

};

poemaDeletar.addEventListener('click', ()=>{
        poemas[indexPoemaAberto].titulo = ""; //apaga o titulo da array
        poemas[indexPoemaAberto].poema = "";

        localStorage.setItem("poemas", JSON.stringify(poemas)); //atualiza localStorage

        poemaMostrar.style.display = 'none';
renderizarPoema(indexPoemaAberto);
});


//fechar mostrarPoema
btnSairMostrarPoema.addEventListener('click', () => {
    poemaMostrar.style.display = 'none';
    papelSom.currentTime = 0;
    papelSom.play()
});

btnPoemaSair.addEventListener('click', () =>{
    poemaTela.style.display = 'none';
    btnSom.currentTime = 0;
    btnSom.play();
});








//MUSICA DO QUARTO

const pauseBtn = document.getElementById('btnPause');
const musicaQuarto = document.getElementById('somQuarto');
musicaQuarto.volume = 0.3;
pauseBtn.addEventListener('click', () => {
    btnSom.currentTime = 0;
    btnSom.play();
    if(musicaQuarto.paused) {
        musicaQuarto.play();
        pauseBtn.innerHTML = "⏸️";
    }else{
        musicaQuarto.pause();
        pauseBtn.innerHTML = "🎵";
    };
});




