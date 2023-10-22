import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './index.css'
import Login from './Login.tsx'
import RoleContext from '@/components/RoleContext.tsx'
import AdminLayout from './components/AdminLayout.tsx';
import ViewTable from './ViewTable.tsx';
import Billing from './Billing.tsx';
import ViewOrder from './ViewOrder.tsx';
import DetailOrder from './DetailOrder.tsx';
import ManageEmployee from './ManageEmployee.tsx';
import DetailEmployee from './DetailEmployee.tsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <ViewTable />,
      },
      {
        path: "/billing/:table_id",
        element: <Billing />,
      },
      {
        path: "/view-order",
        element: <ViewOrder />,
      },
      {
        path: "/view-order/:queue",
        element: <DetailOrder />,
      },
      {
        path: "/manage-employee",
        element: <ManageEmployee />,
      },
      {
        path: "/manage-employee/:id",
        element: <DetailEmployee />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoleContext>
      <div><Toaster/></div>
      <RouterProvider router={router} />
    </RoleContext>
  </React.StrictMode>,
)
