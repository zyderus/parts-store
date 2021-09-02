import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '../utils/cart.slice'
import styles from '../styles/ProductCard.module.css'

interface Product {
  image: string
  product: string
  category: string
  price: number
}

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch()

  return (
    <div>
      <Image src={product.img} className={styles.img} height={300} width={300} alt='' />
      <h4 className={styles.title}>{product.product}</h4>
      <h5 className={styles.category}>{product.category}</h5>
      <p>$ {product.price}</p>
      <button onClick={() => dispatch(addToCart(product))} className={styles.button}>
        В корзину
      </button>
    </div>
  )
}

export default ProductCard
