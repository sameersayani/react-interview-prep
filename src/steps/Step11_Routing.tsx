import { BrowserRouter, MemoryRouter, Routes, Route, Link, useParams, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Layout from './Layout';
import Home from './Home';
import Users from './Users ';
import UserDetail from './UserDetail';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';

// ... Layout, Home, Users, UserDetail, ProtectedRoute, Dashboard, Login
// component definitions all go above this point in the same file ...

export default function Step11_Routing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetail />} />
          <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}