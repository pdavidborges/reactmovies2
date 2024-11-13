import axios from "axios";

const API_KEY = 'da2d5c042225a0ba6c641ca4f441ddf2';
const BASE_URL = 'https://api.themoviedb.org/3'; //endpoint

//https://api.themoviedb.org/3/movie/popular
//https://api.themoviedb.org/3/tv/popular

//Função que irá buscar os itens (filmes e series)
export async function getData(categoria, page, ordem){
    const endpoint = categoria == 'filmes' ? 'movie' : 'tv';
    
    const response = await axios.get(`${BASE_URL}/${endpoint}/${ordem}`,{
        params : {
            api_key : API_KEY,
            language : 'pt-BR',
            page : page
        }
    });

    return response.data.results;
}


export async function getDataId(categoria, id){
    const endpoint = categoria == 'filmes' ? 'movie' : 'tv';
    
    const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`,{
        params : {
            api_key : API_KEY,
            language : 'pt-BR',            
        }
    });

    return response.data;
}

