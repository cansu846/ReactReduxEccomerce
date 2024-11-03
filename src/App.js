import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Container from '@mui/material/Container';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import BasketDrawer from './components/BasketDrawer';

function App() {
  return (
    <div className="App">
     <Container>
      <Header />
      <RouterConfig />
      <Loading/>
      <BasketDrawer />
     </Container>
    </div>
  );
}

export default App;
