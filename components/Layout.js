import Nav from './Nav'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className='layout-wrapper'>
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>  
    </div>
  )
}

export default Layout