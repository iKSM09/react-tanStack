import { Header1 } from "../components/Header.component";
import MyForm from "../components/MyForm.component";
import { MyFormZod } from "../components/MyFormZod.component";

const HookForm = () => {
  return (
    <div className="flex flex-col items-center gap-16">
      <MyForm />
      <MyFormZod />
    </div>
  );
};

export default HookForm;
