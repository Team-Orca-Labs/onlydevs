import React from "react";
import SideBarTab from "../components/SideBarTab";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  displayMatches,
  displayLikes,
  displayExplore,
} from "../actions/actions";

function mapDispatchToProps(dispatch) {
  return {
    displayMatches: function () {
      dispatch(displayMatches());
    },
    displayLikes: function () {
      dispatch(displayLikes());
    },
    displayExplore: function () {
      dispatch(displayExplore());
    },
  };
}

function SideBar(props) {
  const history = useHistory();

  return (
    <div id="sideBar" className="">
      <SideBarTab
        tabName="Matches"
        description="Checkout some of the matches you've made"
        onClick={() => history.push("/")}
      ></SideBarTab>
      <SideBarTab
        tabName="Liked By"
        description="Devs that want to pair with you."
        onClick={() => history.push("/likes")}
      ></SideBarTab>
      <SideBarTab
        tabName="Explore"
        description="Explore some devs that can be your next partner"
        onClick={() => history.push("/explore")}
      ></SideBarTab>
      <SideBarTab
        tabName="Chat"
        description="Chat with your matches"
        onClick={() => history.push("/chat")}
      ></SideBarTab>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(SideBar);
