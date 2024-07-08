import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Join from "./components/join/join";
import Chat from "./components/chat/chat";

function App() {
  return (
    <div className="">
   
      <BrowserRouter>
        <Routes>
          <Route exact  path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
