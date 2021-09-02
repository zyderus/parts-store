import styles from '../styles/CartPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeFromCart } from '../utils/cart.slice'
import Image from 'next/image'
import Link from 'next/link'

const CartPage = () => {
  const cart = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  const getTotalPrice = () => {
    return cart.reduce((accumulator: any, item: any) => accumulator + item.quantity * item.price, 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((accumulator: any, item: any) => accumulator + item.quantity, 0)
  }

  return (
    <div className={styles.wrapper}>
      {cart.length === 0 ? (
        <h1>В корзине ничего нет</h1>
      ) : (
        <div className={styles.container}>
          <>
            <div className={styles.header}>
              <div>Корзина</div>
            </div>
            {cart.map((item: any) => (
              <div className={styles.body} key={item.id}>
                <div className={styles.image}>
                  <Image src={item.img} className={styles.img} height='90' width='90' alt='' />
                </div>
                <div className={styles.desc}>
                  <h3>{item.product}</h3>
                  <p className={styles.make}>
                    производитель: <span>{item.make}</span>
                  </p>
                  <p>
                    парт номер: <span>{item.partno}</span>
                  </p>
                </div>
                <div className={styles.buttons}>
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                  <p>
                    <span className={styles.delete} onClick={() => dispatch(removeFromCart(item.id))}>
                      удалить
                    </span>
                  </p>
                </div>
                <div className={styles.price}>
                  <p>${(item.quantity * item.price).toFixed(2)}</p>
                  <p className={styles.priceSmall}>(${item.price} каждый)</p>
                </div>
              </div>
            ))}
          </>
        </div>
      )}
      {cart.length === 0 ? null : (
        <div className={styles.summary}>
          <div className={styles.header}>
            <div>Итого</div>
            <div className={styles.summaryPrice}>${getTotalPrice()}</div>
          </div>
          <p>Товары, {getTotalItems()} шт.</p>
          <div className={styles.promocode}>Применить промокод +</div>
          <Link href='/payment'>
            <a className={styles.order}>Заказать</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartPage
