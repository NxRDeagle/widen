import './css/style.css';
import './css/fontello.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Post />
      </main>
      <Footer />
    </div>
  );
}

export default App;
