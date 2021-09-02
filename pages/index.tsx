import styles from '../styles/Home.module.css'
import ProductCard from '../components/ProductCard'
import { getProducts } from './api/products/index'

export const getStaticProps = async () => {
  const products = getProducts()
  return { props: { products } }
}

const Home = ({ products }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Навесное оборудование</p>
      </div>
      <div className={styles.cards}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
