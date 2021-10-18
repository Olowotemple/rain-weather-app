import Header from '../components/Header';
import Search from '../components/Search';
import Cities from '../components/Cities';
import Favourite from '../components/Favourite';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Search />
      <Favourite />
      <Cities />
    </div>
  );
};

export default Home;
