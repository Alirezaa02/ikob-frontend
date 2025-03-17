import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";

function Header() {
    return (
        <header>
          <div className="icon">
            {/* <img src="img/icon.png" alt="Icon" /> */}
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
              
            </ul>
          </nav>
        </header>
    );
}
export default Header;