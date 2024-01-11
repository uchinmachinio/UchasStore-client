import { useState } from "react";
import "./AddressForm.css";

function AddressForm() {
  const [addressData, setAddressData] = useState({});

  function updateAddress(e) {
    const { name, value } = e.target;

    setAddressData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div id="address-form-div" style={{ display: "none" }}>
      <h2>Select Address</h2>
      <form className="address-form">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={addressData.country || ""}
          onChange={updateAddress}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={addressData.city || ""}
          onChange={updateAddress}
        />
        <label htmlFor="postCode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={addressData.postalCode || ""}
          onChange={updateAddress}
        />
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          value={addressData.street || ""}
          onChange={updateAddress}
        />
        <label htmlFor="aptNumber">Apartament Number</label>
        <input
          type="text"
          name="aptNumber"
          value={addressData.apartamentNumber || ""}
          onChange={updateAddress}
        />
        <button className="submit-address-btn">Confirm</button>
      </form>
    </div>
  );
}

export default AddressForm;
