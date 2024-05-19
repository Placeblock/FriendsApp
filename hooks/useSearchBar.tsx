import { useEffect, useRef, useState } from "react";


export function useSearchBar<T>({items, key}: {items: T[], key: (item: T) => string}) {
    const [filteredItems, setFilteredItems] = useState(items);
    const query = useRef("")

    useEffect(() => {
        updateFilteredItems();
    }, [items])

    const updateFilteredItems = () => {
        if (query.current === "") {
            setFilteredItems(items)
            return;
        }
        setFilteredItems(items.filter(item => key(item).includes(query.current)))
    }

    const updateQuery = (newQuery: string) => {
        query.current = newQuery;
        updateFilteredItems();
    }

    return {filteredItems, updateQuery}
}