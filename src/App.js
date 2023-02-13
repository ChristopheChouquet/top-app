import './styles/App.css';
import Header from './Components/Header';
import Palette from './styles/CustomPalette';
import CreateTopInput from './Components/CreateTopInput';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Palette/> */}
      <CreateTopInput/>
      <Footer/>
    </div>
  );
}

export default App;
