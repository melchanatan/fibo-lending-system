import React, { useState, useEffect } from "react";
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setShowTopBtn(true);
                console.log("hellog")
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className="top-to-btm">
            {" "}
            {!showTopBtn && (
                <a
                href="#cart"
                className='flex sm:hidden z-20 border-2 fixed bottom-[3rem] right-[9vw] h-[6rem] w-[6rem] items-center justify-center rounded-full border-black bg-primary-green transition-colors group hover:bg-white hover:border-black'
                >
                    <ShoppingBagIcon className='h-[4rem] w-[4rem] fill-primary-green transition-colors group group-hover:fill-white border-white' />
                </a>
            )}{" "}
        </div>
    );
};
export default ScrollToTop;