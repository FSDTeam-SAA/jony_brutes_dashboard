import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import DeleteCommander from "./delete-commander";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Experience
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unit
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Base
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
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
                <div className="flex justify-center">
                  <div className="h-12 w-12">
                    <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse mx-auto"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
                </div>
              </td>
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
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
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
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="flex justify-center space-x-2">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommanderTable = () => {
  const { data: commandersData = {}, isLoading } = useQuery({
    queryKey: ["commanders"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/commander`
      );
      return data;
    },
  });

  const commanders = commandersData.data?.commanders || [];
  const pagination = commandersData.data?.pagination || {};

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      {/* Commanders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Base
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
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
            {commanders.map((commander) => (
              <tr key={commander?._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <div className="h-12 w-12">
                      <img
                        src={commander?.image || "/placeholder.png"}
                        alt={commander?.name}
                        className="h-12 w-12 rounded-full object-cover border border-gray-200 mx-auto"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/48?text=No+Image";
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 text-center">
                    {commander?.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {commander?.rank}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {commander?.yearOfExperience} years
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {commander?.serviceBroad}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {commander?.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {commander?.base}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {commander?.avgRating ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {commander?.avgRating}/5
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        No rating
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {new Date(commander?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(commander?.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
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
                    <DeleteCommander id={commander?._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      {pagination && Object.keys(pagination).length > 10 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center text-center">
            <div className="text-sm text-gray-600 text-center">
              Showing <span className="font-semibold">{commanders.length}</span>{" "}
              of <span className="font-semibold">{pagination.totalData}</span>{" "}
              commanders
            </div>
            <div className="text-sm text-gray-600 text-center">
              Page{" "}
              <span className="font-semibold">{pagination.currentPage}</span> of{" "}
              <span className="font-semibold">{pagination.totalPages}</span>
            </div>
            <div className="flex justify-center space-x-2">
              <button
                disabled={!pagination.hasPrevPage}
                className={`px-3 py-1 text-sm rounded ${
                  pagination.hasPrevPage
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Previous
              </button>
              <button
                disabled={!pagination.hasNextPage}
                className={`px-3 py-1 text-sm rounded ${
                  pagination.hasNextPage
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {commanders.length === 0 && (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg text-center">
            No commanders found
          </p>
          <p className="text-gray-400 text-sm mt-2 text-center">
            There are no commanders to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommanderTable;
