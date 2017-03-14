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

cliente = [{ nome: "Fulano",
              pontos: 140,
              bairro: "Malvinas"
            },
            { nome: "Sicrano",
              pontos: 120,
              bairro: "Cruzeiro"
            },
            { nome: "Jones",
              pontos: 160,
              bairro: "Catole"
            },
            { nome: "Peter",
              pontos: 140,
              bairro: "Dens"
            }
];

function clienteList() {
  for (obj of cliente) {
    document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Pontos: '+obj.pontos+' Bairro: '+obj.bairro+'</p></a>');
  }
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
  for (obj of produto) {
    document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Preço: '+obj.preco+' Descrição: '+obj.descricao+'</p></a>');
  }
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
  for (obj of promocao) {
    document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Ativo: '+obj.valida+' Descrição: '+obj.descricao+'</p></a>');
  }
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
  for (obj of servico) {
    document.write('<a href="#'+ obj.nome +'" class="list-group-item"><h4 class="list-group-item-heading">'+ obj.nome +'</h4><p class="list-group-item-text"> Preço: '+obj.preco+' Pontos: '+obj.pontos+' Descrição: '+obj.descricao+'</p></a>');
  }
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

function showObj(id) {
  document.write(id);
}
