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

function editUser() {
    usuario = {
        email: formcliente.email.value,
        nome: formcliente.nome.value,
        pontos: formcliente.pontos.value,
        senha: formcliente.senha.value,
        sexo : formcliente.sexo.value
    };

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

function editProduto() {
    produto = {
        nome: formproduto.nomeProd.value,
        image: formproduto.imgProd.value,
        descricao: formproduto.descProd.value,
        ponto: formproduto.pontosProd.value
    };

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

function editPromocao() {
    produto = {
        nome: formproduto.nomeProd.value,
        image: formproduto.imgProd.value,
        descricao: formproduto.descProd.value,
        ponto: formproduto.pontosProd.value
    };

    newProdKey = firebase.database().ref().child('produto').push().key;
    updates = {};
    updates['loja/produto/' + newProdKey] = produto;

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

function editServico() {
    produto = {
        nome: formproduto.nomeProd.value,
        image: formproduto.imgProd.value,
        descricao: formproduto.descProd.value,
        ponto: formproduto.pontosProd.value
    };

    newProdKey = firebase.database().ref().child('produto').push().key;
    updates = {};
    updates['loja/produto/' + newProdKey] = produto;

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
            h4.id = "nomecli";
            h4.setAttribute("value", obj.nome);

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

function imprimeFormCli() {
    const refUser = firebase.database().ref().child('loja/usuario/'+selecionado);

    refUser.once('value').then(function(snapshot) {
            var obj = snapshot.val();
            document.getElementById("formcliente-edit").innerHTML = '<div class="form-group"><label for="nome-edit">Nome:</label>&nbsp;<input class="form-control" type="text" id="nome-edit" value="'+ obj.nome +'"/> </div> <div  class="form-group" id="sexo-edit" role="radiogroup"> <label for="sexo-edit">Sexo:</label><br> <span class="input-group-addon"> <input type="radio" name="sexo" value="feminino"/>Feminino </span> <span class="input-group-addon"> <input type="radio" name="sexo" value="masculino"/>Masculino </span> </div> <div  class="form-group"> <label for="email-edit">E-mail:</label>&nbsp; <input class="form-control" type="email" id="email-edit" value="'+obj.email+'"/> </div> <div  class="form-group"> <label for="senha-edit">Senha:</label>&nbsp; <input class="form-control" type="password" id="senha-edit" value="'+obj.senha+'"/> </div> <div  class="form-group"> <label for="pontos-edit">Pontos:</label> <input class="form-control" type="number" id="pontos-edit" value="'+ obj.pontos +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botao-edit-user" type="reset" onclick="editUser()">Salvar Alterações</button> </div>';
    });
}

function imprimeFormProd() {
    const refProd = firebase.database().ref().child('loja/produto/'+selecionado);

    refProd.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formprod-edit").innerHTML = '<div class="form-group"> <label for="nomeProd-edit">Nome:</label> <input class="form-control" type="text" id="nomeProd-edit" value="'+ obj.nome +'"/> </div> <div  class="form-group"> <label for="imgProd-edit">Imagem do Produto:</label> <input class="form-control" type="file" id="imgProd-edit" value="'+ obj.image +'"/> </div> <div  class="form-group"> <label for="descProd-edit">Descrição:</label> <input class="form-control" type="text" id="descProd-edit" value="'+ obj.descricao +'"/> </div> <div  class="form-group"> <label for="pontosProd">Pontos:</label> <input class="form-control" type="number" id="pontosProd-edit" value="'+ obj.ponto +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botao-edit-prod" type="reset" onclick="editProduto()">Salvar</button> </div>';
    });
}

function imprimeFormProm() {
    const refProm = firebase.database().ref().child('loja/promocao/'+selecionado);

    refProm.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formprom-edit").innerHTML = '<div  class="form-group"> <label for="imgProm-edit">Banner da Promoção:</label> <input class="form-control" type="file" id="imgProm-edit" value="'+ obj.image +'"/> </div> <div  class="form-group"> <label for="descProm-edit">Descrição:</label> <input class="form-control" type="text" id="descProm-edit" value="'+ obj.descricao +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botao-edit-prom" type="reset" onclick="criaServico()">Salvar</button> </div>';
    });
}
function imprimeFormServ() {
    const refServ = firebase.database().ref().child('loja/servico/'+selecionado);

    refServ.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formservico-edit").innerHTML = '<div class="form-group"> <label for="nomeServ-edit">Nome:</label> <input class="form-control"  type="text" id="nomeServ-edit" value="'+obj.nome+'"/> </div> <div  class="form-group"> <label for="imgServ-edit">Imagem da Promoção:</label> <input class="form-control" type="file" id="imgServ-edit" value="'+obj.image+'"/> </div> <div  class="form-group"> <label for="descServ-edit">Descrição:</label> <input class="form-control" type="text" id="descServ-edit" value="'+obj.descricao+'"/> </div> <div  class="form-group"> <label for="pontosServ-edit">Pontos:</label> <input class="form-control" type="number" id="pontosServ-edit" value="'+obj.ponto+'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botao-edit-serv" type="reset" onclick="editServico()">Salvar</button> </div>';
    });
}
function showEdit(id) {
    var compl = "edit_" + id;
    var formElem = document.getElementById(compl);

    if (formElem.style.visibility === 'hidden') {
        formElem.style.visibility = 'visible';
    } else {
        formElem.style.visibility = 'hidden';
    }

    if (id === 'cli') {
        imprimeFormCli();
   }
    else if (id === 'prod') {
        imprimeFormProd();
    }
    else if (id === 'prom') {
        imprimeFormProm();
    }
    else if (id === 'serv') {
        imprimeFormServ();
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