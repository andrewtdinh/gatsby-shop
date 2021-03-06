import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import netlifyIdentity from 'netlify-identity-widget'

// import gatsbyLogo from '../images/gatsby-icon.png';
import storeIcon from '../images/MomPopStoreLogo_large.png';

const isActive = ({ isCurrent }) => {
  return { className: isCurrent ? 'active' : 'navlink' }
}

const NavLink = props => <Link getProps={isActive} {...props} />
const headerFooterBgColor = "#0b5091"

class Header extends React.Component {
  componentDidMount() {
    netlifyIdentity.init();
  }
  render() {
    const { siteTitle } = this.props;
    return (
      <header
        style={{
          background: headerFooterBgColor,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0.3rem 1.0rem`,
          }}
        >
          {/* Title and Logo area */}
          <span style={{display: "flex", alignItems: 'center'}}>
            <img src={storeIcon} alt="Mom Pop Store Logo" style={{
              width: "250px",
              margin: "0 10px 0 -8px",
            }}/>
            <h1 style={{ margin: 0 }}>
              <NavLink to="/">
                {/* {siteTitle} */}
              </NavLink>
            </h1>
          </span>
          
          
          {/*  // Temporarily disable the links in the Header
          
          <NavLink to="/blog">Blog</NavLink>

          <NavLink to="/products">Store</NavLink> */}

          <div data-netlify-identity-menu></div>

          {/** Shopping Cart Summary */}
          <div 
            className="snipcart-summary snipcart-checkout"
            style={{ color: 'white', cursor: 'pointer'}}
          >
            <div><strong>My Cart</strong></div>
            <div>
              <span className="snipcart-total-items" style={{ fontWeight: "bold" }}
              />{" "}Items in Cart
            </div>
            <div>Total price{' '}
              <span className="snipcart-total-price" style={{ fontWeight: "bold" }}/>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
