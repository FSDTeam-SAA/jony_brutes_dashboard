import AddDashTitle from "../../../components/re-usable/add-dash-title";
import AddUnitForm from "./add-unit-form";

const AddUnit = () => {
  return (
    <div className="space-y-5">
      <div>
        <AddDashTitle title={"Add Unit"} />
      </div>

      <div>
        <AddUnitForm />
      </div>
    </div>
  )
}

export default AddUnit