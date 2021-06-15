import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import List from "../../../components/List";
import FriendItem from "../../../components/Item/FriendItem";
// import { ScrollToTop } from "../../../utils/ScrollToTop";

import friends from '../../../test-data/friends.json'
import PropTypes from "prop-types";


const Friends = ({ data, loading }) => {
  let { id } = useParams()
  const [item, setItem] = useState(null)
  const imageHasLoaded = true

  useEffect(() => {
    if (id) {
      const chosen = friends.find(org => org.id === id)
      setItem(chosen ?? null)
    } else {
      setItem(null)
    }
  }, [id])

  return (
    <>
      <Header title={'Friends'} subtitle={'Together we are stronger.. or at least not bored!'}/>
      <List items={friends} selectedId={ id }/>
      {/*<ScrollToTop/>*/}
      <AnimatePresence>
        { item && imageHasLoaded && <FriendItem item={item} key={item.id}/> }
      </AnimatePresence>
    </>
  )
}

Friends.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
}

export default Friends