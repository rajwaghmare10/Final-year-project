import React, { useState } from "react";
import "./PurchaseCoins.css";
import { updateUser } from "../../api/api";

const PurchaseCoins = ({ closeModal, userDetails, setUserCoins }) => {

  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const handlePurchase = async () => {
    if (purchaseAmount < 1) {
      alert("Please enter a valid coin amount.");
      return;
    }

    try {
      const newCoinBalance = (userDetails?.coins ?? 0) + purchaseAmount;
      const response = await updateUser(userDetails.bgmi_id, { coins: newCoinBalance });

      if (response?.user) {
        setUserCoins(newCoinBalance);
        setSuccessMessage(`Successfully purchased ${purchaseAmount} coins!`);
        setPurchaseAmount(0);

        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert("Failed to update coins. Please try again.");
      }
    } catch (error) {
      console.error("Error purchasing coins:", error);
      alert("Error processing purchase. Please try again.");
    }
  };

  return (
    <div className="purchaseCoinsModal">
      <div className="modalContent">
        <span className="closeBtn" onClick={closeModal}>&times;</span>
        <h2 className="modalTitle">Purchase Coins</h2>
        
        <p className="currentCoins">
          Current Coins: <strong>{userDetails?.coins ?? 0}</strong>
        </p>

        <div className="inputGroup">
          <label>Enter Amount</label>
          <input
            type="number"
            min="1"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
            placeholder="Enter coin amount"
          />
        </div>

        <button className="purchaseBtn" onClick={handlePurchase}>
          Purchase Coins
        </button>

        {successMessage && <p className="successMessage">{successMessage}</p>}
      </div>
    </div>
  );
};



export default PurchaseCoins;
