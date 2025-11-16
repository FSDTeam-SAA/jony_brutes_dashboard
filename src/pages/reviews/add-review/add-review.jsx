import AddDashTitle from "../../../components/re-usable/add-dash-title";
import AddReviewForm from "./add-review-form";

const AddReview = () => {
  return (
    <div className="space-y-5">
      <div>
        <AddDashTitle title={"Add Review"} />
      </div>

      <div>
        <AddReviewForm />
      </div>
    </div>
  );
};

export default AddReview;