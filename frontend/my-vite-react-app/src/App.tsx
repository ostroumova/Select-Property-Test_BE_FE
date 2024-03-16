import "./App.css";
import { PropertyForm } from "./components/PropertyForm";
import { PropertyList } from "./components/PropertyList";

const App: React.FC = () => {
  return (
    <div>
      <PropertyList />
      <PropertyForm />
    </div>
  );
};

export default App;
