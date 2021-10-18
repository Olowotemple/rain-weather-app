import { Link } from 'react-router-dom';

const Logo = ({ big }) => {
  if (big) {
    return <div className="logo logo--big">rain</div>;
  }

  return (
    <Link to="/" className="logo">
      rain
    </Link>
  );
};

export default Logo;
