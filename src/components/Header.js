import React, { useState } from 'react';
import {useAuth} from '../contexts/AuthContext';
import { Button} from 'react-bootstrap';



import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';



import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history=useHistory();

  const {currentUser, logout }=useAuth();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  async  function handleLogOut(){

    try{
       await logout();
       history.push("/");
    }catch(err){
      console.log(err);
    }
   
  }

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">

      <div className="text-muted font-weight-bold font-italic" style={{fontSize: '4vh'}}>Test App</div>


        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>



        
          <React.Fragment>
              <NavItem>
               
                
              </NavItem>
              
            </React.Fragment>


          {currentUser && 

           <React.Fragment>
              <NavItem>
               
                <Button onClick={handleLogOut}  type="submit">Log Out</Button>
              </NavItem>
              
            </React.Fragment>}

           

          </Nav>
        </Collapse>
      </Navbar>

     

    </React.Fragment>
  );
};

export default Header;