// Helisson: Os comentarios servem para refatorar o codigo posteriormente, nao remover ate que isso seja feito.

// armazenamento de arquivos

var urlProdutoSalvo;
var produtoRef;
var urlPromocaoSalvo;
var promocaoRef;
var urlServicoSalvo;
var servicoRef;

// funcoes importantes
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

var selecionado;

function seleciona(id) {
    selecionado = document.getElementById(id).id;

}

//Gerencia de dados

// Usuarios
function criaUser() {
    var Usuarios = {
        email: formcliente.email.value,
        nome: formcliente.nome.value,
        pontos: formcliente.pontos.value,
        senha: formcliente.senha.value,
        sexo : formcliente.sexo.value
    };
    addUser(Usuarios);
}

function addUser(Usuarios) {
    var newUserKey = firebase.database().ref().child('Usuarios').push().key;
    var updates = {};
    updates['Usuarios/' + newUserKey] = Usuarios;

    firebase.database().ref().update(updates);
    $('#form_cli').hide();

}

function editUser() {
    var Usuarios = {
        email:  formclienteedit.emailedit.value,
        nome:   formclienteedit.nomeedit.value,
        pontos: formclienteedit.pontosedit.value,
        senha:  formclienteedit.senhaedit.value,
        sexo :  formclienteedit.sexoedit.value
    };
    var updates = {};
    updates['Usuarios/' + selecionado] = Usuarios;

    firebase.database().ref().update(updates);

    selecionado = null;
    $('#edit_cli').hide();
}

function dropUser() {
    firebase.database().ref().child('Usuarios/'+selecionado).remove();
    selecionado = null;
    $('#exc_cli').hide();

}

// Produtos
function criaProduto() {
    var produto = {
        nome: formproduto.nomeProd.value,
        image: urlProdutoSalvo,
        descricao: formproduto.descProd.value,
        ponto: formproduto.pontosProd.value,
        imageRef : produtoRef
    };
    addProduto(produto);
}

function addProduto(produto) {
    var newProdKey = firebase.database().ref().child('Produtos').push().key;
    var updates = {};
    updates['Produtos/' + newProdKey] = produto;

    firebase.database().ref().update(updates);

    urlProdutoSalvo = null;
    produtoRef = null;
    $('#form_prod').hide();
}

function editProduto() {
    var produto = {
        nome: formprodedit.nomeProdedit.value,
        image: urlProdutoSalvo,
        imageRef: produtoRef,
        descricao: formprodedit.descProdedit.value,
        ponto: formprodedit.pontosProdedit.value
    };

    var updates = {};
    updates['Produtos/' + selecionado] = produto;

    firebase.database().ref().update(updates);

    selecionado = null;
    urlProdutoSalvo = null;
    produtoRef = null;
    $('#edit_prod').hide();

}

function dropProduto() {
    const refProd = firebase.database().ref().child('Produtos/'+selecionado);

    refProd.once('value').then(function(snapshot) {
        var obj = snapshot.val();

        var storageRef = firebase.storage().ref().child(obj.imageRef);

        storageRef.delete().then(function() {
            console.log("deletou Prod");
        }).catch(function(error) {
            console.log(error);
        });

        deletaNo(refProd);
    });
}



//Promocoes
function criaPromocao() {
    var promocao = {
        image: urlPromocaoSalvo,
        imageRef: promocaoRef,
        descricao: formpromocao.descProm.value
    };
    addPromocao(promocao);
}

function addPromocao(promocao) {
    var newPromKey = firebase.database().ref().child('Promocoes').push().key;
    var updates = {};
    updates['Promocoes/' + newPromKey] = promocao;

    firebase.database().ref().update(updates);

    promocaoRef = null;
    urlPromocaoSalvo = null;
    $('#form_prom').hide();
}

function editPromocao() {
    var promocao = {
        image: urlPromocaoSalvo,
        imageRef: promocaoRef,
        descricao: formpromedit.descPromedit.value
    };
    var updates = {};
    updates['Promocoes/' + selecionado] = promocao;

    firebase.database().ref().update(updates);

    promocaoRef = null;
    selecionado = null;
    $('#edit_prom').hide();
}

