import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../navbar/navbar.css';
import { ProductContext } from '../context/Context';



const Navigationbar = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const role = JSON.parse(localStorage.getItem('user'))?.role;
  let { state: { cart } , dispatch} = useContext(ProductContext);
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cartArray');
     dispatch({type:"resetCart"})
    navigate('/')
  }

  return (
    <div>

      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        {/* <Container> */}
        <Navbar.Brand href="/" style={{fontSize:'30px'}}> <span> <i className="bi bi-shop-window"></i> EQUIPMENT RENTAL </span> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className="me-auto" style={{fontSize:'medium'}}>
            {user ? <>
              <Nav.Link href='/cart' className="position-relative mr-2"> <span> <ShoppingCartIcon color='black'/>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart?.length}
                </span>
              </span>  </Nav.Link> &nbsp;
              <Nav.Link href="/home">Home <i className="bi bi-house-door-fill"></i></Nav.Link>
              {role === 'admin' ? <Nav.Link href="/admin"> Admin <i class="bi bi-person-workspace"></i></Nav.Link> : ''
              }
              <Nav.Link href="/Profile">Profile <i class="bi bi-person-circle"></i></Nav.Link>
              <Nav.Link href="/contact_us">Contact <i className="bi bi-telephone-fill"></i></Nav.Link>
              <Nav.Link href="#" onClick={logout}>Logout <i class="bi bi-door-closed-fill"></i></Nav.Link>
            </>
              :
              <div>
                <Nav.Link href='/login'>Login <i class="bi bi-door-open-fill"></i></Nav.Link>
                {/* <Nav.Link href="/register">SIGNUP</Nav.Link> */}
              </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigationbar