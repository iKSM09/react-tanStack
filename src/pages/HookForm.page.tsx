import MyForm from "../components/MyForm.component";
import { MyFormZod } from "../components/MyFormZod.component";
import MySimpleForm from "../components/MySimpleForm.component";

const HookForm = () => {
  return (
    <div className="flex flex-col items-center gap-16">
      <MySimpleForm />
      <MyForm />
      {/* <MyFormZod /> */}
    </div>
  );
};

export default HookForm;
