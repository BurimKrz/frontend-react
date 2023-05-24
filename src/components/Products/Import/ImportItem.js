import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import moment from "moment";
import NavBar from "../../Navigation/NavBar";
import LoadingBar from "../../LoadingScreens/LoadingBar"; 

const ImportItem = () => {
  const navigate = useNavigate();
  const [importProduct, setImportProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { id } = useParams();

  const getImportProduct = async () => {
    try {
      const data = {
        headers: {
          Accept: "application/json",
        },
      };

      const response = await axios.get(
        `http://127.0.0.1:8000/api/ilist/${id}`,
        data
      );
      const apiImportProducts = response.data.data;
      setImportProduct(apiImportProducts);
      setIsLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      console.error("Error fetching import product:", error);
      setIsLoading(false); // Set loading state to false on error
    }
  };

  useEffect(() => {
    getImportProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate("/Import");
  };

  const formatDate = (date) => {
    const now = moment();
    const created = moment(date);
    const diffInHours = now.diff(created, "hours");
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else if (diffInHours < 24 * 30) {
      return `${Math.floor(diffInHours / (24 * 7))} weeks ago`;
    } else {
      return `${Math.floor(diffInHours / (24 * 30))} months ago`;
    }
  };

  if (isLoading) {
    // Render loading screen while data is being fetched
    return <LoadingBar />;
  }

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center  mt-4 text-primary">
        <h1>Import Details</h1>
      </div>
      <div>
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto   mb-4 p-5 border rounded  border-dark ">
          {importProduct.map((importProduct) => {
            return (
              <div key={importProduct.id}>
                <div>
                  <p>Name: {importProduct.name}</p>
                  <p>Country: {importProduct.country}</p>
                  <p>Price: {importProduct.price}</p>
                  
                  <p>Description: {importProduct.description}</p>
                  <p>Added: {formatDate(importProduct.created_at)}</p>
                  <p>Views: {importProduct.views}</p>
                  <p>Category: {importProduct.category_name}</p>
                  <a href="https://www.facebook.com/" className="m-2">
                    <FaFacebook />
                  </a>
                  <a href="https://www.instagram.com/" className="m-2">
                    <FaInstagram />
                  </a>
                  <a href="https://www.twitter.com/" className="m-2">
                    <FaTwitter />
                  </a>
                </div>
                <div className="d-flex justify-content-center btn-lg">
                  <Button onClick={handleBack}>Back</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ImportItem;