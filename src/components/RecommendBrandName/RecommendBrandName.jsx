import PropTypes from "prop-types";

export default function RecommendBrandName({ size = "24px" }) {
  return (
    <div>
      <div className="font-face-mr" style={{ fontSize: size }}>
        Recommend
      </div>
    </div>
  );
}

RecommendBrandName.propTypes = {
  size: PropTypes.string
};
