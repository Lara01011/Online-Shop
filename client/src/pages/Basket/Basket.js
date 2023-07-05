import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './Style.css'
import { Link } from "react-router-dom";

const MainPage = (props) => {
  const [basketProducts, setBasketProducts] = useState([]);
  const { device } = useContext(Context); // Updated: Removed `setCount` from the context

  const deleteItem = (id) => {
    const arr = basketProducts.filter(item => item.product.id !== id);
    const myArray = JSON.stringify(arr);
    localStorage.setItem("busketItems", myArray);
    setBasketProducts(arr);
    device.setCount(arr.length); // Updated: Update the count in the device store
  };

  const calculateTotalPrice = () => {
    return basketProducts.reduce((total, item) => total + item.product.price * item.amount, 0);
  };

  useEffect(() => {
    const items = localStorage.getItem('busketItems');
    const busketItems = JSON.parse(items);
    setBasketProducts(busketItems);
    device.setCount(busketItems.length); // Updated: Update the count in the device store
  }, [localStorage.getItem('busketItems'), device]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = () => {
    // Add the checkout logic here, e.g., navigate to the checkout page
    console.log('Checkout:', basketProducts);
  };

  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
                    <MDBCol lg="7">
                      <MDBTypography tag="h5">
                        <Link to="/" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
                        </Link>
                      </MDBTypography>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">You have {basketProducts.length} items in your cart</p>
                        </div>
                        <div>
                          <p>
                            <span className="text-muted">Sort by:</span>
                            <a href="#!" className="text-body">
                              price <MDBIcon fas icon="angle-down mt-1" />
                            </a>
                          </p>
                        </div>
                      </div>

                      <MDBCard className="mb-3">
                        {basketProducts.length === 0 ? (
                          <MDBCardBody>
                            <p>Your basket is empty.</p>
                          </MDBCardBody>
                        ) : (
                          basketProducts.map((item) => (
                            <MDBCardBody key={item.product.id}>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <MDBCardImage
                                      src={process.env.REACT_APP_API_URL + item.product.img}
                                      fluid
                                      className="rounded-3"
                                      style={{ width: "65px" }}
                                      alt="Shopping item"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <MDBTypography tag="h5">
                                      {item.product.name}
                                    </MDBTypography>
                                    <p className="small mb-0">{item.product.info}</p>
                                  </div>
                                </div>
                                
                                <div className="d-flex flex-row align-items-center">
                                  <div style={{ width: "50px" }}>
                                    <MDBTypography
                                      tag="h5"
                                      className="fw-normal mb-0"
                                    >
                                      {item.amount}
                                    </MDBTypography>
                                  </div>
                                  <div style={{ width: "80px" }}>
                                    <MDBTypography tag="h5" className="mb-0">
                                      ${item.product.price}
                                    </MDBTypography>
                                  </div>
                                  <a href="#!" style={{ color: "#cecece" }}>
                                    <MDBIcon fas icon="trash-alt" />
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteItem(item.product.id)} style={{ border: 'none' }}>
                                      <div className="delete">Delete</div>
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            </MDBCardBody>
                          ))
                        )}
                      </MDBCard>
                    </MDBCol>

                    <MDBCol lg="5">
                      <MDBCard className="bg-primary text-white rounded-3">
                        <MDBCardBody>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h5" className="mb-0">
                              Order details
                            </MDBTypography>
                          </div>

                          <a href="#!" type="submit" className="text-white">
                            <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <MDBIcon fab icon="cc-visa fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <MDBIcon fab icon="cc-amex fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                          </a>

                          <form className="mt-4">
                            <MDBInput
                              className="mb-4"
                              label="Name and surname"
                              type="text"
                              size="lg"
                              placeholder="Name and surname"
                              contrast
                            />

                            <MDBInput
                              className="mb-4"
                              label="Number phone"
                              type="text"
                              size="lg"
                              minLength="19"
                              maxLength="19"
                              placeholder="+374 77 00 00 00"
                              contrast
                            />
                          </form>

                          <hr />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${calculateTotalPrice()}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping in Yerevan</p>
                            <p className="mb-2">$1000</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping in regions</p>
                            <p className="mb-2">$20.00</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total</p>
                            <p className="mb-2">${calculateTotalPrice() + 20}</p>
                          </div>

                          <MDBBtn color="info" block size="lg" onClick={handleCheckout}>
                            <div className="d-flex justify-content-between">
                              <span>${calculateTotalPrice() + 20}</span>
                              <span>
                                Checkout{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};

export default MainPage;
