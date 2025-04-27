import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Evenments from './pages/EventsPage';
import Homepage from "./pages/Homapage";
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Testimonials from './pages/Testimonials';

// Import des dashboards
import AdminDashboard from './pages/Admin/Dashboard';
import EmployeeManagement from './pages/Admin/EmployeeManagement';
import UserManagement from './pages/Admin/UserManagement';
import CitizenDashboard from './pages/Citizen/Dashboard';
import EmployeeDashboard from './pages/Employee/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Homepage/>}/>
        <Route path="/evenements" element={<Evenments/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        
        {/* Routes Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRole="admin">
              <EmployeeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        
        {/* Routes Employé et Citoyen */}
        <Route
          path="/citizen/*"
          element={
            <ProtectedRoute allowedRole="citizen">
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
