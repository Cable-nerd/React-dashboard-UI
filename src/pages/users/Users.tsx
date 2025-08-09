import  { useState } from 'react';
import './users.scss';
import DataTable from '../../components/dataTable/DataTable';
import type { GridColDef } from '@mui/x-data-grid';

import Add from '../../components/add/Add';
import { useQuery } from '@tanstack/react-query';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => (
      <img
        src={params.row.img || "https://i.postimg.cc/SQ5X0NmR/avatar-svgrepo-com.png"}
        alt=""
        className="avatar"
        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
      />
    ),
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'club',
    headerName: 'Club',
    width: 150,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 150,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'created At',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    type: "string",
  },
  {
    field: 'verified',
    headerName: 'Verified',
    width: 120,
    type: 'boolean',
    align: 'center',
    headerAlign: 'center',
  },

];
type User = {
  id?: number | string;
  img?: string;
  name?: string;
  club?: string;
  email: string;
  phone?: string;
  country?: string;
  createdAt?: string;
  verified?: boolean;
};

const Users = () => {
  const [open, setOpen] = useState(false);

  const { isPending, data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:8000/api/users").then(
        (res) => res.json()
      ),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {isPending ?
        ("Loading...")
        :
        (<DataTable
          slug='users'
          columns={columns}
          rows={(data ?? []).map(user => ({
            ...user,
            id: user.id || `email-${user.email}-${crypto.randomUUID()}` // Fallback with UUID
          }))}
        />


        )
      }
      {open && <Add slug="users" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Users