import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import DeleteService from "./delete-service";
import { NavLink } from "react-router";

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
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
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

const ServiceTable = () => {
  const { data: servicesData = {}, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/service`
      );
      return data;
    },
  });

  const services = servicesData.data?.services || [];
  const pagination = servicesData.data?.pagination || {};

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      {/* Services Table */}
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
            {services.map((service) => (
              <tr key={service?._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <div className="h-12 w-12">
                      <img
                        src={service?.image}
                        alt={service?.name}
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
                    {service?.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 font-mono text-center">
                    {service?._id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {new Date(service?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(service?.createdAt).toLocaleTimeString(
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
                    <NavLink to={`/dashboard/service/edit-service/${service?._id}`}>
                      <button className="cursor-pointer">
                        <BiEdit />
                      </button>
                    </NavLink>
                  </div>

                  <div>
                    <DeleteService id={service?._id} />
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
              Showing <span className="font-semibold">{services.length}</span>{" "}
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
      {services.length === 0 && (
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg text-center">No services found</p>
          <p className="text-gray-400 text-sm mt-2 text-center">
            There are no services to display at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;
