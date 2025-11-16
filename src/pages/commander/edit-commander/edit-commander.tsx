import AddDashTitle from "../../../components/re-usable/add-dash-title";
import EditCommanderForm from "./edit-commander-form";

const EditCommander = () => {
  return (
    <div className="space-y-5">
      <div>
        <AddDashTitle title={"Edit Commander"} />
      </div>

      <div>
        <EditCommanderForm />
      </div>
    </div>
  );
};

export default EditCommander;
