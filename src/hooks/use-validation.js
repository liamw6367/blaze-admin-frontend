import { useState } from 'react';

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
    const resetInputValueHandler = () => {
        setEnteredValue("");
        setInputIsTouched(false);
    }

    return {
        enteredValue,
        inputIsValid,
        inputIsEmpty,
        inputIsInvalid,
        changeInputValueHandler,
        blurInputHandler,
        resetInputValueHandler
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
    const resetInputValueHandler = () => {
        setEnteredValue("");
        setInputIsTouched(false);
    }

    return {
        enteredValue,
        inputIsValid,
        inputIsInvalid,
        changeInputValueHandler,
        blurInputHandler,
        resetInputValueHandler
    };
};

export const useUpdatingDataValidation = (inputValue, validateInput) => {
    const [enteredValue, setEnteredValue] = useState(inputValue);
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

