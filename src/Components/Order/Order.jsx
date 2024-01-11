import "./Order.css";
import ImageSlider from "../ImageSlider/ImageSlider";

function Order({ order }) {
  const locale = navigator.language;
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return (
    <div className="order">
      <div className="order-info">
        <span>{order.status}</span>
        <div className="order-info-right">
          <span>
            Ordered on:{" "}
            {new Intl.DateTimeFormat(locale, options).format(
              new Date(order.orderDate)
            )}
          </span>
          <span>order id: {order._id.slice(0, 9)}</span>
          <span>
            estimated arrival:{" "}
            {new Intl.DateTimeFormat(locale, options).format(
              new Date(order.arrivalDate)
            )}
          </span>
        </div>
      </div>

      <div className="costs">
        <span>total cost: {order.cost}$</span>
        <span>shipping cost: {order.shippingCost}$</span>
      </div>

      {order.items.map((item) => {
        return (
          <div className="ordered-products" key={item._id}>
            <div className="order-item">
              <span>{item.product.sellerName}</span>
              <div className="order-item-inner">
                <ImageSlider images={item.product.images} page={"orders"} />

                <div className="order-item-info">
                  <span className="name">{item.product.name}</span>
                  <span>
                    {item.product.price}$ x{item.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Order;
