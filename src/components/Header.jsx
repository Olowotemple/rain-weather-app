import Logo from './Logo';

const Header = () => {
  return (
    <header className="header">
      <Logo big />
      <p className="header__tagline">
        Accurate, real-time weather information for your city
      </p>
    </header>
  );
};

export default Header;
