import React from 'react'

// кладем в функцию Categories стейт из родителя и функцию меняющую состояние 
function Categories({ value, onClickCategory }) {

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>{categoryName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;