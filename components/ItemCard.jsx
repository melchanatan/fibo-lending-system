import Image from "next/image"
const ItemCard = ({ post, addToCart, type, handleEdit, handleDelete, handleReset}) => {

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
        <h3 className={post.stockCurrent > 0 || type === "admin" ? "mt-2 md:mt-5 font-semibold text-primary-green" : "mt-2 md:mt-5 font-semibold text-gray-600"}>
            {post.name}
        </h3>
        { type === "admin" && 
          <p className="font-satoshi text-gray-500">
            {post.stockMax} Max
          </p>
        }
        { post.stockCurrent <= 0 ? (
            <p className="font-satoshi font-bold text-gray-500">
              out of stock
            </p>
          ) : post.stockCurrent <= 10 ? (
            <p className="font-satoshi text-gray-500 font-bold">
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
            <a onClick={ () => handleEdit(post)} className="dropdown_link p-1 hover:underline ">edit</a>
            <span className="pt-[0.2rem]">|</span>
            <a onClick={() => handleReset(post)} className="dropdown_link p-1 hover:underline ">reset</a>
            <span className="pt-[0.2rem]">|</span>
            <a onClick={ () => handleDelete(post)} className="dropdown_link p-1 hover:underline ">delete</a>
          </div>
        )}
    </div>

  )
}

export default ItemCard