import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "../../../components/Header";
import List from "../../../components/List";
// import { ScrollToTop } from "../../../utils/ScrollToTop";
import TripItem from "../../../components/Item/TripItem";

import trips from '../../../test-data/trips.json'
import PropTypes from "prop-types";


const Trips = ({ data, loading }) => {
  let { id } = useParams()
  const [item, setItem] = useState(null)
  const imageHasLoaded = true

  useEffect(() => {
    if (id) {
      const chosen = trips.find(org => org.id === id)
      setItem(chosen ?? null)
    } else {
      setItem(null)
    }
  }, [id])

  return (
    <>
      <Header title={'Trips'} subtitle={'Its nice to have something to reminisce about or look forward to, right?!'} />
      <List items={trips} selectedId={ id }/>
      {/*<ScrollToTop/>*/}
      <AnimatePresence>
        { item && imageHasLoaded && <TripItem item={item} key={item.id}/> }
      </AnimatePresence>
    </>
  )
}

Trips.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
}

export default Trips