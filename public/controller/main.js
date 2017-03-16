// funcoes importantes para o firebase
window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("logado");
      } else {
        location.href="index.html";
      }
    });
};

function signout() {
    firebase.auth().signOut();
    console.log("deslogado");
}

// usuario
function criaUser() {
    console.log("entrou :)");
    usuario = {
        email: formcliente.email.value,
        nome: formcliente.nome.value,
        pontos: formcliente.pontos.value,
        senha: formcliente.senha.value,
        sexo : formcliente.sexo.value
    };
    addUser(usuario);
}

function addUser(usuario) {
    // Get a key for a new Post.
    newUserKey = firebase.database().ref().child('usuario').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    updates = {};
    updates['/loja/usuario/' + newUserKey] = usuario;

    firebase.database().ref().update(updates);
}

// produto
function criaProduto() {
    console.log("entrou na função criaProduto");
    produto = {
        nome: formproduto.nomeProd.value,
        image: formproduto.imgProd.value,
        descricao: formproduto.descProd.value,
        ponto: formproduto.pontosProd.value
    };
    addProduto(produto);
}

function addProduto(produto) {
    console.log("entrou na função addProduto");
    // Get a key for a new Post.
    newProdKey = firebase.database().ref().child('produto').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    updates = {};
    updates['loja/produto/' + newProdKey] = produto;

    return firebase.database().ref().update(updates);
}


//promocao
function criaPromocao() {
    console.log("entrou na função criaPromocao");
    promocao = {
        image: formpromocao.imgProm.value,
        descricao: formpromocao.descProm.value
    };
    addPromocao(promocao);
}

function addPromocao(promocao) {
    console.log("entrou na função addPromocao");
    // Get a key for a new Post.
    newPromKey = firebase.database().ref().child('promocao').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    updates = {};
    updates['loja/promocao/' + newPromKey] = promocao;

    return firebase.database().ref().update(updates);
}


// servico
function criaServico() {
    console.log("entrou na função criaServico");
    servico = {
        nome: formservico.nomeServ.value,
        image: formservico.imgServ.value,
        descricao: formservico.descServ.value,
        ponto: formservico.pontosServ.value
    };
    addServico(servico);
}

function addServico(servico) {
    console.log("entrou na função addServico");
    // Get a key for a new Post.
    newServKey = firebase.database().ref().child('servico').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    updates = {};
    updates['loja/servico/' + newServKey] = servico;

    return firebase.database().ref().update(updates);
}

function clienteList() {
    cliente.forEach(function (obj) {
        document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Pontos: '+obj.pontos+' Bairro: '+obj.bairro+'</p></a>');
    });
}

produto = [{ nome: "Celular",
             preco: 1400,
             pontos: "50",
             descricao: "Celular muito bom!"
            },
            { nome: "Capinha",
              preco: 30,
              pontos: "3",
              descricao: "Capinha muito boa!"
            },
            { nome: "Carregador",
              preco: 60,
              pontos: "6",
              descricao: "Carrega bem!"
            },
            { nome: "Fones de ouvido",
              preco: 100,
              pontos: "5",
              descricao: "Boa musica!"
            }
];

function produtoList() {
    produto.forEach(function (obj) {
        document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Preço: '+obj.preco+' Descrição: '+obj.descricao+'</p></a>');
    });
}

promocao = [{ nome: "Carnaval de preços baixos",
              descricao: "Venha para essa folia de preços baixos!",
              valida: true
            },
            { nome: "Pascoa de prêmios",
              descricao: "Você não pode perder!",
              valida: true
            },
            { nome: "Arraiá das promoções",
              descricao: "O gerente enlouqueceu!",
              valida: true
            },
            { nome: "Aniversário do MisterSmart",
              descricao: "A gente faz aniversário mas quem ganha o presente é você!",
              valida: true
            }
];

function promocaoList() {
    promocao.forEach(function (obj) {
        document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Ativo: '+obj.valida+' Descrição: '+obj.descricao+'</p></a>');
    });
}

servico = [{ nome: "Aplicar película",
             preco: 25,
             pontos: "4",
             descricao: "Durabilidade garantida!"
            },
            { nome: "Troca de tela",
              preco: 300,
              pontos: "15",
              descricao: "Durabilidade garantida!"
            },
            { nome: "Formatação",
              preco: 15,
              pontos: "3",
              descricao: "Limpa tudo!"
            },
            { nome: "Instalar Whatsapp",
              preco: 4,
              pontos: "1",
              descricao: "Garantimos o funcionamento!"
            }
];

function servicoList() {
    servico.forEach(function (obj) {
        document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Preço: '+obj.preco+' Pontos: '+obj.pontos+' Descrição: '+obj.descricao+'</p></a>');
    });
}

function laco(tipo) {
    if (tipo == "cliente") {
      clienteList();
    }
    else if (tipo == "produto") {
      produtoList();
    }

    else if (tipo == "promoções") {
      promocaoList();
    }

    else if (tipo == "serviços") {
      servicoList();
    }
}

