import Header from "./components/Header.jsx";
import Page from "./components/Page.jsx";

function App() {
  return (
    <div className="relative min-h-screen">
      <Header pagePath="/" />
      <Page />
    </div>
  );
}

export default App;
