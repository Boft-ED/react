import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
// вытаскиваем метод из слайса
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
    // вытащили categoryId из изначального стейта 
    const dispatch = useDispatch();
    const { categoryId, sort } = useSelector(state => state.filter);

    const { searchValue } = useContext(SearchContext); // мы просим с помощью хука следить за изменением контекста => если контекст меняется => происходит перерисовка 
    const [items, setItems] = useState([]);
    const [isloading, setisLoading] = useState(true);
    // хук, который предназначен, чтобы выполнить код после отрисовки, тк есть жизненный цикл компонента
    const [pagePagination, setPagePagination] = useState(1);

    // диспатчем передаем id обратно в reducers 
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    useEffect(() => {
        setisLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://64920b3c2f2c7ee6c2c9570b.mockapi.io/items?page=${pagePagination}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,)
            .then((res) => {
                return res.json(); // конвертим данные в понятный для реакта вид, полученные с бека
            })
            .then((arr) => {
                setItems(arr); // записываем в функцию данные, полученные с бека
                setisLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, pagePagination]); // зависимость от которой будет делаться запрос, если один из параметров изменится 

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
                {isloading ? sceletons : pizzas}
            </div>
            {/* если идет загрузка, то мы создаем фейк массив из 6 состовляющих и превращаем его в массив скелетонов, а когда условие ложно, то загрузка кончилась и мы отрисовываем новый массив с полученными данными от бека */}
            <Pagination onChangePage={number => setPagePagination(number)} />
        </div>

    );
};

export default Home;