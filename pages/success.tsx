import styles from '../styles/PaymentResult.module.css'

const Success = () => {
  return (
    <div className={styles.container}>
      <h1>Заказ успешно оформлен!</h1>
      <p>Спасибо за покупку!</p>
    </div>
  )
}

export default Success
