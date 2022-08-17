import React from "react";
import { Link } from "react-router-dom";

function Item({ item }) {
  return (
    <div className="quote_item">
      <Link to={`/quotes/${item.quote_id}`}>
        <q>{item.quote}</q> /{""}
      </Link>
      <strong style={{ color: "#093009" }}>{item.author}</strong>
    </div>
  );
}

export default Item;
