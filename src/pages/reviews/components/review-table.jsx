import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import DeleteReview from "./delete-review";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Commander ID
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Skeleton rows */}
          {[...Array(10)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-6 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="flex items-center justify-center gap-3 mt-8 text-xl text-gray-600">
                <div className="flex gap-3">
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Skeleton Pagination */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-center">
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="flex justify-center space-x-2">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewTable = () => {
  const { data: reviewsData = {}, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/review`
      );
      return data;
    },
  });

  const reviews = reviewsData.data?.reviews || [];
  const totalReviews = reviewsData.data?.totalReviews || 0;

  if (isLoading) {
    return <TableSkeleton />;
  }

  // Function to render rating stars
  const renderRating = (rating) => {
    return (
      <div className="flex justify-center items-center">
        <div className="flex items-center">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="ml-1 text-sm font-medium text-gray-700">
            {rating}/10
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Reviews Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commander ID
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Created At
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 text-center">
                    {review?.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 text-center max-w-xs mx-auto">
                    <p className="truncate" title={review.description}>
                      {review?.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderRating(review?.rating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 font-mono text-center">
                    {review?.commanderId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {new Date(review?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(review?.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
                <td className="flex items-center justify-center gap-3 mt-8 text-xl text-gray-600">
                  <div>
                    <button className="cursor-pointer">
                      <BiEdit />
                    </button>
                  </div>

                  <div>
                    <DeleteReview id={review?._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Reviews Info */}
      {totalReviews > 10 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center text-center">
            <div className="text-sm text-gray-600 text-center">
              Total <span className="font-semibold">{totalReviews}</span>{" "}
              {totalReviews === 1 ? "review" : "reviews"}
            </div>
            <div className="flex justify-center space-x-2">
              <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 flex justify-center">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg text-center">No reviews found</p>
          <p className="text-gray-400 text-sm mt-2 text-center">
            There are no reviews to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewTable;
