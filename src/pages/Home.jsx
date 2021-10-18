import Header from '../components/Header';
import Search from '../components/Search';
import Cities from '../components/Cities';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Search />
      <Cities />
    </div>
  );
};

export default Home;
