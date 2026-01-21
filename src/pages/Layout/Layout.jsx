import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
export default Layout;
