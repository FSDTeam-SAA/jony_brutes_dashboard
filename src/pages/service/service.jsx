import DashTitle from "../../components/re-usable/dash-title";
import ServiceTable from "./service";

const Service = () => {
  return (
    <div className="space-y-5">
      <div>
        <DashTitle
          pathName={`/dashboard/add-commander`}
          buttonName={"Add Service"}
          title={"Services"}
        />
      </div>

      <div>
        <ServiceTable />
      </div>
    </div>
  );
};

export default Service;
