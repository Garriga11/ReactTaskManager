
import React from "react";
import "./App.css";
import TaskManager from "./TaskManager";
import ProductCatalog from "./ProductCatolog";




const App = () => {
  return (
    <div>
      <h1>Task Manager & Product Catalog</h1>
      <TaskManager />
      <ProductCatalog/>
    </div>
  );
};

export default App;


