import DashTitle from "../../components/re-usable/dash-title";
import UnitsTable from "./components/units-table";

const Units = () => {
  return (
    <div className="space-y-5">
      <div>
        <DashTitle
          pathName={`/dashboard/units/add-unit`}
          buttonName={"Add Unit"}
          title={"Units"}
        />
      </div>

      <div>
        <UnitsTable />
      </div>
    </div>
  );
};

export default Units;
