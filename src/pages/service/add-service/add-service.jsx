import AddDashTitle from "../../../components/re-usable/add-dash-title";
import AddServiceForm from "./add-service-form";

const AddService = () => {
  return (
    <div className="space-y-5">
      <div>
        <AddDashTitle title={"Add Service"} />
      </div>

      <div>
        <AddServiceForm />
      </div>
    </div>
  );
};

export default AddService;
