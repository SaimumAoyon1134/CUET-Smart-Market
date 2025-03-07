import "./productList.css";

import { DataGrid } from "@mui/x-data-grid";
import { productRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {  getProducts } from "../../redux/apiCalls";
import { deleteProduct } from "../../redux/apiCalls";
export default function ProductList() {

  const dispatch =useDispatch();
  const products = useSelector((state)=>state.product.products);
  useEffect(()=>{
    getProducts(dispatch);
  },[dispatch])

  const handleDelete = (id) => {
    deleteProduct(id,dispatch);
  };
   
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Details</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
console.log(products);
  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