function dropPromocao() {
    const refProm = firebase.database().ref().child('Promocoes/' + selecionado);

    refProm.once('value').then(function(snapshot) {
        var obj = snapshot.val();

        var storageRef = firebase.storage().ref().child(obj.imageRef);

        storageRef.delete();


        deletaNo(refProm);
    });
}



// Servicos
function criaServico() {
    var servico = {
        nome: formservico.nomeServ.value,
        image: urlServicoSalvo,
        imageRef: servicoRef,
        descricao: formservico.descServ.value,
        ponto: formservico.pontosServ.value
    };
    addServico(servico);
}

function addServico(servico) {
    var newServKey = firebase.database().ref().child('Servicos').push().key;
    var updates = {};
    updates['Servicos/' + newServKey] = servico;

    firebase.database().ref().update(updates);

    servicoRef = null;
    urlServicoSalvo = null;
    $('#form_serv').hide();
}

function editServico() {
    var servico = {
        nome: formservicoedit.nomeServedit.value,
        image: urlServicoSalvo,
        imageRef: servicoRef,
        descricao: formservicoedit.descServedit.value,
        ponto: formservicoedit.pontosServedit.value
    };

    var updates = {};
    updates['Servicos/' + selecionado] = servico;
    firebase.database().ref().update(updates);

    servicoRef = null;
    selecionado = null;
    $('#edit_serv').hide();
}

function dropServico() {
    const refServ = firebase.database().ref().child('Servicos/' + selecionado);

    refServ.once('value').then(function(snapshot) {
        var obj = snapshot.val();

        var storageRef = firebase.storage().ref().child(obj.imageRef);

        storageRef.delete();

        deletaNo(refServ);
    });

}

function deletaNo(ref) {
    ref.remove();
    selecionado = null;

    $('#exc_prod').hide();
    $('#exc_prom').hide();
    $('#exc_serv').hide();

}

// recuperacao de dados

function clienteList() {
    const refUser = firebase.database().ref().child('Usuarios');
    var clientelist = document.getElementById("clientelist");

    refUser.on('value', function(snapshot) {
        clientelist.innerHTML = "";
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(obj.nome));
            h4.className = "list-group-item-heading";
            h4.id = "nomecli";
            h4.setAttribute("value", obj.nome);

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Sexo: "+obj.sexo+" | Email: "+obj.email+" | Pontos: "+obj.pontos));
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
    const refProd = firebase.database().ref().child('Produtos');
    var produtolist = document.getElementById("produtolist");

    refProd.on('value', function(snapshot) {
        produtolist.innerHTML = "";
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(obj.nome));
            h4.className = "media-heading";

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Descrição: "+obj.descricao+" | Pontos: "+obj.ponto));
            p.className = "list-group-item-text";

            var divBody = document.createElement('div');
            divBody.className = "media-body";
            divBody.appendChild(h4);
            divBody.appendChild(p);


            var img = document.createElement('img');
            img.setAttribute("src", obj.image);
            img.setAttribute("class", "media-object img-rounded");

            var div = document.createElement('div');
            div.className = "media-left";
            div.appendChild(img);

            var a = document.createElement('a');
            a.setAttribute("onclick", "seleciona($(this).attr('id'))");
            a.className = "list-group-item";
            a.id = item.key;
            a.href = "#";

            a.appendChild(div);
            a.appendChild(divBody);

            produtolist.appendChild(a);
        })
    });
}

function promocaoList() {
    const refProm = firebase.database().ref().child('Promocoes');
    var promocaolist = document.getElementById("promocaolist");

    refProm.on('value', function(snapshot) {
        promocaolist.innerHTML = "";
        snapshot.forEach(function (item) {
            var obj = item.val();

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Descrição: "+obj.descricao));
            p.className = "list-group-item-text";

            var divBody = document.createElement('div');
            divBody.className = "media-body";
            divBody.appendChild(p);

            var img = document.createElement('img');
            img.setAttribute("src", obj.image);
            img.setAttribute("class", "media-object img-rounded");

            var div = document.createElement('div');
            div.className = "media-left";
            div.appendChild(img);

            var a = document.createElement('a');
            a.setAttribute("onclick", "seleciona($(this).attr('id'))");
            a.className = "list-group-item";
            a.id = item.key;
            a.href = "#";

            a.appendChild(div);
            a.appendChild(divBody);

            promocaolist.appendChild(a);
        })
    });
}


