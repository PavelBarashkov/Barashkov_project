import { SortBy } from '../Sort/SortBy';
import { useSelector } from 'react-redux';
import { ListSortBy, listCotegory, listPlatform } from '../../data/listData';
import classes from "./menu.module.css";

export const Menu = ({handlerBtnFilter}: any) => {
    const {sortBy, filterCategory, filterPlatform } = useSelector((state: any) => state.games)

    const platforms = listPlatform;
    const genres = listCotegory;
    const listSort = ListSortBy;

    return (
        <div>
            <div className={classes.module}>
                <p className={classes.text_info}>Отсортировать по:</p>
                <SortBy className={classes.dropdown} sort={listSort} handlerBtn={ e => handlerBtnFilter('sort', e)}
                    type={sortBy.value}
                />
            </div>
            <div className={classes.module}>
                <p className={classes.text_info}>Платформа:</p>
                <SortBy  className={classes.dropdown} sort={platforms} handlerBtn={ e => handlerBtnFilter('platform', e)}  
                    type={filterPlatform.value}/>
            </div>
            <div className={classes.module}>
                <p className={classes.text_info}>Жанр:</p>
                <SortBy  className={classes.dropdown} sort={genres} handlerBtn={ e => handlerBtnFilter('category', e)} 
                     type={filterCategory.value}/>
            </div>
        </div>
    )
}
