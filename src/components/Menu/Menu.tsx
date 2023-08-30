import { SortBy } from '../Sort/SortBy';
import { useSelector } from 'react-redux';
import { ListSortBy, listCotegory, listPlatform } from '../../utils/listData';
import classes from "./menu.module.css";
import { useAppDispatch } from '../../redux/hooks/hooks';
import { bySelected, categorySelected, platformSelected } from '../../redux/slices/gamesSlice';

export const Menu = () => {
    const dispatch = useAppDispatch();
    const {sortBy, filterCategory, filterPlatform } = useSelector((state: any) => state.games)

    const platforms = listPlatform;
    const genres = listCotegory;
    const listSort = ListSortBy;

    
    async function handleFilterChange(dataType: string, e: any, ) {
        const value = e.value;
        const data = e.data;
        let params = {
            sort: sortBy.data,
            platform: filterPlatform.data,
            category: filterCategory.data
        };
    
        if (dataType === 'sort') {
            params.sort = data;
            dispatch(bySelected({
                value: value,
                data: data,
            }));
        } else if (dataType === 'platform') {
            params.platform = data;
            dispatch(platformSelected({
                value: value,
                data: data,
            }));
        } else if (dataType === 'category') {
            params.category = data;
            dispatch(categorySelected({
                value: value,
                data: data,
            }))
        }
    }
    return (
        <div>
            <div className={classes.module}>
                <p className={classes.text_info}>Отсортировать по:</p>
                <SortBy className={classes.dropdown} sort={listSort} handlerBtn={(e) => handleFilterChange('sort', e)} type={sortBy.value}/>
            </div>
            <div className={classes.module}>
                <p className={classes.text_info}>Платформа:</p>
                <SortBy  className={classes.dropdown} sort={platforms} handlerBtn={(e) => handleFilterChange('platform', e)} type={filterPlatform.value}/>
            </div>
            <div className={classes.module}>
                <p className={classes.text_info}>Жанр:</p>
                <SortBy  className={classes.dropdown} sort={genres} handlerBtn={(e) => handleFilterChange('category', e)} type={filterCategory.value}/>
            </div>
        </div>
    )
}
