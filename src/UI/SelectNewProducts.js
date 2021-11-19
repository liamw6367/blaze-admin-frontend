import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from '../Pages/Blaze';
import CategoryNamesDropdown from '../Dropdowns/CategoryNamesDropdown';
//import SelectedProductInfo from '../Lists/SelectedProductInfo';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const SelectedProducts = (props) => {
    const justCtx = useContext(JustifyContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [searchingText, setSearchingText] = useState("");
    const [chosenCategoryName, setChosenCategoryName] = useState("All");
    const [categories, setCategories] = useState([]);
    const [items,setItems] = useState()
    const [allSelect, setAllselect] = useState([]);
    const history = useHistory()

    let user_id;
    let token = localStorage.getItem('token')
    if(token) {
      user_id = jwtDecode(token).id
    }

    let roleName;
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

        axios.get(`${process.env.REACT_APP_API_URL}/products/get`)
        .then((res) => {
            setIsLoading(false);
            setProducts(res.data);
            
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
        }
    }, [props]);



    useEffect(() => {
      let obj = {};
      if(store_id){
        obj.store_id = 1;
      }



      axios.get(`${process.env.REACT_APP_API_URL}/products/get`,{ params: obj})
            .then(res => {
                const data = res.data
                setItems(data)
            })
    },[])


    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API_URL}/categories/get`)
    //     .then((res) => {
    //         console.log(res);
    //         setCategories(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }, []);

 
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


 
  
    useEffect(() => {
      setAllselect(products)
    }, [products])

  //   useEffect(() => {
  //     let checked = true
  //     let tempUser;
  //     items && items.map(newElem => {
  //       tempUser = allSelect &&  allSelect?.map((item) =>
  //       newElem.id === item.id ? { ...item, isChecked: checked }: item
  //     )
  //     })
  //       setAllselect(tempUser);

  // },[])



    //console.log(filteredProductsByCategory, "allselect");
    console.log(items)
    console.log(allSelect)
    
    const handleChange = (e) => {
      const {name, checked} = e.target;
        console.log(name, checked)

      if (name === "allSelect") {
        let tempUser = allSelect.map((item) => {
          return { ...item, isChecked: checked };
        });
        setAllselect(tempUser);
        
      }
      else {
        let tempUser = allSelect.map((item) =>
          item.name === name ? { ...item, isChecked: checked } : item
        )
          console.log(tempUser)
        setAllselect(tempUser);
      }
    }

    const addProductToStore = (e) => {
      e.preventDefault();

      const data = {
        store_id: user_id,
        product_ids: []
      }

      allSelect.forEach(item => {
        if(item.isChecked){
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

    console.log(items)

    if(isLoading) {
        return (
            <div>
                <p> Loading... </p>
            </div>
        );
    }

       function dataChecked(product) {
        let found = items?.find(item => item.id === product.id)
        // setAllselect(found, {isChecked : !!found})
           return found
       }
    //let selectedProductList = [];

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
                          //className="form-check-input"
                          checked={!allSelect?.some((item) => item?.isChecked !== true) }
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
                    {allSelect?.map((product, index) => {
                      return (
                        <tr>
                          <td className="selected-product">
                            <input
                              type="checkbox"
                              name={product.name}
                              //className="form-check-input"
                              checked={product?.isChecked || dataChecked(product)}
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

                        // <SelectedProductInfo
                        //   product={product}
                        //   index={index + 1}
                        //   key={product.id}
                        //   checked={true}
                        //   onChange={handleChange}
                        // />
                      );
                    })}
                  </tbody>
                </table>
                <div className="add-new-button">
                   <button className="" type="submit" onClick={addProductToStore}>Add</button>
                </div>
              </div>
            )}
          </div>
        }
      />
    );
};

export default SelectedProducts;