import AddDashTitle from "../../../components/re-usable/add-dash-title";
import EditServiceForm from "./edit-service-form";

const EditService = () => {
  return (
    <div className="space-y-5">
      <div>
        <AddDashTitle title={"Edit Service"} />
      </div>

      <div>
        <EditServiceForm />
      </div>
    </div>
  );
};

export default EditService;
