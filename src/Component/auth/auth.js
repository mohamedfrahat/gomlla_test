import { useUser, isAdminAuthenticated } from '../Context/UserContext';

const SomeComponent = () => {
  const { currentUser } = useUser();

  if (isAdminAuthenticated(currentUser)) {
    console.log('User is an admin');
  } else {
    console.log('User is not an admin');
  }

  return <div>Welcome!</div>;
};
