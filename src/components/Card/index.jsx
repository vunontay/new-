import "./Card.css";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/vi";
// <img src={`${thumbnail?.presignedUrl}`} alt="Flutter" />

function Card(props) {
  const {
    id,
    title,
    // description, thumbnail,
    author,
    updatedAt,
  } = props;
  const date = dayjs(updatedAt).locale("vi").format("DD MMM YYYY");
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(`${id}/detail`)} key={id} className="card">
      <div className="card-image">
        <img
          src="https://cdn.prod.website-files.com/5ee12d8d7f840543bde883de/5ef3a1148ac97166a06253c1_flutter-logo-white-inset.svg"
          alt="Flutter"
        />
      </div>
      <div className="card-content">
        <h5>{title}</h5>
        <p>description....</p>
        <div className="card-footer">
          <div className="card-author" onClick={() => {}}>
            <div>
              <Icon icon="mingcute:user-4-line" width="24" height="24" />
            </div>
            <span>{author?.username}</span>
          </div>
          <span className="right-text">{date}</span>
        </div>
      </div>
    </button>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  updatedAt: PropTypes.string.isRequired,
  thumbnail: PropTypes.object.isRequired,
};

export default Card;
