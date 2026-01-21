
import Layout from './pages/Layout' 
import Home from './pages/Home'

function App() {
  return (
    <Layout>
      <Home /> {/*props.children--inside app */}

    </Layout>
  );
}

export default App;
