import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.mainLogo}>BLOG</div>

      <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
      <label htmlFor="menu-toggle" className={styles.menuIcon}>
        ☰
      </label>

      <nav className={styles.headerNav}>
        <a href="#">Home</a>
        <a href="#">Add New Blog</a>
      </nav>
    </header>
  );
}

export default Header;
