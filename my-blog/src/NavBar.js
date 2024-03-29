//import userEvent from '@testing-library/user-event';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import useUser from './hooks/useUser';

const NavBar = () => {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();
    isLoading && console.log('Loading user...');

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
            </ul>
            <div className='nav-profile'>
                {user
                    ? <button>{user.email} <i class="fa fa-user"></i></button>
                    : <lu></lu>
                }
            </div>
            <div className="nav-right">
                {user
                    ? <button onClick={() => {
                    signOut(getAuth());
                }}>Log Out</button>
                    : <button onClick={() => {
                        navigate('/login');
                    }}>Log In</button>
                }
            </div>
        </nav>
    );
}

export default NavBar;