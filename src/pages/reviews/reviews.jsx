import ReviewTable from "./components/review-table";

const Reviews = () => {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between border border-gray-100 p-5 rounded-lg">
          <h1 className="text-2xl font-bold">Reviews</h1>
        </div>
      </div>

      <div>
        <ReviewTable />
      </div>
    </div>
  );
};

export default Reviews;
