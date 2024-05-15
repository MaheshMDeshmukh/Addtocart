import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import ThankYou from './ThankYou'; // Importing the ThankYou component

const Cart = ({ cart, setCart, handleChange }) => {
    const [price, setPrice] = useState(0);
    const [isBuying, setIsBuying] = useState(false); // State to toggle Thank You component

    const handleRemove = (id) => {
        const arr = cart.filter((item) => item.id !== id);
        setCart(arr);
    }

    const handlePrice = () => {
        let ans = 0;
        cart.forEach((item) => {
            ans += item.amount * item.price;
        });
        setPrice(ans);
    }

    useEffect(() => {
        handlePrice();
    }, [cart]); // Run useEffect when cart changes

    const handleBuyNow = () => {
        setIsBuying(true);
        // Additional logic if needed before or after buying
    }

    if (isBuying) {
        return <ThankYou />;
    }

    return (
        <article>
            {
                cart?.map((item) => (
                    <div className='cart_box' key={item.id}>
                        <div className='cart_img'>
                            <img src={item.img} alt={item.title} />
                            <p>{item.title}</p>
                        </div>
                        <div>
                            <button onClick={() => handleChange(item, +1)}>+</button>
                            <button onClick={() => handleChange(item, -1)}>-</button>
                        </div>
                        <div>
                            <span>{item.price}</span>
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </div>
                ))
            }
            <div className='total'>
                <span>Total Price of your Cart</span>
                <span> Rs - {price}</span>
            </div>
            <button onClick={handleBuyNow}>Buy Now</button>
        </article>
    )
}

export default Cart;
