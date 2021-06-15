import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Card = ({ id, title, subtitle, theme }) => {
  const { pathname } = useLocation()

  return (
    <li className={ `card ${ theme }` }>
      <div className="card-content-container">
        <motion.div className="card-content" layoutId={ `card-container-${ id }` }>
          <motion.div className="card-image-container" layoutId={ `card-image-container-${ id }` }>
            <img className="card-image" src={ `images/${ id }.jpg` } alt=""/>
          </motion.div>
          <motion.div className="title-container" layoutId={ `title-container-${ id }` }>
            <h2>{ title }</h2>
            <span className="category">{ subtitle }</span>
          </motion.div>
        </motion.div>
      </div>
      <Link to={ pathname + (pathname.endsWith('/') ? '':'/') + id } className={ `card-open-link` }/>
    </li>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  theme: PropTypes.string,
}

export default Card