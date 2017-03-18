// funcoes importantes
var selecionado;

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

function seleciona(id) {
    selecionado = document.getElementById(id).id;
    console.log(selecionado);

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
    newUserKey = firebase.database().ref().child('usuario').push().key;
    updates = {};
    updates['/loja/usuario/' + newUserKey] = usuario;

    firebase.database().ref().update(updates);
    location.reload();

}

function dropUser() {
    firebase.database().ref().child('/loja/usuario/'+selecionado).remove();
    selecionado = null;
    location.reload();
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
    newProdKey = firebase.database().ref().child('produto').push().key;
    updates = {};
    updates['loja/produto/' + newProdKey] = produto;

    firebase.database().ref().update(updates);
    location.reload();
}

function dropProduto() {
    firebase.database().ref().child('/loja/produto/' + selecionado).remove();
    selecionado = null;
    location.reload();
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
    newPromKey = firebase.database().ref().child('promocao').push().key;
    updates = {};
    updates['loja/promocao/' + newPromKey] = promocao;

    firebase.database().ref().update(updates);
    location.reload();
}

function dropPromocao() {
    firebase.database().ref().child('/loja/promocao/' + selecionado).remove();
    selecionado = null;
    location.reload();
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
    newServKey = firebase.database().ref().child('servico').push().key;
    updates = {};
    updates['loja/servico/' + newServKey] = servico;

    firebase.database().ref().update(updates);
    location.reload();
}

function dropServico() {
    firebase.database().ref().child('/loja/servico/' + selecionado).remove();
    selecionado = null;
    location.reload();
}

// recuperacao de dados

function clienteList() {
    const refUser = firebase.database().ref().child('loja/usuario');
    var clientelist = document.getElementById("clientelist");

    refUser.once('value').then(function(snapshot) {
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(obj.nome));
            h4.className = "list-group-item-heading";

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Pontos: "+obj.pontos));
            p.className = "list-group-item-text";


            var a = document.createElement('a');
            a.setAttribute("onclick", "seleciona($(this).attr('id'))");
            a.className = "list-group-item";
            a.id = item.key;
            a.href = "#";

            a.appendChild(h4);
            a.appendChild(p);

            clientelist.appendChild(a);

        });
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
            a.setAttribute("onclick", "seleciona($(this).attr('id'))");
            a.className = "list-group-item";
            a.id = item.key;
            a.href = "#";

            a.appendChild(h4);
            a.appendChild(p);

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
            a.setAttribute("onclick", "seleciona($(this).attr('id'))");
            a.className = "list-group-item";
            a.id = item.key;
            a.href = "#";

            a.appendChild(h4);
            a.appendChild(p);

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
            a.setAttribute("onclick", "seleciona($(this).attr('id'))");
            a.className = "list-group-item";
            a.id = item.key;
            a.href = "#";

            a.appendChild(h4);
            a.appendChild(p);

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
    var compl = "form_" + id;
    var formElem = document.getElementById(compl);
    if (formElem.style.visibility === 'hidden') {
        formElem.style.visibility = 'visible';
    } else {
        formElem.style.visibility = 'hidden';
    }
}

function showEdit(id) {
    var compl = "edit_" + id;
    var formElem = document.getElementById(compl);
    if (formElem.style.visibility === 'hidden') {
        formElem.style.visibility = 'visible';
    } else {
        formElem.style.visibility = 'hidden';
    }
}

function showQuest(id) {
    var compl = "exc_" + id;
    var div = document.getElementById(compl);
    if (div.style.visibility === 'hidden') {
        div.style.visibility = 'visible';
    } else {
       div.style.visibility = 'hidden';
    }
}