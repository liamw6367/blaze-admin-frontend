import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import CategoryNamesDropdown from '../Dropdowns/CategoryNamesDropdown';
import ProductInfo from '../Lists/ProductInfo';
import { useToken } from "../hooks/useToken";
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const Products = (props) => {
    const justCtx = useContext(JustifyContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [searchingText, setSearchingText] = useState("");
    const [chosenCategoryName, setChosenCategoryName] = useState("All");
    const [categories, setCategories] = useState([]);

    let roleName = "";

    

    const token = useToken();

    let store_id;
    
    if(token) {
      const decodedToken = jwtDecode(token);
       roleName = decodedToken.user_role?.name;
       if(roleName === "store admin"){
        store_id = jwtDecode(token).id
       }
       
    }

    useEffect(() => {
        if(!props.isFromAddProduct) {

          let obj = {};
          if(store_id){
            obj.store_id = store_id;
          }

        axios.get(`${process.env.REACT_APP_API_URL}/products/get`, { params: obj})
        .then((res) => {
            setIsLoading(false);
            console.log(res);
            setProducts(res.data);
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
        }
    }, [props]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories/get`)
        .then((res) => {
            console.log(res);
            setCategories(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
 
    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };
    const passCategoryNameHandler = (currentCategory) => {
        setChosenCategoryName(currentCategory.categoryName);
        console.log(currentCategory);
        console.log(currentCategory.categoryName);
    };
    const changeCategoryNameHandler = (allCategories) => {
        setChosenCategoryName(allCategories);
        console.log(allCategories);
    };

    console.log(products, "fff");

    const filteredProductsByData = products.filter( product => product.name.toLowerCase().includes(searchingText.toLowerCase()) );
    const filteredProductsByCategory = (chosenCategoryName === "All") 
                                        ? filteredProductsByData 
                                        : filteredProductsByData.filter( product => product.productCategory === chosenCategoryName );

    const removeHandler = (id) => {
        console.log(id);
        axios.delete(`${process.env.REACT_APP_API_URL}/products/remove?id=${id}`,)
            .then(res => {
                console.log(res.data, "sssssssssssssssss");
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    };

    if(isLoading) {
        return (
            <div>
                <p> Loading... </p>
            </div>
        );
    }

    return (
      <Blaze
        onClick={justCtx.onJustify}
        isExtended={justCtx.isExtended}
        nav={
          <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
            <p> Products </p>
          </div>
        }
        main={
          <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
            <div className="filtering justify">
              <span className="text"> View: </span>
              <div className="search-input">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search..."
                  onChange={changeInputHandler}
                />
                <i />
              </div>
              <span className="text"> Category: </span>
              <CategoryNamesDropdown
                categories={categories}
                onPass={passCategoryNameHandler}
                onChange={changeCategoryNameHandler}
                chosenCategoryName={chosenCategoryName}
              />
              { token && roleName === "store admin" ? (
                <div className="admin-button">
                  <Link to="/admin/select-product">Select New</Link>
                </div>
              ) : null }
              <div className="add-store-button">
                <Link to="/admin/add-product">Add New</Link>
              </div>
            </div>
            {filteredProductsByCategory.length === 0 ? (
              <div className="store-info-box all-orders-box">
                <h2 className="no-orders-available">No Products Available</h2>
              </div>
            ) : (
              <div className="store-info-box">
                <table className="info-table">
                  <thead>
                    <tr>
                      <th className="padding-left">#</th>
                      <th className="padding-left">Name</th>
                      <th>Image</th>
                      <th>Description</th>
                      <th className="last-box">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductsByCategory.map((product, index) => {
                      return (
                        <ProductInfo
                          product={product}
                          index={index + 1}
                          key={product.id}
                          onRemove={removeHandler}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        }
      />
    );
};

export default Products;