import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    if (!storedAdmin) {
      navigate("/admin/login");
      return;
    }

    const adminData = JSON.parse(storedAdmin);
    if (adminData.role !== "super_admin") {
      alert("Yalnız adminlər daxil ola bilər!");
      navigate("/admin/login");
      return;
    }
  }, [navigate]);

  return <Outlet />;
}

export default AdminLayout;
