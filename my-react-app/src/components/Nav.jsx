// navigation links
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/Event">Event</Link></li>
        <li><Link to= "/Contact">Contact</Link></li>
        <li><Link to= "/About">About</Link></li>


        <div className="signin" >
        <li><Link to="/Register">Register</Link></li>
        <li><Link to="/Login">Login</Link></li>
        </div>

      </ul>
    </nav>
  );
}