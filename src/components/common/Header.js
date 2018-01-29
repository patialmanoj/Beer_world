import React from 'react';
import PropTypes from 'prop-types';
import {Link,IndexLink} from 'react-router';

const Header = () => {
    return(
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
             {" | "}
            <Link to="/beers" activeClassName="active">Beers</Link>
            {/* {" | "}
            <Link to="/beer" activeClassName="active">Beer</Link> */}
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            
           
        </nav>
    );
};
export default Header;