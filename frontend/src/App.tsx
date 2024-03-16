import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PropertyForm } from "./components/PropertyForm";
import { PropertyList } from "./components/PropertyList";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <PropertyList />
      <PropertyForm />
      <Footer />
    </div>
  );
};

export default App;
