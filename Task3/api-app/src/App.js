import "./App.css";
import APIProgressBar from "./component/APIProgressBar";

function App() {
  const apiCalls = [
    { url: "https://randomuser.me/api/?results=1" },
  ];

  const handleCancel = () => {
    console.log("API call cancelled");
  };

  const handleComplete = () => {
    console.log("API calls completed successfully");
  };
  return (
    <div className="App">
      <APIProgressBar
        apiCalls={apiCalls}
        timeout={3000}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />
    </div>
  );
}

export default App;
