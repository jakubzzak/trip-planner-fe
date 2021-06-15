import React from "react";
import PropTypes from 'prop-types'
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button, Icon } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from "@material-ui/core/colors";
import { SupervisorAccount } from "@material-ui/icons";


const TripItem = ({ item }) => {
  const {
    id, createdAt, createdBy, accepted, name, dateFrom, dateTo, place,
    accommodation, transportThere, TransportBack, todos, participants,
    survey, votes, amounts, note
  } = item
  const { pathname } = useLocation()

  return (
    <>
      <motion.div initial={ { opacity: 0 } }
                  animate={ { opacity: 1 } }
                  exit={ { opacity: 0, transition: { duration: 0.15 } } }
                  transition={ { duration: 0.2, delay: 0.15 } }
                  style={ { pointerEvents: "auto" } }
                  className="overlay"
      >
        <Link to={ pathname.substring(0, pathname.lastIndexOf('/')) }/>
      </motion.div>
      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={ `card-container-${ id }` }>
          <motion.div className="card-image-container" layoutId={ `card-image-container-${ id }` }>
            <img className="card-image" src={ `images/${ id }.jpg` } alt={ name }/>
          </motion.div>
          <motion.div className="title-container" layoutId={ `title-container-${ id }` }>
            <h2>
              { `${ name }` }
              { accepted && <CheckCircleIcon color={ green }/> }
            </h2>
            <span className="category">{ place }</span>
            <span className="category">{ `${ dateFrom } - ${ dateTo }` }</span>
          </motion.div>
          <motion.div className="content-container" animate>
            <p>{ note }</p>
            <span style={ { borderTop: 'solid white 1px', paddingTop: '1em', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
              <span style={ { display: 'flex', alignItems: 'center' } }><SupervisorAccount /> { participants?.length || 0  }</span>
              <Button className='viac' variant="contained">
                Visit
              </Button>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

TripItem.propTypes = {
  item: PropTypes.object,
}

export default TripItem