import React, { useContext } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
    const [value, setValue] = React.useState('');
    const { setSearchValue } = useContext(SearchContext);
    // c помощью хука useContext мы вытаскиваем содержимое пременной SearchContext исходя из прицнипа работы контекста. это как обработчик событий, он слушает измнения контекста

    const inputRef = React.useRef();

    const onClickCLiker = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    };

    // чтобы функция не перерисовывалась и debounce не терял ссылку на элемент нужно использовать useCallback
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 1000), [],
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value)
    };

    return (
        <div className={styles.root}>
            {/* сделали компонент контролируемый, благодаря контексту в реакте  */}
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
            {/* ссылка на элемент */}
            <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы..." />
            {value && (
                <svg onClick={onClickCLiker} className={styles.clear} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" /></svg>
            )}
        </div>
    )
}

export default Search;