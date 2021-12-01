import React, { useState, useEffect } from 'react';
import ProductInfo from '../Lists/ProductInfo';
import Paginator from 'react-hooks-paginator';

const ProductsTableByCategory = (props) => {
    
  const pageLimit = 2;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const [data ,setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

    let mediaCardElementRevers = props.filteredProductsByCategory.map((product, index) =>{
      return (
        <ProductInfo
          product={product}
          index={index + 1}
          key={product.id}
          onRemove={props.removeHandler}
        />
      );
    })
 
    useEffect(() => {
      setCurrentData(mediaCardElement.slice(offset, offset + pageLimit));
    }, [offset, data, props]);

    let mediaCardElement = mediaCardElementRevers.reverse();

    return (
      
            <div>
              {props.filteredProductsByCategory.length === 0 ? (
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
                    {!props.searchingText
                      ? currentData.map((mediaCardElement) => (
                          <>{mediaCardElement}</>
                        ))
                      : props.filteredProductsByCategory.map((product, index) =>{
                        return (
                          <ProductInfo
                            product={product}
                            index={index + 1}
                            key={product.id}
                            onRemove={props.removeHandler}
                          />
                        );
                  })}
                  </tbody>
                </table>
              </div>
            )}
            <Paginator
              totalRecords={mediaCardElement.length}
              pageLimit={pageLimit}
              pageNeighbours={1}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            </div>
            
    );
};

export default ProductsTableByCategory;