import React from "react";
import PropTypes from 'prop-types'
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from '@material-ui/core';
import { SupervisorAccount, Add } from "@material-ui/icons";


const FriendItem = ({ item }) => {
  const { id, firstName, lastName, email, commonFriendsCount } = item
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
            <img className="card-image" src={ `images/${ id }.jpg` } alt=""/>
          </motion.div>
          <motion.div className="title-container" layoutId={ `title-container-${ id }` }>
            <h2>{ `${ firstName } ${ lastName }` }</h2>
            <span className="category">{ email }</span>
          </motion.div>
          <motion.div className="content-container" animate>
            <span style={ { borderTop: 'solid white 1px', paddingTop: '1em', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
              <span style={ { display: 'flex', alignItems: 'center' } }><SupervisorAccount /> { commonFriendsCount }</span>
              <Button className='viac' variant="contained">
                <Add/>
                Add friend
              </Button>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

FriendItem.propTypes = {
  item: PropTypes.object,
}

export default FriendItem