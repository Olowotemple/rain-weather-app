import { ReactComponent as SuccessIcon } from '../svg/success.svg';
import { ReactComponent as AlertIcon } from '../svg/alert.svg';

const Notification = ({ notification }) => {
  if (notification) {
    const { msg, warn } = notification;
    if (msg) {
      if (warn) {
        return (
          <div className="notification notification--reject">
            <AlertIcon />
            <div className="notification__msg">{msg}</div>
          </div>
        );
      }

      return (
        <div className="notification notification--success">
          <SuccessIcon />
          <div className="notification__msg">{msg}</div>
        </div>
      );
    }
  }
  return null;
};

export default Notification;
