import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import styled from "styled-components";

const ProductForm = ({ product = null, onSuccess }) => {
  const [inputs, setInputs] = useState(product || {
    title: "",
    desc: "",
    img: "",
    categories: "",
    size: "",
    color: "",
    price: "",
    inStock: true,
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = product
        ? `http://localhost:2000/api/products/${product._id}`
        : "http://localhost:2000/api/products/";

      const method = product ? "put" : "post";
      const res = await axios[method](url, inputs, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Product added successfully!");

      toast.success(`Product ${product ? "updated" : "created"} successfully!`);
      onSuccess();

    } catch (error) {
      toast.error("Error saving product!");
    }
  };
  const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  margin-top:10px;
`;
const Select = styled.select`
width: 320px;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;

   margin-top:10px;
`;
const Container=styled.div`
 
  width:70vh;
  margin-left:100px;

`;
const Button = styled.button`
 
    width: 320px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:hover {
    outline: none;
    background-color: teal;
  }
  margin-top:10px;
`

  return (
<div style={{ width: "70vh", marginLeft: "400px" }}>
    <form onSubmit={handleSubmit}>
      <input style={{ 
    width: "300px", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "5px", 
    marginTop: "10px" 
  }} name="title" placeholder="Title" value={inputs.title} onChange={handleChange} required />
      <input style={{ 
    width: "300px", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "5px", 
    marginTop: "10px" 
  }} name="desc" placeholder="Description" value={inputs.desc} onChange={handleChange} required />
      <input style={{ 
    width: "300px", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "5px", 
    marginTop: "10px" 
  }}  name="img" placeholder="Image URL" value={inputs.img} onChange={handleChange} required />

      <Select name="categories" value={inputs.categories} onChange={handleChange}>
        <option value={""}>Select category</option>
        <option value={"Used"}>Used</option>
        <option value={"New"}>New</option>
      </Select>
      <input style={{ 
    width: "300px", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "5px", 
    marginTop: "10px" 
  }}  name="size" placeholder="Size(Optional) " value={inputs.size} onChange={handleChange} />
      <input style={{ 
    width: "300px", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "5px", 
    marginTop: "10px" 
  }}  name="color" placeholder="Color(Optional) " value={inputs.color} onChange={handleChange} />
      <input style={{ 
    width: "300px", 
    padding: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "5px", 
    marginTop: "10px" 
  }}  name="price" type="number" placeholder="Price" value={inputs.price} onChange={handleChange} required />
      <Select name="inStock" value={inputs.inStock} onChange={handleChange}>
        <option value={true}>In Stock</option>
        <option value={false}>Out of Stock</option>
      </Select>
      <Button type="submit">{product ? "Update" : "Create"} Product</Button>

    </form>
    </div>
  );
};

export default ProductForm;