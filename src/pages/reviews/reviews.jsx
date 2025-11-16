import DashTitle from "../../components/re-usable/dash-title";
import ReviewTable from "./components/review-table";

const Reviews = () => {
  return (
    <div className="space-y-5">
      <div>
        <DashTitle
          pathName={`/dashboard/add-review`}
          buttonName={"Add Review"}
          title={"Reviews"}
        />
      </div>

      <div>
        <ReviewTable />
      </div>
    </div>
  );
};

export default Reviews;
