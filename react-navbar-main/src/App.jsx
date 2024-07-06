import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./style.css";

import { Navbar } from "./components/Navbar";
import { About, Home, Training, Blog } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
       <Route path="/racer" element={<Home />} />   {/* add racer sub dir for server  */}
        <Route path="/training" element={<Training />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/blog" element={<Blog />} />
      </Routes>

    </div>

  );
}

export default App;
