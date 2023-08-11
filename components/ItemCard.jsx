import Image from "next/image"
const ItemCard = ({ post, addToCart, type}) => {

  const handleClick = () => {
    if (post.stockCurrent > 0) {
      addToCart(post) 
    }
  }
  return (
    <div onClick={handleClick} className={post.stockCurrent > 0 || type === "admin" ? "item_card item_card--active group" : "item_card item_card--gray"}>
        <Image
            src={post.image ? post.image : "/assets/images/placeholder-image.png"}
            alt="item_image"
            width="150"
            height="150"
            className={post.stockCurrent > 0 || type === "admin" ? "object-contain w-full group-hover:opacity-75 group-hover:grayscale rounded" : "object-contain w-full rounded opacity-75"}
        />
        <h3 className={post.stockCurrent > 0 || type === "admin" ? "mt-5 font-semibold text-primary-green" : "mt-5 font-semibold text-gray-600"}>
            {post.name}
        </h3>
        {
          post.stockCurrent <= 10 ? (
            <p className="font-satoshi font-bold text-gray-500">
              {post.stockCurrent} left!
            </p>
          ) : (
            <p className="font-satoshi text-gray-500">
              {post.stockCurrent} left
            </p>
          )
        }
        {type === "admin" && (
          <div div className="flex flex-wrap">
            <a href="" className="dropdown_link p-1 hover:underline ">edit</a>
            <span className="pt-[0.2rem]">|</span>
            <a href="" className="dropdown_link p-1 hover:underline ">reset</a>
            <span className="pt-[0.2rem]">|</span>
            <a href="" className="dropdown_link p-1 hover:underline ">delete</a>
          </div>
        )}
    </div>

  )
}

export default ItemCard