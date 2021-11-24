import React, { useState, useContext, useEffect } from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import CategoryNamesDropdown from '../Dropdowns/CategoryNamesDropdown';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Paginator from 'react-hooks-paginator';

const SelectedProducts = (props) => {
    const justCtx = useContext(JustifyContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchingText, setSearchingText] = useState("");
    const [chosenCategoryName, setChosenCategoryName] = useState("All");
    const [categories, setCategories] = useState([]);
    const [checkProduct, setCheckProduct] = useState()
    const [allSelect, setAllselect] = useState([]);
    const history = useHistory();
    const [filteredAllSelect,setFilteredAllSelect] = useState()

    const pageLimit = 2;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data ,setData] = useState([]);
    const [currentData, setCurrentData] = useState([])

    console.log(currentPage);
    let user_id;
    let token = localStorage.getItem('token')
    if (token) {
        user_id = jwtDecode(token).id
    }

    let roleName;
    let store_id;

    if (token) {
        const decodedToken = jwtDecode(token);
        roleName = decodedToken.user_role?.name;
        if (roleName === "store admin") {
            store_id = jwtDecode(token).id
        }
    }



    useEffect(() => {
      async function fetchMyAPI() {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/products/get`)
        response = await response.data
        setProducts(response)
        setIsLoading(false);
      }
  
      fetchMyAPI()
    }, [])

    

    
    useEffect(() => {
      let obj = {};
      if(store_id){
        obj.store_id = store_id
      }
      axios.get(`${process.env.REACT_APP_API_URL}/products/get`,{ params: obj})
            .then(res => {
              const data = res.data
              setCheckProduct(data)
            })
    }, [])


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

    const filteredProductsByData = products.filter( product => product.name.toLowerCase().includes(searchingText.toLowerCase()) );
    const filteredProductsByCategory = (chosenCategoryName === "All") ? filteredProductsByData 
      : filteredProductsByData.filter( product => product.productCategory === chosenCategoryName );
 
    //const [allSelect, setAllselect] = useState([]);

    useEffect(() => {
      setFilteredAllSelect(products)
      setAllselect(products)
      if(checkProduct){
        let tempUser;
        console.log(checkProduct);
        let arr =[]
        checkProduct.map(item => {
          return arr.push(item.id)
        })
        tempUser = products.map(item => {
          return arr.includes(item.id) ? { ...item, isChecked: true } : item
        })
        setAllselect(tempUser);
      }
    }, [checkProduct,products])

    console.log(filteredAllSelect)
    
    let savedItems = [];
    const handleChange = (e) => {
      const {name, checked} = e.target;
      let tempUser;
      console.log(name, checked);

      if (name === "allSelect") {
        tempUser = currentData.map((item) => {
          return { ...item, isChecked: checked };
        });

      const data =  filteredAllSelect.map(fall => {
          if(currentData.find(el => el.id === fall.id)){
          return   fall.isChecked= checked ;
          }
        })
        console.log(filteredAllSelect);
      

        setFilteredAllSelect(data)
        setCurrentData(tempUser);
        
        console.log(tempUser);
      }
      else {
        tempUser = allSelect.map( item => {
          return item.name === name ? { ...item, isChecked: checked } : item
        })
        setAllselect(tempUser);  
      }
      tempUser.forEach(item => {
        item.isChecked ? savedItems.push(item.id) : savedItems.filter(si => si!==item.id)
      })
    
    }
  
    // useEffect(() => {
    //    setData(allSelect)
    // }, [allSelect]);

      useEffect(() => {
    setCurrentData(allSelect.slice(offset, offset + pageLimit));
  }, [offset, allSelect]);

    const addProductToStore = (e) => {

        e.preventDefault();

        const data = {
            store_id: user_id,
            product_ids: []
        }
        console.log(data)

        allSelect.forEach(item => {
            if (item.isChecked) {
                data.product_ids.push(item.id)
            }
        })
        axios.post(`${process.env.REACT_APP_API_URL}/products/add-to-store`, data)
            .then((res) => {
                history.push('/admin/products')
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (isLoading) {
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
            <p> Selected New Products </p>
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
                      <th className="selected-product">
                        <input
                          type="checkbox"
                          name = "allSelect"
                          checked={!currentData.some((item) => item?.isChecked !== true) }
                          onChange={handleChange}
                        />
                      </th>
                      <th className="selected-product"># </th>
                      <th className="selected-product">Name</th>
                      <th className="selected-product-desc">Image</th>
                      <th className="selected-product-desc">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(allSelect)}
                    {currentData.map((product, index) => {
                      return (
                        <tr>
                          <td className="selected-product">
                            <input
                              type="checkbox"
                              name={product.name}
                              checked={product?.isChecked || false}
                              onChange={handleChange}
                            />
                          </td>
                          <td className="selected-product">{index + 1}</td>
                          <td className="selected-product">
                            {product.name}
                          </td>
                          <td className="selected-product-desc">
                            <img
                              width="50"
                              src={`${process.env.REACT_APP_API_URL}/uploads/product_images/${product.image}`}
                              alt="product"
                            />
                          </td>
                          <td>{product.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button className="add-new-button" type="submit" onClick={addProductToStore}>Add</button>
             </div>
             
            )}
        <Paginator
        totalRecords={allSelect.length}
        pageLimit={pageLimit}
        pageNeighbours={1}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
          </div>
        }
      />
    );
 };

export default SelectedProducts;