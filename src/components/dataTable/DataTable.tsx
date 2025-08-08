import { GridToolbar } from "@mui/x-data-grid/internals";
import "./dataTable.scss";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type Props = {
    columns: GridColDef[];
    rows: object[];
    slug: string;
}



const DataTable = (props: Props) => {



    const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (id: number) => {
    return fetch(`http://localhost:8000/api/${props.slug}/${id}`, {
      method: "DELETE"
    }).then(res => res.json());  // parse JSON here
  },
  onSuccess: (data) => {
    console.log('Deleted successfully:', data.deletedId);
    queryClient.invalidateQueries(['users']);
  },
  onError: (error) => {
    console.error(`Delete failed:`, error)
  }
});


    const handleDelete = (id: number) => {
        //del item via api call
        //axios.delete(`https://api.example.com/${props.slug}/${id}`)
        if (window.confirm(`Delete this ${props.slug}?`)) {
            mutation.mutate(id, {

                onError: (error) => {
                    console.error(`Delete failed:`, error)
                },
                onSuccess: (data) => {
                    console.log('Deleted successfully:', data.deletedId);
                    queryClient.invalidateQueries(['users']);
                }
            });
        }

    }

    const actionColumn: GridColDef = {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => {
            return (
                <div className="action" /*style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}*/>
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <img src="/app (29).svg" alt="" className="" />
                    </Link>
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src="/app-(6).svg" alt="🗑" />
                    </div>
                </div>
            )
        }
    }


    /*
        const rows = [
            { id: 1, club: 'Snow', name: 'Jon', number: 14, country: 'USA', status: true },
            { id: 2, club: 'Lannister', name: 'Cersei', number: 31, country: 'USA', status: false },
            { id: 3, club: 'Lannister', name: 'Jaime', number: 31, country: 'USA', status: false  },
            { id: 4, club: 'Stark', name: 'Arya', number: 11, country: 'USA', status: false },
            { id: 5, club: 'Targaryen', name: 'Daenerys', number: null, country: 'USA', status: false  },
            { id: 6, club: 'Melisandre', name: "", number: 150, country: 'USA', status: false },
            { id: 7, club: 'Clifford', name: 'Ferrara', number: 44, country: 'USA', status: false },
            { id: 8, club: 'Frances', name: 'Rossini', number: 36, country: 'USA', status: true },
            { id: 9, club: 'Roxie', name: 'Harvey', number: 65, country: 'USA', status: false },
        ];
    */

    return (
        <div className="dataTable">
            <Box sx={{ height: 520, width: '100%' }}>
                <DataGrid
                    className="dataGrid"
                    rows={props.rows.map(row => ({
                        ...row,
                        id: row.id || `temp-${crypto.randomUUID()}` // Always unique
                    }))}
                    getRowId={(row) => row.id}
                    columns={[...props.columns, actionColumn]}

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        }
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    showToolbar
                    disableColumnSelector
                    disableColumnFilter
                />
            </Box>

        </div>
    )

}

export default DataTable;

