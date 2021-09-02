import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cart = useSelector((state: any) => state.cart)
  const getItemsCount = () => {
    return cart.reduce((accumulator: any, item: { quantity: number }) => accumulator + item.quantity, 0)
  }

  return (
    <nav className={styles.navbar}>
      <h3 className={styles.logo}>
        <Link href='/'>
          <a>
            PARTS<span>STORE</span>
          </a>
        </Link>
      </h3>
      <ul className={styles.links}>
        <li className={styles.navlink}>
          <Link href='/cart'>
            <a className={styles.cart}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              {getItemsCount() < 1 ? null : <span>{getItemsCount()}</span>}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
