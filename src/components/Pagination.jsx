export function Pagination({page, setPage}) {
    return (
        <div>
            <button disabled={page == 1} onClick={() => setPage(page - 1)} className="disabled:opacity-30 disabled:pointer-events-none border py-1 px-2 mr-3 hover:bg-brand-blue-light"> ← </button>
            {page}
            <button onClick={() => setPage(page + 1)} className="border py-1 px-2 ml-3 hover:bg-brand-blue-light"> → </button>
        </div>
    )
}