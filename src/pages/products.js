import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import netlifyIdentity from 'netlify-identity-widget';

import Layout from '../components/layout';

class Products extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const allProducts = this.props.data.allContentfulProduct.edges
    const products = netlifyIdentity.currentUser !== null ? 
      allProducts :
      allProducts.filter(({ node: product }) => !product.private)
    this.setState({ products });
  }

  render() {
    const { data: { allContentfulProduct } } = this.props;
    return (
      <Layout>
        <div>
          {/* Product List */}
          <h2>Garb Products</h2>
          {allContentfulProduct.edges.map(({ node: product }) => (
            <div key={product.id}>
              <Link 
                to={`/products/${product.slug}`} 
                style={{ 
                  textDecoration: "none",
                  color: "#551a8b"
                }}
              >
                <h3 style={{ marginTop: '2rem' }}>
                  {product.name} • {` `}
                  <span style={{ fontSize: "1.2rem", fontWeight: 300, color: "#f60" }}>
                    ${product.price}
                  </span>
                </h3>
              </Link>
              <Img 
                style={{ maxWidth: 400}}
                fluid={product.image.fluid}
              />
            </div>
          ))}
        </div>
      </Layout>
    )
  }
};

export const query = graphql`
{
  allContentfulProduct {
    edges { 
      node {
        id
        slug
        name
        price
        image {
          fluid(maxWidth: 400) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
    }
  }
}
`

export default Products;