import { useState, useEffect } from 'react';

export const useLoginValidation = (validateInput, checkEmptiness) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [inputIsTouched, setInputIsTouched] = useState(false);

    const inputIsValid = validateInput(enteredValue);
    const inputIsEmpty = inputIsTouched && checkEmptiness(enteredValue);
    const inputIsInvalid = inputIsTouched && !inputIsEmpty && !inputIsValid;

    const changeInputValueHandler = (event) => {
        setEnteredValue(event.target.value);
        // setInputIsTouched(false);
    };
    const blurInputHandler = () => {
        setInputIsTouched(true);
    };

    return {
        enteredValue,
        inputIsValid,
        inputIsEmpty,
        inputIsInvalid,
        changeInputValueHandler,
        blurInputHandler,
    };
};

export const useDataValidation = (validateInput) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [inputIsTouched, setInputIsTouched] = useState(false);

    const inputIsValid = validateInput(enteredValue);
    const inputIsInvalid = inputIsTouched && !inputIsValid;

    const changeInputValueHandler = (event) => {
        setEnteredValue(event.target.value);
        // setInputIsTouched(false);
    };
    const blurInputHandler = () => {
        setInputIsTouched(true);
    };


    return {
        enteredValue,
        inputIsValid,
        inputIsInvalid,
        changeInputValueHandler,
        blurInputHandler,
    };
};

export const useUpdatingDataValidation = (inputValue, validateInput) => {
    const [enteredValue, setEnteredValue] = useState(inputValue?.toString());
    const [inputIsTouched, setInputIsTouched] = useState(false);

    useEffect(() => {
        setEnteredValue(inputValue);
    }, [inputValue]);

    const inputIsValid = validateInput(enteredValue);
    const inputIsInvalid = inputIsTouched && !inputIsValid;

    const changeInputValueHandler = (event) => {
        setEnteredValue(event.target.value);
        // setInputIsTouched(false);
    };
    const blurInputHandler = () => {
        setInputIsTouched(true);
    };
    // console.log("work updating validation function", enteredValue)

    return {
        enteredValue,
        inputIsValid,
        inputIsInvalid,
        changeInputValueHandler,
        blurInputHandler,
    };
};

