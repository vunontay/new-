import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash';


function useUrl() {
    const [query, setSearch] = useSearchParams();

    const getQueryField = (type) => {
        return query.get(type) ? `${query.get(type)}` : ''
    }
    const onSearchChange = debounce((e) => {
        const text = e.target.value
        if (text.length === 0) {
            query.delete("keywords")
            setSearch(query, {
                replace: true,
            });
        }
        else {
            query.set("keywords", text);
            setSearch(query, {
                replace: true,
            });
        }
    }, 300)


    const setLimit = (limit) => {
        if (!limit) {
            query.delete("limit")
            setSearch(query, {
                replace: true,
            });
        } else {
            query.set("limit", `${limit}`)
            setSearch(query, {
                replace: true,
            });
        }
    }

    const setPage = (page) => {
        if (!page) {
            query.delete("page")
            setSearch(query, {
                replace: true,
            });
        } else {
            query.set("page", page)
            setSearch(query, {
                replace: true,
            });
        }
    }
    const setTotalPage = (totalPage) => {
        if (!totalPage) {
            query.delete("totalPage")
            setSearch(query, {
                replace: true,
            });
        } else {
            query.set("totalPage", totalPage)
            setSearch(query, {
                replace: true,
            });
        }
    }

    return { onSearchChange, getQueryField, setPage, setLimit, setTotalPage }
}

export default useUrl