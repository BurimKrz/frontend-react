import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import NavBar from "../../Navigation/NavBar";
import LoadingBar from "../../LoadingScreens/LoadingBar";

const ExportItem = () => {
  const navigate = useNavigate();
  const [exportProduct, setExportProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
//eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || 0);
  const chatprice =tokens - 10;
  let userId = localStorage.getItem("userId");

  const getExportProduct = async () => {
    try {
      const data = {
        headers: {
          Accept: "application/json",
        },
      };

      const response = await axios.get(
        "http://127.0.0.1:8000/api/elist/" + id,
        data
      );
      const apiExportProducts = response.data.data;
      setExportProduct(apiExportProducts);
      setIsLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      // Handle error
      setIsLoading(false); // Set loading state to false on error
    }
  };

  let { id } = useParams();

  useEffect(() => {
    getExportProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate("/Export");
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
  const handleChat = async (id) => {
    if (tokens < 10) {
      alert("You should have at least 10 tokens to chat with the owner!");
    } else {
      const confirmChat = window.confirm(
        "Chat with the owner? This will take 10 tokens from your account."
      );

      if (confirmChat) {
        setLoading(true);
        try {
          await axios.put(`http://localhost:8000/api/updateToken/${userId}`,
          {
            amount: chatprice,
          }
          );
          setLoading(false);
          navigate("/ContactFrom/" + id);
        } catch (error) {
          setLoading(false);
          // Handle error
        }
        const response = await axios.get(
          `http://localhost:8000/api/token/{userId}`
        );
        setTokens(response.data.amount);
        console.log(response);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center mt-4 text-primary">
        <h1>Export Details</h1>
      </div>
      <div>
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto mb-4 p-5 border rounded border-dark">
          {exportProduct.map((exportProduct) => {
            return (
              <div key={exportProduct.id}>
                <div>
                <p>Name: {exportProduct.name}</p>
                  <p>Country: {exportProduct.country}</p>
                  <p>Price: {exportProduct.price}</p>
                 
                  <p>Description: {exportProduct.description}</p>
                  <p>Added: {formatDate(exportProduct.created_at)}</p>
                  <p>Views: {exportProduct.views}</p>
                  <p>Category: {exportProduct.category_name}</p>
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
                  <Button className="mx-3"  onClick={handleBack}>Back</Button>
                  <Button onClick={() => handleChat(exportProduct.id)}>Chat with owner</Button>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExportItem;
