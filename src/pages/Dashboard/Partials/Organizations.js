import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "../../../components/Header";
import List from "../../../components/List";
import PropTypes from 'prop-types'
// import { ScrollToTop } from "../../../utils/ScrollToTop";
import OrganizationItem from "../../../components/Item/OrganizationItem";

import organizations from '../../../test-data/organizations.json'


const Organizations = ({ data, loading }) => {
  let { id } = useParams()
  const [item, setItem] = useState(null)
  const imageHasLoaded = true

  useEffect(() => {
    if (id) {
      const chosen = organizations.find(org => org.id === id)
      setItem(chosen ?? null)
    } else {
      setItem(null)
    }
  }, [id])

  return (
    <>
      <Header title={ 'Organizations' } subtitle={ 'Its always more fun in a group!' }/>
      <List items={organizations} selectedId={ id }/>
      {/*<ScrollToTop/>*/}
      <AnimatePresence>
        { item && imageHasLoaded && <OrganizationItem item={item} key={item.id}/> }
      </AnimatePresence>
    </>
  )
}

Organizations.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
}

export default Organizations