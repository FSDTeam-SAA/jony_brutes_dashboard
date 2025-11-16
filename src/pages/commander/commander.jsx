import DashTitle from "../../components/re-usable/dash-title";
import CommanderTable from "./components/commander-table";

const Commander = () => {
  return (
    <div className="space-y-5">
      <div>
        <DashTitle
          pathName={`/dashboard/commander/add-commander`}
          buttonName={"Add Commander"}
          title={"Commander Info"}
        />
      </div>

      <div>
        <CommanderTable />
      </div>
    </div>
  );
};

export default Commander;
