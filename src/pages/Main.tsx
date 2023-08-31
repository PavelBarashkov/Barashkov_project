import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ListGames } from '../components/ListGames/ListGames';
import { Pagination } from '../components/pagination/Pagitation';
import { fetchGames, nextPage, previousPage, upDataFilter } from '../redux/slices/gamesSlice';
import { useAppDispatch } from '../redux/hooks/hooks';
import { Menu } from '../components/Menu/Menu';


export const Main = () => {
    const dispatch = useAppDispatch();
    const {
        games, 
        loading, 
        error, 
        currentPageItems, 
        totalPages, 
        currentPage, 
        loadingFilter,
        errorFilter,
        sortBy,
        filterPlatform,
        filterCategory,
    } = useSelector((state: any) => state.games);

    useEffect(() => {

        if (sortBy !== null || filterPlatform  !== null || filterCategory!== null) {
            dispatch(fetchGames({ sort: sortBy.data, platform: filterPlatform.data, category: filterCategory.data }));
        } 
    }, [ sortBy, filterPlatform, filterCategory]);

    function handlerBtnFilter(dataType: string, e: any) {
        let params = {
        event: e,
        dataType: dataType,
        };
        dispatch(upDataFilter(params))
    }
    return (
        <Container className='main'>
            <Row>
                <Col md={3}>
                    <Menu handlerBtnFilter={handlerBtnFilter}/>
                </Col>
                    {error ? 
                        <>
                            <h3>{error}</h3>
                            <h3>{errorFilter}</h3>
                        </>
                        :
                        <>
                        {loading || loadingFilter ?
                            <Spinner animation="grow" />
                            :
                            <Col md={9}>
                                {games.length === 0 ? 
                                    <div>Игры с такими фильтрами не найдены </div>
                                    :
                                    <>
                                    <ListGames games={currentPageItems}/>
                                    <Pagination 
                                        currentPage={currentPage} 
                                        totalPages={totalPages} 
                                        handlerBtnNext={() => dispatch(nextPage())} 
                                        handlerBtnPrevious={() => dispatch(previousPage())}
                                    />
                                    </>
                                    
                                }
                                
                            </Col>
                        }
                        </>
                    
                    }
            </Row>
        </Container>
    );
}
