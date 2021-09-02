import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      &copy;{' '}
      <span className={styles.brand}>
        PARTS<span>STORE</span>
      </span>{' '}
      {`${new Date().getFullYear()}`}
    </footer>
  )
}

export default Footer
