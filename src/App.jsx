import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Public from "./components/public";
import Login from "./features/auth/login";
import Welcome from "./features/auth/welcome";
import RequiredAuth from "./features/auth/requiredAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<RequiredAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
