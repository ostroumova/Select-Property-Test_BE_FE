import { useState } from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { PropertyForm } from "./components/PropertyForm";
import { PropertyList } from "./components/PropertyList";
import { Property } from "./types";

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const title = "Rent out your property";
  const subtitle = "Make extra money";
  const addProperty = (property: Property) => {
    setProperties([...properties, property]);
  };

  return (
    <div className="app-container">
      <Header title={title} subtitle={subtitle} />
      <PropertyList properties={properties} setProperties={setProperties} />
      <PropertyForm addProperty={addProperty} />
      <Footer />
    </div>
  );
};

export default App;
