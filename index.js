// Crie uma instância da fila
let minhaFila = new FilaCircular(5);

// Função para adicionar um elemento à fila
function adicionarElemento() {
  let nome = document.getElementById("txtnovoNome").value;
  let cpf = document.getElementById("txtnovoCpf").value;
  let data = obterDataAtual();
  let hora = obterHoraAtual();

  if (cpf === "" || nome === "") {
    alert("Preencha os campos!");
  } else {
    let novoAtendimento = new Atendimento(nome,cpf,data,hora);
    if (minhaFila.enqueue(novoAtendimento)) {
    } else {
      alert("A fila está cheia.");
    }
  }
  atualizarFila();
  limparCampos();
}
//--------------------------------------------------------------------------------------------
// Função para remover o primeiro elemento da fila
function removerElemento() {
  if (minhaFila.isEmpty()) {
    alert("A fila está vazia!")
  } else {
    let pessoaAtendida = minhaFila.dequeue();
    mostrarMensagemRemocao(pessoaAtendida);

  }

  atualizarFila();
  limparCampos();
}
//--------------------------------------------------------------------------------
function buscarCpf() {

  let cpfEncontrado = false;
  let posicao = 1;
  let cpfDigitado = document.getElementById("txtnovoCpf").value;

  for (let pessoa of minhaFila) {
    if (pessoa.cpf === cpfDigitado) {
      cpfEncontrado = true;
      break;
    }
    posicao++;
  }

  if (cpfEncontrado) {
    alert("CPF encontrado na fila! Posição: " + posicao);
  } else {
    alert("CPF não foi encontrado.");
  }
  limparCampos();
}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
  let horaAtendimento = obterHoraAtual();
  let tempoDeEspera = calcularDiferencaHoras(pessoaAtendida.hora, horaAtendimento);
  let mensagemRemocao = document.getElementById("mensagem-remocao");

  mensagemRemocao.innerHTML = `Chamando para ser atendido(a): ${pessoaAtendida.nome}
  às ${pessoaAtendida.hora}, está sendo atendido(a) às ${horaAtendimento}. 
  Tempo de espera: ${tempoDeEspera}.`;

}
//--------------------------------------------------------------------------------------------
// Função para atualizar a exibição da fila
function atualizarFila() {
  let listaFila = document.getElementById("listFila");
  listaFila.innerHTML = "";
  if (minhaFila.qtd === 0) {
    document.getElementById("lblPessoasFila").textContent = "Fila vazia!";
  } else {
    document.getElementById("lblPessoasFila").textContent = "Pessoas na fila: ";
  }
  document.getElementById("listFila").innerHTML = minhaFila.toString();

}
//--------------------------------------------------------------------------------------------
function limparCampos() {
  document.getElementById("txtnovoNome").value = "";
  document.getElementById("txtnovoCpf").value = "";
}
//--------------------------------------------------------------------------------------------
// funcao data
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);

  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}