function servicoList() {
    const refServ = firebase.database().ref().child('Servicos');
    var servicolist = document.getElementById("servicolist");

    refServ.on('value', function(snapshot) {
        servicolist.innerHTML = "";
        snapshot.forEach(function (item) {
            var obj = item.val();

            var h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(obj.nome));
            h4.className = "media-heading";

            var p = document.createElement('p');
            p.appendChild(document.createTextNode("Descrição: "+obj.descricao+" | Pontos: "+obj.ponto));
            p.className = "list-group-item-text";

            var divBody = document.createElement('div');
            divBody.className = "media-body";
            divBody.appendChild(h4);
            divBody.appendChild(p);

            var img = document.createElement('img');
            img.setAttribute("src", obj.image);
            img.setAttribute("class", "media-object img-rounded");

            var div = document.createElement('div');
            div.className = "media-left";
            div.appendChild(img);

            var a = document.createElement('a');
            a.setAttribute("onclick", "seleciona($(this).attr('id'))");
            a.className = "list-group-item";
            a.id = item.key;
            a.href = "#";

            a.appendChild(div);
            a.appendChild(divBody);

            servicolist.appendChild(a);
        })
    });
}


// Mecânica do front

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



function imprimeFormCli() {
    const refUser = firebase.database().ref().child('Usuarios/'+selecionado);

    refUser.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formclienteedit").innerHTML = '<div class="form-group"><label for="nomeedit">Nome:</label>&nbsp;<input class="form-control" type="text" id="nomeedit" value="'+ obj.nome +'"/> </div> <div  class="form-group" id="sexoedit" role="radiogroup"> <label for="sexoedit">Sexo:</label><br> <span class="input-group-addon"> <input type="radio" name="sexoedit" value="feminino"/>Feminino </span> <span class="input-group-addon"> <input type="radio" name="sexoedit" value="masculino"/>Masculino </span> </div> <div  class="form-group"> <label for="emailedit">E-mail:</label>&nbsp; <input class="form-control" type="email" id="emailedit" value="'+obj.email+'"/> </div> <div  class="form-group"> <label for="senhaedit">Senha:</label>&nbsp; <input class="form-control" type="password" id="senhaedit" value="'+obj.senha+'"/> </div> <div  class="form-group"> <label for="pontosedit">Pontos:</label> <input class="form-control" type="number" id="pontosedit" value="'+ obj.pontos +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-user" type="reset" onclick="editUser()">Salvar Alterações</button> </div>';
    });
}

function imprimeFormProd() {
    const refProd = firebase.database().ref().child('Produtos/'+selecionado);

    refProd.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        console.log("imprimindo Produto pelo inner");
        document.getElementById("formprodedit").innerHTML = '<div  class="form-group"> <label for="imgProdedit">Imagem do Produto:</label> <input class="form-control" type="file" id="imgProdedit" value="'+ obj.image +'"/> <progress max="100" id="uploaderedit-prod"></progress> </div><div class="form-group"> <label for="nomeProdedit">Nome:</label> <input class="form-control" type="text" id="nomeProdedit" value="'+ obj.nome +'"/> </div>  <div  class="form-group"> <label for="descProdedit">Descrição:</label> <input class="form-control" type="text" id="descProdedit" value="'+ obj.descricao +'"/> </div> <div  class="form-group"> <label for="pontosProdedit">Pontos:</label> <input class="form-control" type="number" id="pontosProdedit" value="'+ obj.ponto +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-prod" type="reset" onclick="editProduto()">Salvar</button> </div>';
        salvaImagemProd();
    });

    function salvaImagemProd() {
        var file = document.getElementById("imgProdedit");
        var uploader = document.getElementById("uploaderedit-prod");
        var botao = document.getElementById("botaoedit-prod");

        file.addEventListener('change', function (e) {
            var produto = e.target.files[0];
            botao.disable = true;

            produtoRef = 'Produtos/'+produto.name;
            var storageRef = firebase.storage().ref().child(produtoRef);

            var task = storageRef.put(produto);

            task.on('state_changed',
                function progress(snapshot){
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    uploader.value = percentage;
                },
                function(error) {
                    alert("Não foi possível salvar a imagem" + error);

                },
                function() {
                    storageRef.getDownloadURL().then(function(url) {
                        urlProdutoSalvo = url;
                        botao.disable = false;
                    }).catch(function(error) {
                        alert("Não foi possível salvar a imagem");
                    });
                });

        });
    }
}

