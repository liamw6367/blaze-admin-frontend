import React, {useContext, useState, useRef, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import TumbnailButton from '../Buttons/TumbnailButton';
import {useUpdatingDataValidation} from '../hooks/use-validation';
import axios from 'axios';

const EditProduct = (props) => {
    const {id} = useParams();

    const justCtx = useContext(JustifyContext);

    const [targetProduct, setTargetProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [productImage, setProductImage] = useState(null);
    const [urlObj, setUrlObj] = useState(null);
    const [enteredCategoryName, setEnteredCategoryName] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryDropdownIsShown, setCategoryDropdownIsShown] = useState(false);
    const [categoriesFieldIsTouched, setCategoriesFieldIsTouched] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/get-one?id=${id}`)
            .then((res) => {
                // console.log(res.data);
                setTargetProduct(res.data);
                setProductImage(res.data.image);
                setUrlObj(res.data.image_file);
                setSelectedCategories(res.data.product_category);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories/get`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(targetProduct);

    const history = useHistory();

    const {
        enteredValue: enteredProductName,
        inputIsValid: productNameInputIsValid,
        inputIsInvalid: productNameInputIsInvalid,
        changeInputValueHandler: changeProductNameInputValueHandler,
        blurInputHandler: blurProductNameInputHandler,
    } = useUpdatingDataValidation(targetProduct.name, (value) => value?.trim() !== "");
    const {
        enteredValue: enteredSalePrice,
        inputIsValid: salePriceInputIsValid,
        inputIsInvalid: salePriceInputIsInvalid,
        changeInputValueHandler: changeSalePriceInputValueHandler,
        blurInputHandler: blurSalePriceInputHandler,
    } = useUpdatingDataValidation(targetProduct.sales_price, (value) => value?.toString().trim() !== "");
    const {
        enteredValue: enteredNormalPrice,
        inputIsValid: normalPriceInputIsValid,
        inputIsInvalid: normalPriceInputIsInvalid,
        changeInputValueHandler: changeNormalPriceInputValueHandler,
        blurInputHandler: blurNormalPriceInputHandler,
    } = useUpdatingDataValidation(targetProduct.normal_price, (value) => value?.toString().trim() !== "");
    const {
        enteredValue: enteredDescription,
        inputIsValid: descriptionInputIsValid,
        inputIsInvalid: descriptionInputIsInvalid,
        changeInputValueHandler: changeDescriptionInputValueHandler,
        blurInputHandler: blurDescriptionInputHandler,
    } = useUpdatingDataValidation(targetProduct.description, (value) => value?.trim() !== "");

    const [productImageIsBeingChanged, setProductImageIsBeingChanged] = useState(false);

    const editImageHandler = (image, urlObj, isBeingChanged) => {
        setProductImage(image);
        setUrlObj(urlObj);
        setProductImageIsBeingChanged(isBeingChanged);
    };

    const categoryInputRef = useRef();

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
    };

    const categoriesFieldIsValid = selectedCategories?.length !== 0;
    const categoriesFieldIsInvalid = categoriesFieldIsTouched && !categoriesFieldIsValid;

    const filteredCategoriesByName = categories.filter(category => category.name.toLowerCase().includes(enteredCategoryName.toLowerCase()));

    const productDataFormIsValid = productNameInputIsValid && descriptionInputIsValid && productImage && salePriceInputIsValid && normalPriceInputIsValid && categoriesFieldIsValid;

    // const [isFromAddProduct, setIsFromAddProduct] = useState(false);

    const editProductDataHandler = (event) => {
        event.preventDefault();
        const productData = {
            id: targetProduct.id,
            name: enteredProductName,
            image: urlObj?.name || productImage,
            sales_price: enteredSalePrice,
            normal_price: enteredNormalPrice,
            description: enteredDescription,
            category_id: selectedCategories?.map(category => category.id) || 1,
            folder: '/product_images/'
        };
        const formData = new FormData();

        for (let key in productData) {
            if (key !== "image_file") {
                formData.append(key, productData[key]);
            }
        }

        if (urlObj) {
            formData.append('image_file', urlObj, urlObj.name);
        }
        for (let value of formData.values()) {
            console.log(value);
        }
        console.log(productData);
        axios.put(`${process.env.REACT_APP_API_URL}/products/update`, formData)
            .then((res) => {
                // props.onTrigger(res.data, isFromAddProduct);
                // setIsFromAddProduct(true);
                history.push('/admin/products');
                console.log("works")
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
                    <Link to="/admin/edit-product">
                        <p className="text-color">Edit Product</p>
                    </Link>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin"
                         onClick={(event) => hideCategoryNamesDropdownHandler(event)}>
                        <form action="#" name="productForm" id="product-form" onSubmit={editProductDataHandler}>
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
                                                <img src={ productImageIsBeingChanged ? `${productImage}` : `${process.env.REACT_APP_API_URL}/uploads/product_images/${productImage}` } alt={productImage}/>
                                            </div>
                                        )}
                                    </div>
                                    <TumbnailButton onAdd={editImageHandler}/>
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
                                                selectedCategories?.map(selectedCategory => {
                                                    return (
                                                        <div
                                                            className="selected-categories-box"
                                                            key={selectedCategory?.id}
                                                        >
                                                            <p className="selected-category-name"> {selectedCategory?.name} </p>
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
                                        Update
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

export default EditProduct;
