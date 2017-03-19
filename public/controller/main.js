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
    var usuario = {
        email: formcliente.email.value,
        nome: formcliente.nome.value,
        pontos: formcliente.pontos.value,
        senha: formcliente.senha.value,
        sexo : formcliente.sexo.value
    };
    addUser(usuario);
}

function addUser(usuario) {
    var newUserKey = firebase.database().ref().child('usuario').push().key;
    var updates = {};
    updates['/loja/usuario/' + newUserKey] = usuario;

    firebase.database().ref().update(updates);
    location.reload();

}

function editUser() {
    var usuario = {
        email:  formclienteedit.emailedit.value,
        nome:   formclienteedit.nomeedit.value,
        pontos: formclienteedit.pontosedit.value,
        senha:  formclienteedit.senhaedit.value,
        sexo :  formclienteedit.sexoedit.value
    };
    var updates = {};
    updates['/loja/usuario/' + selecionado] = usuario;

    firebase.database().ref().update(updates);

    selecionado = null;
    location.reload();
}

function dropUser() {
    firebase.database().ref().child('/loja/usuario/'+selecionado).remove();
    selecionado = null;
    location.reload();
}

// produto
function criaProduto() {
    var produto = {
        nome: formproduto.nomeProd.value,
        image: formproduto.imgProd.value,
        descricao: formproduto.descProd.value,
        ponto: formproduto.pontosProd.value
    };
    addProduto(produto);
}

function addProduto(produto) {
    var newProdKey = firebase.database().ref().child('produto').push().key;
    var updates = {};
    updates['loja/produto/' + newProdKey] = produto;

    firebase.database().ref().update(updates);
    location.reload();
}

function editProduto() {
    var produto = {
        nome: formprodedit.nomeProdedit.value,
        image: formprodedit.imgProdedit.value,
        descricao: formprodedit.descProdedit.value,
        ponto: formprodedit.pontosProdedit.value
    };

    var updates = {};
    updates['loja/produto/' + selecionado] = produto;

    firebase.database().ref().update(updates);

    selecionado = null;
    location.reload();
}

function dropProduto() {
    firebase.database().ref().child('/loja/produto/' + selecionado).remove();

    selecionado = null;
    location.reload();
}

//promocao
function criaPromocao() {
    var promocao = {
        image: formpromocao.imgProm.value,
        descricao: formpromocao.descProm.value
    };
    addPromocao(promocao);
}

function addPromocao(promocao) {
    var newPromKey = firebase.database().ref().child('promocao').push().key;
    var updates = {};
    updates['loja/promocao/' + newPromKey] = promocao;

    firebase.database().ref().update(updates);
    location.reload();
}

function editPromocao() {
    var promocao = {
        image: formpromedit.imgPromedit.value,
        descricao: formpromedit.descPromedit.value
    };
    var updates = {};
    updates['loja/promocao/' + selecionado] = promocao;

    firebase.database().ref().update(updates);

    selecionado = null;
    location.reload();
}

function dropPromocao() {
    firebase.database().ref().child('/loja/promocao/' + selecionado).remove();

    selecionado = null;
    location.reload();
}

// servico
function criaServico() {
    var servico = {
        nome: formservico.nomeServ.value,
        image: formservico.imgServ.value,
        descricao: formservico.descServ.value,
        ponto: formservico.pontosServ.value
    };
    addServico(servico);
}

function addServico(servico) {
    var newServKey = firebase.database().ref().child('servico').push().key;
    var updates = {};
    updates['loja/servico/' + newServKey] = servico;

    firebase.database().ref().update(updates);
    location.reload();
}

