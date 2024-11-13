import { useEffect } from "react";
import { getData } from "../api/tmdb"
import { useState } from "react";

import { BarLoader } from "react-spinners";
import { Card } from "./Card";
import { Pagination } from "./Pagination";

export function List({ categoria }) {
    //Criando o estado, iniciando com um array vazio
    //const loadPage = sessionStorage.getItem('page') ? Number(sessionStorage.getItem('page')) : 1;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [ordem, setOrdem] = useState('popular');

    const options = categoria == 'filmes' ? [
        {value: 'popular', label: 'Popular'},
        {value: 'top_rated', label: 'Melhores Filmes'},
        {value: 'upcoming', label: 'Em breve'},
        {value: 'now_playing', label: 'Em cartaz'},
    ] : [
        {value: 'popular', label: 'Popular'},
        {value: 'top_rated', label: 'Melhores Séries'},
        {value: 'on_the_air', label: 'No ar'},
    ];
 
    async function loadItems() {
        //const data = await getData(categoria);  //aciona a API
        //setItems(data); //Guarda os dados da API em um estado
        setLoading(true);

        try {
            const data = await getData(categoria, page, ordem);
            setItems(data);

            setTimeout(()=>{
                setLoading(false); //desabilita o loading
            },500)            
        }

        catch (error) {
            console.log('Erro ao buscar dados ' + error);
        }

    }

    function handleOrder(parametro){
        //console.log();
        setPage(1);
        setOrdem(parametro);
    }

    //Função especial que é executada ao fim da renderização do componente
    useEffect(() => {
        //console.log('componente renderizado');
        loadItems();
        //sessionStorage.setItem('page',page.toString());


    }, [page, ordem]);

    if (loading) {
        return (
            <BarLoader
                color="#00B1E9"
                width={'100%'}
            />
        )
    }

    return (
        <>
            {/* Aplicação arbitrária max-w-[1140px] */}
            <div className="max-w-container-site mx-auto">

                <div className="flex justify-between mt-3">
                    
                    <div>
                        <select value={ordem} onChange={(e)=>handleOrder(e.target.value)} 
                            
                            className="w-40 border py-1 px-3 bg-brand-blue-dark">                            
                            
                            {
                                options.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))
                            }                           

                        </select>
                    </div>

                    <Pagination page={page} setPage={setPage}/>

                </div>

                <div className="flex flex-wrap justify-center gap-5 my-16">
                    {
                        items.map(item => (
                            <Card item={item} categoria={categoria} key={item.id} page={page} />
                        ))
                    }
                </div>

                <div className="flex justify-center">
                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
        </>
    )

}