import type { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import "./Add.scss"
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
    slug: string,
    columns: GridColDef[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const Add = (props: Props) => {
    const [formData, setFormData] = React.useState<Record<string, any>>({});


    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`http://localhost:8000/api/${props.slug}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${props.slug}`] });
        }
    })

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await mutation.mutateAsync(formData);
    if (response.ok) {
      props.setOpen(false);
    }
  } catch (error) {
    console.error("Creation failed:", error);
  }
};

    return (
        <div className='add'>
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>X</span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter(item => item.field !== "id" && item.field !== "img")
                        .map(column => (
                            <div className="item">
                                <label>{column.headerName}</label>
                                <input
                                    type={column.type === 'number' ? 'number' : 'text'}
                                    placeholder={column.field}
                                    name={column.field}
                                    value={formData[column.field] || ''}
                                    onChange={(e) => setFormData({ ...formData, [column.field]: e.target.value })}
                                />
                            </div>
                        ))}
                    <button>Create</button>
                </form>
            </div>
        </div>
    );
}

export default Add;




