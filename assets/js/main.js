// Arquivo main.js do Desafio de Projeto Construindo uma Pokédex com JavaScript

// Seleciona o elemento HTML com o ID "pokemonList"
const pokemonList = document.getElementById('pokemonList')

// Seleciona o elemento HTML com o ID "loadMoreButton"
const loadMoreButton = document.getElementById('loadMoreButton')

// Define a quantidade máxima de registros que podem ser carregados (Primeira geração de pokémons)
const maxRecords = 151

// Define a quantidade de registros que serão carregados a cada vez que o botão "loadMoreButton" for clicado
const limit = 10

// Define o offset inicial como 0
let offset = 0;

// Função que recebe um objeto "pokemon" e retorna uma string com o HTML que representa o "pokemon" em uma lista
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

// Função que carrega os itens de pokémon a partir do offset e limit definidos
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Converte cada objeto "pokemon" em uma string HTML utilizando a função "convertPokemonToLi" e junta todas as strings em uma só
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        // Adiciona o HTML gerado à lista de pokémons
        pokemonList.innerHTML += newHtml
    })
}

// Carrega os primeiros itens
loadPokemonItens(offset, limit)

// Adiciona um evento de clique ao botão "loadMoreButton"
loadMoreButton.addEventListener('click', () => {
    offset += limit
    // Calcula a quantidade de registros que serão carregados com a próxima página
    const qtdRecordsWithNexPage = offset + limit

    // Se a quantidade de registros com a próxima página for maior ou igual ao máximo de registros permitidos
    if (qtdRecordsWithNexPage >= maxRecords) {
        // Define um novo limit para carregar apenas os registros restantes
        const newLimit = maxRecords - offset
        // Carrega os registros restantes
        loadPokemonItens(offset, newLimit)
        // Remove o botão "loadMoreButton" da página
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        // Se ainda não chegou ao máximo de registros permitidos, carrega mais registros normalmente
        loadPokemonItens(offset, limit)
    }
})