let form = document.getElementById('formUsuario');
let inputId = document.getElementById('id');
let inputNome = document.getElementById('nome');
let inputEmail = document.getElementById('email');

let tabela = document.getElementById('listaUsuarios');

async function carregarUsuarios() {
    const resposta = await fetch('/usuarios');
    const usuarios = await resposta.json();

    tabela.innerHTML = ''

    usuarios.forEach(usuario => {
        tabela.innerHTML += `
             <tr>
                <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                      <td>
                        <div class="acoes">
                            <button class="editar" onclick="editarUsuario(${usuario.id})">Editar</button>
                            <button class="excluir" onclick="excluirUsuario(${usuario.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
        `
    })


}

carregarUsuarios();


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = inputId.value;
    const nome = inputNome.value;
    const email = inputEmail.value;

    if (id == '') {
        await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email })
        });


    }
    else {
        await fetch(`/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email })
        });
    }

    inputNome.value = '';
    inputEmail.value = '';

    carregarUsuarios();
})


async function editarUsuario(id) {
    const resposta = await fetch('/usuarios');
    const usuarios = await resposta.json();

    const usuario = usuarios.find(u => u.id === id);

    inputId.value = usuario.id;
    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;

}

async function excluirUsuario(id) {
    console.log('Excluir usuário com ID:', id);

    if (confirm('Tem certeza que deseja excluir este usuário?')) {

        await fetch(`/usuarios/${id}`, {
            method: 'DELETE'
        });

        carregarUsuarios();
    }



}