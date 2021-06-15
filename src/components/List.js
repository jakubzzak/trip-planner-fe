import React from "react";
import PropTypes from 'prop-types'
import Card from "./Card";


const List = ({ items, selectedId }) => {

  return (
    <ul className="card-list">
      { items.map(item => (
        <Card key={ item.id } id={item.id} title={item.name || item.title || `${item.firstName} ${item.lastName}`} subtitle={item.email || item.place || `Created at ${item.createdAt} by ${item.createdBy}`} theme={''} isSelected={ item.id === selectedId }/>
      )) }
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
}

export default List