import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import DeleteUnit from "./delete-unit";
import { NavLink } from "react-router";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated At
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
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
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

const UnitsTable = () => {
  const { data: unitsData = {}, isLoading } = useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/unit`);
      return data;
    },
  });

  const units = unitsData.data?.units || [];
  const pagination = unitsData.data?.paginationInfo || {};

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      {/* Units Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
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
            {units.map((unit) => (
              <tr key={unit?._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 text-center">
                    {unit?.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 font-mono text-center">
                    {unit?._id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {new Date(unit.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(unit.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
                <td className="flex items-center justify-center gap-3 mt-8 text-xl text-gray-600">
                  <div>
                    <NavLink to={`/dashboard/units/edit-unit/${unit?._id}`}>
                      <button className="cursor-pointer">
                        <BiEdit />
                      </button>
                    </NavLink>
                  </div>

                  <div>
                    <DeleteUnit id={unit?._id} />
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
              Showing <span className="font-semibold">{units.length}</span> of{" "}
              <span className="font-semibold">{pagination.totalData}</span>{" "}
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
                    ? "bg-primary text-white hover:bg-primary"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Previous
              </button>
              <button
                disabled={!pagination.hasNextPage}
                className={`px-3 py-1 text-sm rounded ${
                  pagination.hasNextPage
                    ? "bg-primary text-white hover:bg-primary"
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
      {units.length === 0 && (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M7 21H5m2 0h2M7 7h10M7 10h10M7 14h10"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg text-center">No units found</p>
          <p className="text-gray-400 text-sm mt-2 text-center">
            There are no units to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitsTable;
