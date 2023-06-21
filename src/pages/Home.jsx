import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isloading, setisLoading] = useState(true);
    // хук, который предназначен, чтобы выполнить код после отрисовки, тк есть жизненный цикл компонента
    useEffect(() => {
        fetch('https://64920b3c2f2c7ee6c2c9570b.mockapi.io/items')
            .then((res) => {
                return res.json(); // конвертим данные в понятный для реакта вид, полученные с бека
            })
            .then((arr) => {
                setItems(arr); // записываем в функцию данные, полученные с бека
                setisLoading(false);
            });
    }, []);
    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isloading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map((obj) => <PizzaBlock key={obj.id}{...obj} />)}

                {/* если идет загрузка, то мы создаем фейк массив из 6 состовляющих и превращаем его в массив скелетонов, а когда условие ложно, то загрузка кончилась и мы отрисовываем новый массив с полученными данными от бека */}
            </div>
        </div>
    );
};

export default Home;