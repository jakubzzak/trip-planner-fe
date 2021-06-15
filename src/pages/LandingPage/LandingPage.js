import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Button from "@material-ui/core/Button";
import Header from "../../components/Header";
import List from "../../components/List";
import { ScrollToTop } from "../../utils/ScrollToTop";
import OrganizationItem from "../../components/Item/OrganizationItem";

import organizations from '../../test-data/organizations.json'


const LandingPage = () => {
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
      <Header title={ 'Welcome to trip planner' }/>
      <List items={organizations} selectedId={ id }/>
      <ScrollToTop/>
      <AnimatePresence>
        { item && imageHasLoaded && <OrganizationItem item={item} key={item.id}/> }
      </AnimatePresence>
      <Link to={ '/dashboard' }>
        <Button variant={ "contained" }>
          Dashboard
        </Button>
      </Link>
    </>
  )
}

export default LandingPage