import React from 'react';
import { Dropdown } from 'react-bootstrap';
import classes from './sort.module.css';

interface SortOption {
    value: string;
    data: string;
}

interface SortByProps {
    sort: SortOption[];
    handlerBtn: (dataType: any) => void;
    type: string;
    className: string
}

export const SortBy: React.FC<SortByProps> = ({ sort, handlerBtn, type, ...props }) => {
    return (
        <Dropdown {...props}>
            <Dropdown.Toggle className={classes.btn} variant="success" id="dropdown-basic">
                {type}
            </Dropdown.Toggle>
            <Dropdown.Menu className={classes.menu}>
                {sort.map((item) => (
                    <Dropdown.Item
                        key={item.data}
                        className={classes.item}
                        onClick={() => handlerBtn(item)}
                        data-sort={item.data}
                    >
                        {item.value}
                    </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                {[{value: 'Без сортировки', data: null}].map(item => (
                    <Dropdown.Item
                        key={item.data}
                        className={classes.item}
                        onClick={() => handlerBtn(item)}
                        data-sort={item.data}
                    >
                        {item.value}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};