function editServico() {
    var servico = {
        nome: formservicoedit.nomeServedit.value,
        image: formservicoedit.imgServedit.value,
        descricao: formservicoedit.descServedit.value,
        ponto: formservicoedit.pontosServedit.value
    };

    var updates = {};
    updates['loja/servico/' + selecionado] = servico;
    firebase.database().ref().update(updates);

    selecionado = null;
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
            document.getElementById("formclienteedit").innerHTML = '<div class="form-group"><label for="nomeedit">Nome:</label>&nbsp;<input class="form-control" type="text" id="nomeedit" value="'+ obj.nome +'"/> </div> <div  class="form-group" id="sexoedit" role="radiogroup"> <label for="sexoedit">Sexo:</label><br> <span class="input-group-addon"> <input type="radio" name="sexoedit" value="feminino"/>Feminino </span> <span class="input-group-addon"> <input type="radio" name="sexoedit" value="masculino"/>Masculino </span> </div> <div  class="form-group"> <label for="emailedit">E-mail:</label>&nbsp; <input class="form-control" type="email" id="emailedit" value="'+obj.email+'"/> </div> <div  class="form-group"> <label for="senhaedit">Senha:</label>&nbsp; <input class="form-control" type="password" id="senhaedit" value="'+obj.senha+'"/> </div> <div  class="form-group"> <label for="pontosedit">Pontos:</label> <input class="form-control" type="number" id="pontosedit" value="'+ obj.pontos +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-user" type="reset" onclick="editUser()">Salvar Alterações</button> </div>';
    });
}

function imprimeFormProd() {
    const refProd = firebase.database().ref().child('loja/produto/'+selecionado);

    refProd.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formprodedit").innerHTML = '<div class="form-group"> <label for="nomeProdedit">Nome:</label> <input class="form-control" type="text" id="nomeProdedit" value="'+ obj.nome +'"/> </div> <div  class="form-group"> <label for="imgProdedit">Imagem do Produto:</label> <input class="form-control" type="file" id="imgProdedit" value="'+ obj.image +'"/> </div> <div  class="form-group"> <label for="descProdedit">Descrição:</label> <input class="form-control" type="text" id="descProdedit" value="'+ obj.descricao +'"/> </div> <div  class="form-group"> <label for="pontosProdedit">Pontos:</label> <input class="form-control" type="number" id="pontosProdedit" value="'+ obj.ponto +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-prod" type="reset" onclick="editProduto()">Salvar</button> </div>';
    });
}

function imprimeFormProm() {
    const refProm = firebase.database().ref().child('loja/promocao/'+selecionado);

    refProm.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formpromedit").innerHTML = '<div  class="form-group"> <label for="imgPromedit">Banner da Promoção:</label> <input class="form-control" type="file" id="imgPromedit" value="'+ obj.image +'"/> </div> <div  class="form-group"> <label for="descPromedit">Descrição:</label> <input class="form-control" type="text" id="descPromedit" value="'+ obj.descricao +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-prom" type="reset" onclick="editPromocao()">Salvar</button> </div>';
    });
}
function imprimeFormServ() {
    const refServ = firebase.database().ref().child('loja/servico/'+selecionado);

    refServ.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formservicoedit").innerHTML = '<div class="form-group"> <label for="nomeServedit">Nome:</label> <input class="form-control"  type="text" id="nomeServedit" value="'+obj.nome+'"/> </div> <div  class="form-group"> <label for="imgServedit">Imagem da Promoção:</label> <input class="form-control" type="file" id="imgServedit" value="'+obj.image+'"/> </div> <div  class="form-group"> <label for="descServedit">Descrição:</label> <input class="form-control" type="text" id="descServedit" value="'+obj.descricao+'"/> </div> <div  class="form-group"> <label for="pontosServedit">Pontos:</label> <input class="form-control" type="number" id="pontosServedit" value="'+obj.ponto+'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-serv" type="reset" onclick="editServico()">Salvar</button> </div>';
    });
}
function imprimeMensagemEditErr() {
    alert("Selecione um elemento");
}
function showEdit(id) {
    if (selecionado) {
        var compl = "edit_" + id;
        var formElem = document.getElementById(compl);

        if (formElem.style.visibility === 'hidden') {
            formElem.style.visibility = 'visible';
        } else {
            formElem.style.visibility = 'hidden';
            selecionado = null;
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
    else {
        imprimeMensagemEditErr();
    }
}

function showQuest(id) {
    if (selecionado) {
        var compl = "exc_" + id;
        var div = document.getElementById(compl);
        if (div.style.visibility === 'hidden') {
            div.style.visibility = 'visible';
        } else {
            div.style.visibility = 'hidden';
            selecionado = null;
        }
    }
    else {
        imprimeMensagemEditErr();
    }
}