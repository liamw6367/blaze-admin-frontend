import React, {useContext, useState, useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import TumbnailButton from '../Buttons/TumbnailButton';
import {useDataValidation} from '../hooks/use-validation';
import axios from 'axios';

const AddProduct = (props) => {
    const justCtx = useContext(JustifyContext);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories/get`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const history = useHistory();

    const {
        enteredValue: enteredProductName,
        inputIsValid: productNameInputIsValid,
        inputIsInvalid: productNameInputIsInvalid,
        changeInputValueHandler: changeProductNameInputValueHandler,
        blurInputHandler: blurProductNameInputHandler,
    } = useDataValidation(value => value.trim() !== "");
    const {
        enteredValue: enteredSalePrice,
        inputIsValid: salePriceInputIsValid,
        inputIsInvalid: salePriceInputIsInvalid,
        changeInputValueHandler: changeSalePriceInputValueHandler,
        blurInputHandler: blurSalePriceInputHandler,
    } = useDataValidation(value => value.trim() !== "");
    const {
        enteredValue: enteredNormalPrice,
        inputIsValid: normalPriceInputIsValid,
        inputIsInvalid: normalPriceInputIsInvalid,
        changeInputValueHandler: changeNormalPriceInputValueHandler,
        blurInputHandler: blurNormalPriceInputHandler,
    } = useDataValidation(value => value.trim() !== "");
    const {
        enteredValue: enteredDescription,
        inputIsValid: descriptionInputIsValid,
        inputIsInvalid: descriptionInputIsInvalid,
        changeInputValueHandler: changeDescriptionInputValueHandler,
        blurInputHandler: blurDescriptionInputHandler,
    } = useDataValidation(value => value.trim() !== "");

    const [productImage, setProductImage] = useState(null);
    const [urlObj, setUrlObj] = useState(null);

    const addImageHandler = (image, urlObj) => {
        setProductImage(image);
        setUrlObj(urlObj)
        console.log("***");
    };

    const categoryInputRef = useRef();

    const [enteredCategoryName, setEnteredCategoryName] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryDropdownIsShown, setCategoryDropdownIsShown] = useState(false);
    const [categoriesFieldIsTouched, setCategoriesFieldIsTouched] = useState(false);

    const addSelectedCategoryHandler = (event, selectedCategory) => {
        event.stopPropagation();
        categoryInputRef.current.focus();
        setCategories(prevCategories => prevCategories.filter(category => category.id !== selectedCategory.id));
        setSelectedCategories(prevCategories => [...prevCategories, selectedCategory]);
        setEnteredCategoryName("");
    };
    const removeSelectedCategoryHandler = (selectedCategory) => {
        categoryInputRef.current.focus();
        setCategories(prevCategories => [selectedCategory, ...prevCategories]);
        setSelectedCategories(prevCategories => prevCategories.filter(category => category.id !== selectedCategory.id));
    };

    const showCategoryNamesDropdownHandler = (event) => {
        event.stopPropagation();
        setCategoryDropdownIsShown(true);
    };
    const hideCategoryNamesDropdownHandler = (event) => {
        event.stopPropagation();
        setCategoryDropdownIsShown(false);
        console.log("***********");
    };

    const categoriesFieldIsValid = selectedCategories.length !== 0;
    const categoriesFieldIsInvalid = categoriesFieldIsTouched && !categoriesFieldIsValid;

    const filteredCategoriesByName = categories.filter(category => category.name.toLowerCase().includes(enteredCategoryName.toLowerCase()));

    const productDataFormIsValid = productNameInputIsValid && descriptionInputIsValid && productImage && salePriceInputIsValid && normalPriceInputIsValid && categoriesFieldIsValid;

    const [isFromAddProduct, setIsFromAddProduct] = useState(false);

    const addProductDataHandler = (event) => {
        event.preventDefault();
        const productData = {
            name: enteredProductName,
            image_file: urlObj,
            // image: urlObj.name,
            image: productImage,
            sales_price: enteredSalePrice,
            normal_price: enteredNormalPrice,
            description: enteredDescription,
            product_category: selectedCategories.map(category => category.id),
            folder: '/category_images/'
        };
        const formData = new FormData();

        for (let key in productData) {
            if (key !== "image_file") {
                formData.append(key, productData[key]);
            }
        }

        formData.append('image_file', productData.image_file, productData.image_file.name);
        for (let value of formData.values()) {
            console.log(value);
        }
        console.log(productData);
        axios.post(`${process.env.REACT_APP_API_URL}/products/add`, formData)
            .then((res) => {
                props.onTrigger(res.data, isFromAddProduct);
                setIsFromAddProduct(true);
                history.push('/admin/products');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/products">
                        <p>Products/</p>
                    </Link>
                    <Link to="/admin/add-product">
                        <p className="text-color">Add Product</p>
                    </Link>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin" onClick={ (event) => hideCategoryNamesDropdownHandler(event) }>
                        <form action="#" name="productForm" id="product-form" onSubmit={addProductDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="product-name" className="label">Name *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${productNameInputIsInvalid ? "invalid" : productNameInputIsValid ? "valid" : ""}`}
                                            type="text"
                                            name="productName"
                                            id="product-name"
                                            value={enteredProductName}
                                            onChange={changeProductNameInputValueHandler}
                                            onBlur={blurProductNameInputHandler}
                                            autoComplete="off"
                                        />
                                        {
                                            productNameInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Image *</p>
                                    <div className="tumbnail-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats
                                            and greater resolution than 150x150
                                        </p>
                                        {productImage && (
                                            <div className="tumbnail">
                                                <img src={productImage} alt=""/>
                                            </div>
                                        )}
                                    </div>
                                    <TumbnailButton onAdd={addImageHandler}/>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="sale-price" className="label">Sale Price *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${salePriceInputIsInvalid ? "invalid" : salePriceInputIsValid ? "valid" : ""}`}
                                            type="number"
                                            name="salePrice"
                                            id="sale-price"
                                            value={enteredSalePrice}
                                            onChange={changeSalePriceInputValueHandler}
                                            onBlur={blurSalePriceInputHandler}
                                            autoComplete="off"
                                        />
                                        {
                                            salePriceInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="normal-price" className="label">Normal Price *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${normalPriceInputIsInvalid ? "invalid" : normalPriceInputIsValid ? "valid" : ""}`}
                                            type="number"
                                            name="normalPrice"
                                            id="normal-price"
                                            value={enteredNormalPrice}
                                            onChange={changeNormalPriceInputValueHandler}
                                            onBlur={blurNormalPriceInputHandler}
                                            autoComplete="off"
                                        />
                                        {
                                            normalPriceInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="product-description" className="address-label label">Description *
                                    </label>
                                    <div>
                                        <textarea
                                            className={`user-inputs__input address-input ${descriptionInputIsInvalid ? "invalid" : descriptionInputIsValid ? "valid" : ""}`}
                                            name="productDescription"
                                            id="product-description"
                                            value={enteredDescription}
                                            onChange={changeDescriptionInputValueHandler}
                                            onBlur={blurDescriptionInputHandler}
                                        />
                                        {
                                            descriptionInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="categories" className="label">Categories *</label>
                                    <div
                                        className={`categories-box ${categoriesFieldIsInvalid ? "invalid" : categoriesFieldIsValid ? "valid" : ""}`}>
                                        <div className="products-and-input-container">
                                            {
                                                selectedCategories.map(selectedCategory => {
                                                    return (
                                                        <div 
                                                            className="selected-categories-box"
                                                            key={selectedCategory.id}
                                                        >
                                                            <p className="selected-category-name"> {selectedCategory.name} </p>
                                                            <span
                                                                className="remove-sel-category-icon"
                                                                onClick={removeSelectedCategoryHandler.bind(null, selectedCategory)}
                                                            >
                                                                x
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <input
                                                ref={categoryInputRef}
                                                className="user-inputs__input categories-input"
                                                type="text"
                                                name=""
                                                id="categories"
                                                value={enteredCategoryName}
                                                onChange={(event) => setEnteredCategoryName(event.target.value)}
                                                onClick={(event) => showCategoryNamesDropdownHandler(event)}
                                                onBlur={() => setCategoriesFieldIsTouched(true)}
                                                autoComplete="off"
                                            />
                                        </div>
                                        {
                                            categoriesFieldIsInvalid &&
                                            <p className="error-message product-error">This field is required!</p>
                                        }
                                        {
                                            categoryDropdownIsShown && (
                                                <div className="categories-dropdown-box">
                                                    <ul>
                                                        {
                                                            (filteredCategoriesByName.length === 0)
                                                                ? (
                                                                    <div className="no-matches-found-box">
                                                                        <h2 className="no-matches-found-message">No Matches
                                                                            Found
                                                                        </h2>
                                                                    </div>
                                                                )
                                                                : (
                                                                    filteredCategoriesByName.map(category => {
                                                                        return (
                                                                            <li
                                                                                key={category.id}
                                                                                onClick={(event) => addSelectedCategoryHandler(event, category)}
                                                                            >
                                                                                {category.name}
                                                                            </li>
                                                                        )
                                                                    })
                                                                )
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <button
                                        type="submit"
                                        className="submit-store"
                                        disabled={!productDataFormIsValid}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    );
};

export default AddProduct;
