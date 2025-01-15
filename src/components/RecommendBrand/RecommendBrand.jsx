import PropTypes from "prop-types";

// Components: Local
import RecommendBrandName from "../RecommendBrandName/RecommendBrandName";
import RecommendBrandSubText from "../RecommendBrandSubText/RecommndBrandSubText";

// Styling: Local
import "./RecommendBrand.css";

export default function RecommendBrand({ size }) {
  return (
    <div>
      <div className="brand-name">
        <RecommendBrandName size={size} />
      </div>

      <div className="brand-subtext">
        <RecommendBrandSubText />
      </div>
    </div>
  );
}

RecommendBrand.propTypes = {
  size: PropTypes.string,
};
