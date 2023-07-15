import { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
// вытаскиваем метод из слайса
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { getPizzas } from '../redux/slices/pizzasSlice';


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    // вытащили categoryId из изначального стейта 
    const { items, status } = useSelector((state) => state.pizza);
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);

    const { searchValue } = useContext(SearchContext); // мы просим с помощью хука следить за изменением контекста => если контекст меняется => происходит перерисовка 

    // диспатчем передаем id обратно в reducers 
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // fetch(`https://64920b3c2f2c7ee6c2c9570b.mockapi.io/items?page=${pagePagination}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,)
        //     .then((res) => {
        //         return res.json(); // конвертим данные в понятный для реакта вид, полученные с бека
        //     })
        //     .then((arr) => {
        //         setItems(arr); // записываем в функцию данные, полученные с бека
        //         setisLoading(false);
        //     });
        // await axios.get(`https://64920b3c2f2c7ee6c2c9570b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`).then(res => {
        //     setItems(res.data); // записываем в функцию данные, полученные с бека
        //     setisLoading(false);
        // });

        // сделали последовательное выполнение кода(отложили) 
        dispatch(getPizzas({
            sortBy,
            order,
            category,
            search,
        }));
    };

    // если не было первого рендера, то не нужно вшивать в адрессную строчку параметры
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, currentPage])

    // если что-то поменялось в поисковой строчке, то мы будем вшивать в редакс параметры поиска. сначала парсим параметры, превращаемя в обьект и передаем в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [])

    // если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort, searchValue, currentPage]); // зависимость от которой будет делаться запрос, если один из параметров изменится 

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id}{...obj} />);
    const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
    return (
        <div className="container">
            <div className="content__top">
                {/* в компоненты отдаем стэйты родителя  */}
                <Categories value={categoryId} onClickCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'loading' ? sceletons : pizzas}
            </div>
            {/* если идет загрузка, то мы создаем фейк массив из 6 состовляющих и превращаем его в массив скелетонов, а когда условие ложно, то загрузка кончилась и мы отрисовываем новый массив с полученными данными от бека */}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>

    );
};

export default Home;