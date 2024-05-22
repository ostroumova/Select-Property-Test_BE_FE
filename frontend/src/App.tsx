import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PropertyForm } from "./components/PropertyForm";
import { PropertyList } from "./components/PropertyList";

const App: React.FC = () => {
  const title = "Rent out your property";
  const subtitle = "Make extra money";
  return (
    <div className="app-container">
      <Header title={title} subtitle={subtitle} />
      <PropertyList />
      <PropertyForm />
      <Footer />
    </div>
  );
};

export default App;
