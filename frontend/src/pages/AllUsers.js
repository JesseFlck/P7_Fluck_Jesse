import HeaderConnected from '../components/HeaderConnected'
import UsersCard from '../components/AllUsers'
import "../styles/index.scss"
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);





const AllUsers = () => {

    if (!parseToken) {
        window.location.href = "/connexion";
      };

    return (
        <div>
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <h1>Liste des membres</h1>
            <div id="members">
                <UsersCard />
            </div>
        </div>
    )


}

export default AllUsers;