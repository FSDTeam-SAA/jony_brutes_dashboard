import AddDashTitle from "../../../components/re-usable/add-dash-title";
import EditUnitForm from "./edit-unit-form";

const EditUnit = () => {
  return (
    <div className="space-y-5">
      <div>
        <AddDashTitle title={"Edit Unit"} />
      </div>

      <div>
        <EditUnitForm />
      </div>
    </div>
  );
};

export default EditUnit;
