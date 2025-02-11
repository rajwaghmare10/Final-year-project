import React, { useState, useEffect ,useContext} from "react";
import { togglecontext } from '../context/context';
import "./RedeemReward.css"; 

const RedeemReward = () => {
    const isOpen = useContext(togglecontext)
    const [coins, setCoins] = useState(1000); // Example user balance
    const [rewards, setRewards] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Fetch available rewards from backend (replace with API call)
        setRewards([
            { id: 1, name: "Google Play Gift Card", cost: 500, image: "/images/googleplaycard.jpg" },
            { id: 2, name: "BGMI UC (Unknown Cash)", cost: 800, image: "/images/uc.jpg" },
            { id: 3, name: "Amazon Voucher", cost: 1000, image: "/images/amazonvoucher.jpg" }
        ]);

        // Fetch redemption history from backend (replace with API call)
        setHistory([
            { id: 101, name: "Google Play Gift Card", cost: 500, date: "2025-02-09" }
        ]);
    }, []);

    const handleRedeem = (reward) => {
        if (coins >= reward.cost) {
            setCoins(coins - reward.cost);
            setHistory([{ id: Date.now(), name: reward.name, cost: reward.cost, date: new Date().toISOString().split("T")[0] }, ...history]);
            alert(`You redeemed: ${reward.name}`);
        } else {
            alert("Not enough coins!");
        }
    };

    return (
        <div className={`redeem-container ${isOpen ? 'sidebar-open' : ''}`}>
            <h1>Redeem Rewards</h1>
            <div className="reward-list">
                {rewards.map((reward) => (
                    <div key={reward.id} className="reward-card">
                        <img src={reward.image} alt={reward.name} className="reward-image" />
                        <h4>{reward.name}</h4>
                        <p>Cost: {reward.cost} coins</p>
                        <button onClick={() => handleRedeem(reward)} disabled={coins < reward.cost} className="redeem-button">
                            Redeem
                        </button>
                    </div>
                ))}
            </div>

            <h3>Redemption History</h3>
            <ul className="history-list">
                {history.map((item) => (
                    <li key={item.id}>{item.date} - {item.name} ({item.cost} coins)</li>
                ))}
            </ul>
        </div>
    );
};

export default RedeemReward;
