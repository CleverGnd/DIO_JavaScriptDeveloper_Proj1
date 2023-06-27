// Arquivo poke-api.js do projeto Pokedex, responsável por fazer a requisição à API PokeAPI

// Cria um objeto vazio para armazenar as funções relacionadas à API PokeAPI
const pokeApi = {}

// Função que recebe um objeto com detalhes de um Pokémon e retorna um objeto Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    // Cria um novo objeto Pokemon
    const pokemon = new Pokemon()
    // Atribui o número do Pokémon ao objeto Pokemon
    pokemon.number = pokeDetail.id
    // Atribui o nome do Pokémon ao objeto Pokemon
    pokemon.name = pokeDetail.name

    // Mapeia os tipos do Pokémon e armazena em um array
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    // Atribui o array de tipos ao objeto Pokemon
    pokemon.types = types
    // Atribui o primeiro tipo do array ao objeto Pokemon
    const [type] = types
    pokemon.type = type

    // Atribui a URL da imagem do Pokémon ao objeto Pokemon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // Retorna o objeto Pokemon
    return pokemon
}

// Função que recebe um objeto Pokemon e retorna uma Promise com os detalhes do Pokémon
pokeApi.getPokemonDetail = (pokemon) => {
    // Faz uma requisição à API PokeAPI com a URL do Pokémon
    return fetch(pokemon.url)
        // Converte a resposta em JSON
        .then((response) => response.json())
        // Converte os detalhes do Pokémon em um objeto Pokemon
        .then(convertPokeApiDetailToPokemon)
}

// Função que retorna uma Promise com um array de objetos Pokemon
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    // Cria a URL da requisição com os parâmetros de offset e limit
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    // Faz uma requisição à API PokeAPI com a URL criada acima
    return fetch(url)
        // Converte a resposta em JSON
        .then((response) => response.json())
        // Retorna apenas o array de resultados da resposta
        .then((jsonBody) => jsonBody.results)
        // Converte cada objeto Pokemon em uma Promise com os detalhes do Pokémon
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        // Aguarda todas as Promises serem resolvidas e retorna um array com os objetos Pokemon
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
