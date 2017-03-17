

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
}

// usuario
function criaUser() {
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
    produto = {
        nome: formproduto.nomeProd.value,
        image: formproduto.imgProd.value,
        descricao: formproduto.descProd.value,
        ponto: formproduto.pontosProd.value
    };
    addProduto(produto);
}

function addProduto(produto) {
    // Get a key for a new Post.
    newProdKey = firebase.database().ref().child('produto').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    updates = {};
    updates['loja/produto/' + newProdKey] = produto;

    return firebase.database().ref().update(updates);
}


//promocao
function criaPromocao() {
    promocao = {
        image: formpromocao.imgProm.value,
        descricao: formpromocao.descProm.value
    };
    addPromocao(promocao);
}

function addPromocao(promocao) {
    // Get a key for a new Post.
    newPromKey = firebase.database().ref().child('promocao').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    updates = {};
    updates['loja/promocao/' + newPromKey] = promocao;

    return firebase.database().ref().update(updates);
}


// servico
function criaServico() {
    servico = {
        nome: formservico.nomeServ.value,
        image: formservico.imgServ.value,
        descricao: formservico.descServ.value,
        ponto: formservico.pontosServ.value
    };
    addServico(servico);
}

function addServico(servico) {
    // Get a key for a new Post.
    newServKey = firebase.database().ref().child('servico').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    updates = {};
    updates['loja/servico/' + newServKey] = servico;

    return firebase.database().ref().update(updates);
}

// recuperacao de dados

function clienteList() {
    var clientelist = document.getElementById("clientelist");
    const refUser = firebase.database().ref().child('loja/usuario');

    refUser.on('value', function(snapshot) {
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(obj.nome));
            h4.className = "list-group-item-heading";

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Pontos: "+obj.pontos));
            p.className = "list-group-item-text";


            var a = document.createElement('a');
            a.appendChild(h4);
            a.appendChild(p);
            a.className = "list-group-item";
            a.href = "#"+ obj.nome;

            clientelist.appendChild(a);

        })
    });

}

function produtoList() {
    const refProd = firebase.database().ref().child('loja/produto');
    var produtolist = document.getElementById("produtolist");

    refProd.on('value', function(snapshot) {
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(obj.nome));
            h4.className = "list-group-item-heading";

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Descrição: "+obj.descricao+"\n Imagem!!!: "+obj.image));
            p.className = "list-group-item-text";

            var a = document.createElement('a');
            a.appendChild(h4);
            a.appendChild(p);
            a.className = "list-group-item";
            a.href = "#"+ obj.nome;


            produtolist.appendChild(a);
        })
    });
}

function promocaoList() {
    const refProm = firebase.database().ref().child('loja/promocao');
    var promocaolist = document.getElementById("promocaolist");

    refProm.on('value', function(snapshot) {
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode("Imagem!!!: "+obj.image));
            h4.className = "list-group-item-heading";

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Descrição: "+obj.descricao));
            p.className = "list-group-item-text";

            var a = document.createElement('a');
            a.appendChild(h4);
            a.appendChild(p);
            a.className = "list-group-item";
            a.href = "#"+ obj.nome;


            promocaolist.appendChild(a);
        })
    });
}


function servicoList() {
    const refServ = firebase.database().ref().child('loja/servico');
    var servicolist = document.getElementById("servicolist");

    refServ.on('value', function(snapshot) {
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(obj.nome));
            h4.className = "list-group-item-heading";

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Descrição: "+obj.descricao+" Imagem!!!: "+obj.image));
            p.className = "list-group-item-text";

            var a = document.createElement('a');
            a.appendChild(h4);
            a.appendChild(p);
            a.className = "list-group-item";
            a.href = "#"+ obj.nome;


            servicolist.appendChild(a);
        })
    });
}

function laco(tipo) {
    if (tipo === "cliente") {
        clienteList();
    }
    else if (tipo === "produto") {
      produtoList();
    }

    else if (tipo === "promoções") {
      promocaoList();
    }

    else if (tipo === "serviços") {
      servicoList();
    }
}

function showForm(id) {
    var formElem = document.getElementById(id);
    if (formElem.style.visibility === 'hidden') {
        formElem.style.visibility = 'visible';
    } else {
        formElem.style.visibility = 'hidden';
    }
}