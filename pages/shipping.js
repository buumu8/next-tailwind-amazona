import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function ShippingScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/payment");
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
            className="w-full"
            id="fullName"
          />
          {errors.fullName && <div className="text-red-500">{errors.fullName.message}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            {...register("address", {
              required: "Please enter address",
              minLength: { value: 3, message: "Address is more than 2 chars" },
            })}
            className="w-full"
            id="address"
          />
          {errors.address && <div className="text-red-500">{errors.address.message}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            {...register("city", {
              required: "Please enter city",
            })}
            id="city"
            className="w-full"
          />
          {errors.ciy && <div className="text-red-500">{errors.city.message}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
            id="postalCode"
            className="w-full"
          />
          {errors.postalCode && <div className="text-red-500">{errors.postalCode.message}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            {...register("country", {
              required: "Please enter country",
            })}
            id="country"
            className="w-full"
          />
          {errors.country && <div className="text-red-500">{errors.country.message}</div>}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
