import styles from '../styles/PaymentResult.module.css'

const Fail = () => {
  return (
    <div className={styles.container}>
      <h1>Что-то пошло не так!</h1>
      <p>Средства НЕ списаны.</p>
    </div>
  )
}

export default Fail
