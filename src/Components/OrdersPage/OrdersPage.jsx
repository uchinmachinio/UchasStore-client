import { useEffect, useState } from "react";
import "./OrdersPage.css";
import { getOrders } from "../../Utils/api";
import Order from "../../Components/Order/Order";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((fetchedOrders) => {
        setOrders(fetchedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div id="orders-page">
      {loading ? (
        <div className="loading-info">
          <h1>Loading...</h1>
        </div>
      ) : orders.length === 0 ? (
        <div className="no-orders-info">
          <h1>No orders yet!</h1>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => {
            return <Order key={order._id} order={order} />;
          })}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
