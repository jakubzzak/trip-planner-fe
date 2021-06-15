import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Organizations from "./Partials/Organizations";
import Trips from "./Partials/Trips";
import Friends from "./Partials/Friends";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ScrollToTop } from "../../utils/ScrollToTop";
import LandingPage from "../LandingPage/LandingPage";
import useDashboard from "./useDashboard";


const Dashboard = ({ token }) => {
  const { data, loading: loadingData } = useDashboard(token)

  // if (!token) {
  //   return <LandingPage/>
  // }

  return (
    <>
      <ScrollToTop/>
      <Organizations data={data?.organizations} loading={loadingData}/>
      <Trips data={data?.trips} loading={loadingData}/>
      <Friends data={data?.friends} loading={loadingData}/>
      <Link to={ '/' }>
        <Button variant={"contained"}>Back</Button>
      </Link>
      <Sidebar/>
    </>
  )
}

export default Dashboard