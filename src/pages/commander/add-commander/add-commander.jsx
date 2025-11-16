import AddDashTitle from "../../../components/re-usable/add-dash-title";
import AddCommanderForm from "./add-commander-form";

const AddCommander = () => {
  return (
    <div className="space-y-5">
      <div>
        <AddDashTitle title={"Add Commander"} />
      </div>

      <div>
        <AddCommanderForm />
      </div>
    </div>
  );
};

export default AddCommander;
