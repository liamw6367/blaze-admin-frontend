import React, {useContext, useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useUpdatingDataValidation} from '../hooks/use-validation';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import TumbnailButton from '../Buttons/TumbnailButton';
import BannerButton from '../Buttons/BannerButton';
import axios from "axios";

const EditCategory = (props) => {
    // const {targetCategory} = props;
    const {id} = useParams();

    const [targetCategory, setTargetCategory] = useState({
        name: "",
        thumbnail: "",
        banner: "",
        description: "",
        is_active: 0
    });
    const [tumbNail, setTumbNail] = useState(null);
    const [banner, setBanner] = useState(null);
    const [categoryIsActive, setCategoryIsActive] = useState(false);

    const [error, setError] = useState();

    const justCtx = useContext(JustifyContext);

    useEffect(() => {
        // console.log(id)
        axios.get(`${process.env.REACT_APP_API_URL}/categories/get-one?id=${id}`)
            .then((res) => {
                // setIsLoading(false);
                setTargetCategory(res.data);
                setTumbNail(res.data.thumbnail);
                setBanner(res.data.banner);
                setCategoryIsActive(res.data.is_active);
                // console.log(targetCategory);
                // console.log(res.data, "sudasda");
            })
            .catch((err) => {
                // setIsLoading(false);
                console.log(err.message, "mmessage");
            });
    }, [id]);

    const history = useHistory();
    // console.log(targetCategory);

    const {
        enteredValue: enteredCategoryName,
        inputIsValid: categoryNameInputIsValid,
        inputIsInvalid: categoryNameInputIsInvalid,
        changeInputValueHandler: changeCategoryNameInputValueHandler,
        blurInputHandler: blurCategoryNameInputHandler,
    } = useUpdatingDataValidation(targetCategory.name, (value) => value.trim() !== "");

    const {
        enteredValue: enteredDescription,
        inputIsValid: descriptionInputIsValid,
        inputIsInvalid: descriptionInputIsInvalid,
        changeInputValueHandler: changeDescriptionInputValueHandler,
        blurInputHandler: blurDescriptionInputHandler,
    } = useUpdatingDataValidation(targetCategory.description, (value) => value.trim() !== "");


    const [thumbnailUrlObj, setThumbnailUrlObj] = useState(null);
    const [bannerUrlObj, setBannerUrlObj] = useState(null);

    const [thumbnailIsBeingChanged, setThumbnailIsBeingChanged] = useState(false);
    const [bannerIsBeingChanged, setBannerIsBeingChanged] = useState(false);

    const addTumbNailHandler = (tumbnail, urlObj, isBeingChanged) => {
        setTumbNail(tumbnail);
        setThumbnailUrlObj(urlObj);
        setThumbnailIsBeingChanged(isBeingChanged);
    };
    const addBannerHandler = (banner, urlObj, isBeingChanged) => {
        setBanner(banner);
        setBannerUrlObj(urlObj);
        setBannerIsBeingChanged(isBeingChanged);
    };

    const updatedCategoryDataFormIsValid = categoryNameInputIsValid && descriptionInputIsValid && tumbNail && banner;

    const updateCategoryDataHandler = (event) => {
        event.preventDefault();

        const updatedCategoryData = {
            id: targetCategory.id,
            name: enteredCategoryName,
            thumbnail: thumbnailUrlObj?.name || tumbNail,
            banner: bannerUrlObj?.name || banner,
            description: enteredDescription,
            is_active: +categoryIsActive
        }

        const formData = new FormData();
        for (let key in updatedCategoryData) {
            formData.append(key, updatedCategoryData[key]);
        }

        if (thumbnailUrlObj) {
            formData.append('thumbnail_file', thumbnailUrlObj, thumbnailUrlObj.name);
        }
        if (bannerUrlObj) {
            formData.append('banner_file', bannerUrlObj, bannerUrlObj.name);
        }
        for (let value of formData.values()) {
            // console.log(value);
        }
        axios.put(`${process.env.REACT_APP_API_URL}/categories/update`, formData).then((res) => {
            console.log(res);
            history.push('/admin/categories');
        }).catch((err) => {
            setError(err.response.data.msg);
            console.log(err.response.data.msg);
            console.log(new Error());
        });


        // props.onUpdate(updatedCategoryData);
        //
        // history.push('/admin/categories');
    };

    if(error) {
        return (
            <div style={{textAlign: "center"}}>
                <h1> {error} </h1>
            </div>
        );
    }

    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav border" : "wide-blaze-nav border"}>
                    <Link to="/admin/categories">
                        <p>Categories/</p>
                    </Link>
                    <Link to="/admin/edit-category">
                        <p className="text-color">Edit Category</p>
                    </Link>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="store-info-box info-box-margin">
                        <form action="#" name="" id="" onSubmit={updateCategoryDataHandler}>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="category-name" className="label">Name *</label>
                                    <div>
                                        <input
                                            className={`user-inputs__input ${categoryNameInputIsInvalid ? "invalid" : categoryNameInputIsValid ? "valid" : ""}`}
                                            type="text"
                                            name=""
                                            id="category-name"
                                            value={enteredCategoryName}
                                            onChange={changeCategoryNameInputValueHandler}
                                            onBlur={blurCategoryNameInputHandler}
                                        />
                                        {
                                            categoryNameInputIsInvalid &&
                                            <p className="error-message">This field is required!</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Thumbnail *</p>
                                    <div className="tumbnail-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats
                                            and greater resolution than 150x150
                                        </p>
                                        {tumbNail && (
                                            <div className="tumbnail">
                                                <img
                                                    src={thumbnailIsBeingChanged ? `${tumbNail}` : (`${process.env.REACT_APP_API_URL}/uploads/category_thumbs/${targetCategory.thumbnail}`)}
                                                    alt={`thumbnail`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <TumbnailButton onAdd={addTumbNailHandler}/>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <p className="user-inputs__title">Banner *</p>
                                    <div className="banner-box">
                                        <p className="explanation-text">
                                            Please upload only image files consisting of jpg, png, bitmap file formats
                                            and greater resolution than 1024x512
                                        </p>
                                        {banner && (
                                            <div className="banner">
                                                <img
                                                    src={ bannerIsBeingChanged ? `${banner}` : `${process.env.REACT_APP_API_URL}/uploads/category_banners/${banner}`}
                                                    alt={`banner`}
                                                    className="banner"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <BannerButton onAdd={addBannerHandler}/>
                                </div>
                            </div>
                            <div className="user-inputs">
                                <div className="user-inputs__container">
                                    <label htmlFor="category-description" className="label address-label">Description
                                        *
                                    </label>
                                    <div>
                                        <textarea
                                            className={`user-inputs__input address-input ${descriptionInputIsInvalid ? "invalid" : descriptionInputIsValid ? "valid" : ""}`}
                                            name=""
                                            id="category-description"
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
                                <div className="checkbox-container">
                                    <div className="active-inactive__checkbox">
                                        <label htmlFor="category-status" className="active-inactive-label">Active
                                        </label>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="category-status"
                                            className="active-inactive-input"
                                            checked={categoryIsActive}
                                            onChange={(event) => setCategoryIsActive(event.target.checked)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="submit-store"
                                        disabled={!updatedCategoryDataFormIsValid}
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

export default EditCategory;