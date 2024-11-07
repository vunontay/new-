import "./CardList.css";
import Card from "../Card";
import data from "../../data/tagList.json";

function CardList() {
  return (
    <div className="card-list">
      {data.data.record.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}

export default CardList;
