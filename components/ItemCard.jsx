import Image from "next/image"
const ItemCard = ({ post, addToCart}) => {

  return (
    <div onClick={() => addToCart(post)} className="h-fit min-w-0 justify-self-start select-none hover:grayscale hover:bg-gray-200 cursor-pointer flex flex-col bg-green w-full md:p-3 p-2 bg-white rounded">
        <Image
            src="/assets/images/2507562-40.jpg"
            alt="item_image"
            width="60"
            height="60"
            className="object-contain w-full rounded"
        />
        <h3 className="mt-5 font-semibold text-primary-green">
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
        
    </div>

  )
}

export default ItemCard