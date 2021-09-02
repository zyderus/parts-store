import styles from '../styles/PaymentPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'

const CartPage = () => {
  const cart = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  const getTotalPrice = () => {
    return cart.reduce((accumulator: any, item: any) => accumulator + item.quantity * item.price, 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((accumulator: any, item: any) => accumulator + item.quantity, 0)
  }

  const processPayment = async () => {
    const url = 'http://localhost:3000/api/chargecard'
    const newCart = cart.map(({ id, quantity }: any) => ({
      id,
      qty: quantity,
    }))

    const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`)

    const data = await fetch(url, {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ cart: newCart }),
    }).then(res => res.json())

    const { sessionId } = data
    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {cart.length === 0 ? (
          <h1>В корзине ничего нет</h1>
        ) : (
          <>
            <div className={styles.header}>
              <div>Оплата</div>
            </div>
            {cart.map((item: any) => (
              <div className={styles.body} key={item.id}>
                <div className={styles.desc}>
                  <h3>{item.product}</h3>
                  <p className={styles.make}>
                    производитель: <span>{item.make}</span>
                  </p>
                  <p>
                    парт номер: <span>{item.partno}</span>
                  </p>
                  <p>{item.quantity} шт.</p>
                </div>
              </div>
            ))}
            <div className={styles.total}>
              <div className={styles.summaryPrice}>Итого: ${getTotalPrice()}</div>
            </div>
            <p>Товары, {getTotalItems()} шт.</p>
            <div className={styles.paymentType}>
              <div className={styles.cardType + ' ' + styles.disabled}>
                <p>Оплата банковской картой</p>
                <div>
                  <Image src='/images/paytype/visa.svg' width={70} height={30} alt='visa' />
                  <Image src='/images/paytype/mc.svg' width={70} height={30} alt='mc' />
                  <Image src='/images/paytype/maestro.svg' width={70} height={30} alt='maestro' />
                  <Image src='/images/paytype/amex.png' width={70} height={30} alt='amex' />
                  <Image src='/images/paytype/mir.svg' width={70} height={30} alt='mir' />
                </div>
              </div>
              <div className={styles.cardType + ' ' + styles.disabled}>
                <p>PayPal</p>
                <Image src='/images/paytype/paypal.png' width={100} height={25} alt='visa' />
              </div>
              <div className={styles.cardType} onClick={processPayment}>
                <p>Stripe</p>
                <Image src='/images/paytype/stripe.svg' width={70} height={60} alt='visa' />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartPage
