import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState, useEffect } from 'react';
import { setDebouncedValue } from './debouncedSlide';
import { setCurrentUser } from './currentUserSlide';


export const useDebouced = (value:string, delay: number) =>{
    const dispatch = useDispatch();
    const debouncedValue = useSelector((state: RootState)=>state.debounced.value);
    const [searchValue, setSearchValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            dispatch(setDebouncedValue(searchValue));
        },delay);
        return ()=>{
            clearTimeout(handler);
        };
    },[searchValue,delay,dispatch]);

    useEffect(() => {
        setSearchValue(value);
    }, [value]);
    
    return debouncedValue;
}


export const useCurrentUser = () =>{
  const dispatch = useDispatch();
    dispatch(setCurrentUser(true));
}


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;