function imprimeFormProm() {
    const refProm = firebase.database().ref().child('Promocoes/'+selecionado);

    refProm.once('value').then(function(snapshot) {
        console.log("imprimindo Produto pelo inner");
        var obj = snapshot.val();
        document.getElementById("formpromedit").innerHTML = '<div  class="form-group"> <label for="imgPromedit">Banner da Promoção:</label> <input class="form-control" type="file" id="imgPromedit" value="'+ obj.image +'"/> <progress max="100" id="uploaderedit-prom"></progress> </div> <div  class="form-group"> <label for="descPromedit">Descrição:</label> <input class="form-control" type="text" id="descPromedit" value="'+ obj.descricao +'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-prom" type="reset" onclick="editPromocao()">Salvar</button> </div>';
        salvaImagemProm();
    });

    function salvaImagemProm() {
        var file = document.getElementById("imgPromedit");
        var uploader = document.getElementById("uploaderedit-prom");
        var botao = document.getElementById("botaoedit-prom");

        file.addEventListener('change', function (e) {

            console.log("entrou no listner");
            var promocao = e.target.files[0];
            promocaoRef = 'Promocoes/'+promocao.name;

            var storageRef = firebase.storage().ref().child(promocaoRef);
            var task = storageRef.put(promocao);

            task.on('state_changed',
                function progress(snapshot){
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    uploader.value = percentage;
                },
                function(error) {
                    alert("Não foi possível salvar a imagem" + error);
                },
                function() {
                    storageRef.getDownloadURL().then(function(url) {
                        botao.disable = false;
                        urlPromocaoSalvo = url;
                        console.log("pegou url");
                    }).catch(function(error) {
                        alert("Não foi possível salvar a imagem");
                    });
             });

        });
    }
}
function imprimeFormServ() {
    const refServ = firebase.database().ref().child('Servicos/'+selecionado);

    refServ.once('value').then(function(snapshot) {
        var obj = snapshot.val();
        document.getElementById("formservicoedit").innerHTML = ' <div  class="form-group"> <label for="imgServedit">Imagem da Promoção:</label> <input class="form-control" type="file" id="imgServedit" value="'+obj.image+'"/> <progress max="100" id="uploaderedit-serv"></progress></div> <div  class="form-group"> <div class="form-group"> <label for="nomeServedit">Nome:</label> <input class="form-control"  type="text" id="nomeServedit" value="'+obj.nome+'"/> </div> <label for="descServedit">Descrição:</label> <input class="form-control" type="text" id="descServedit" value="'+obj.descricao+'"/> </div> <div  class="form-group"> <label for="pontosServedit">Pontos:</label> <input class="form-control" type="number" id="pontosServedit" value="'+obj.ponto+'"/> </div> <div class="button"> <button class="btn btn-block btn-primary btn-sm" id="botaoedit-serv" type="reset" onclick="editServico()">Salvar</button> </div>';
        salvaImagemServ();
    });

    function salvaImagemServ() {
        var file = document.getElementById("imgServedit");
        var uploader = document.getElementById("uploaderedit-serv");
        var botao = document.getElementById("botaoedit-serv");

        file.addEventListener('change', function (e) {
            var servico = e.target.files[0];

            servicoRef = 'Servicos/'+servico.name;

            var storageRef = firebase.storage().ref().child(servicoRef);
            var task = storageRef.put(servico);

            task.on('state_changed',
                function progress(snapshot){
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                    uploader.value = percentage;
                },
                function(error) {
                    alert("Não foi possível salvar a imagem" + error);

                },
                function() {
                    storageRef.getDownloadURL().then(function(url) {
                        urlServicoSalvo = url;
                        botao.disable = false;
                    }).catch(function(error) {
                        alert("Não foi possível salvar a imagem");
                    });
                });

        });
    }
}
function imprimeMensagemEditErr() {
    alert("Selecione um elemento");
}
function showEdit(id) {
    if (selecionado) {
        if (id === 'cli') {
            imprimeFormCli();
        }
        else if (id === 'prod') {
            imprimeFormProd();
        }
        else if (id === 'prom') {
            console.log("acessa showEdit");
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
    if (!selecionado) {
        imprimeMensagemEditErr();
    }

}


$(document).ready(function(){
    $('#menu').click(function(){
        $('#pai').children('div').hide();
        $('#pai-2').children('div').hide();
        $('#pai-3').children('div').hide();
        $('#pai-4').children('div').hide();
    });

    //tela cliente
    $('#pai').children('div').hide();

    $('#btn-add').click(function(){
        console.log('adicionar');
        $('#pai').children('div').hide();
        $('#form_cli').show();
    });
    $('#btn-edit').click(function(){
        console.log('editar');
        $('#pai').children('div').hide();
        $('#edit_cli').show();
    });
    $('#btn-delet').click(function(){
        console.log('delet');
        $('#pai').children('div').hide();
        if(selecionado){
            $('#exc_cli').show();
        }
    });
    $('#btn1-cancelar').click(function(){
        console.log('cancelar');
        $('#pai').children('div').hide();
        $('#exc_cli').hide();
    });

    $('#btn1-remove').click(function(){
        console.log('cancelar');
        $('#pai').children('div').hide();
        $('#exc_cli').hide();
    });


    // tela produto
    $('#pai-2').children('div').hide();

    $('#btn1-prod').click(function(){
        console.log('adicionar');
        $('#pai-2').children('div').hide();
        $('#form_prod').show();
    });
    $('#btn2-prod').click(function(){
        console.log('editar');
        $('#pai-2').children('div').hide();
        $('#edit_prod').show();
    });
    $('#btn3-prod').click(function(){
        console.log('delet');
        $('#pai-2').children('div').hide();
        if(selecionado){
            $('#exc_prod').show();
        }
    });
    $('#btn2-cancelar').click(function(){
        console.log('cancelar');
        $('#pai-2').children('div').hide();
        $('#exc_prod').hide();
    });

    $('#btn2-remove').click(function(){
        console.log('cancelar');
        $('#pai').children('div').hide();
        $('#exc_cli').hide();
    });

    //tela promocao
    $('#pai-3').children('div').hide();

    $('#btn1-prom').click(function(){
        console.log('adicionar');
        $('#pai-3').children('div').hide();
        $('#form_prom').show();
    });
    $('#btn2-prom').click(function(){
        console.log('editar');
        $('#pai-3').children('div').hide();
        $('#edit_prom').show();
    });
    $('#btn3-prom').click(function(){
        console.log('delet');
        $('#pai-3').children('div').hide();
        if(selecionado){
            $('#exc_prom').show();
        }
    });
    $('#btn3-cancelar').click(function(){
        console.log('cancelar');
        $('#pai-3').children('div').hide();
        $('#exc_prom').hide();
    });
    $('#btn3-remove').click(function(){
        console.log('cancelar');
        $('#pai').children('div').hide();
        $('#exc_cli').hide();
    });

    //tela servico

    $('#pai-4').children('div').hide();

    $('#btn1-serv').click(function(){
        console.log('adicionar');
        $('#pai-4').children('div').hide();
        $('#form_serv').show();
    });
    $('#btn2-serv').click(function(){
        console.log('editar');
        $('#pai-4').children('div').hide();
        $('#edit_serv').show();
    });
    $('#btn3-serv').click(function(){
        console.log('delet');
        $('#pai-4').children('div').hide();
        if(selecionado){
            $('#exc_serv').show();
        }
    });
    $('#btn4-cancelar').click(function(){
        console.log('cancelar');
        $('#pai-4').children('div').hide();
        $('#exc_serv').hide();
    });
    $('#btn4-remove').click(function(){
        console.log('cancelar');
        $('#pai').children('div').hide();
        $('#exc_cli').hide();
    });


});
