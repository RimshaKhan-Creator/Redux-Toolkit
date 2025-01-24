import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
const BatchesData = () => {

  const batches = useSelector((state) => state.batches.list); 
  // Sample Data for Rows
  const rows = [
    { id: 1, batchName: 'Batch A', charges: 500, date: '2025-01-01' },
    { id: 2, batchName: 'Batch B', charges: 750, date: '2025-01-02' },
    { id: 3, batchName: 'Batch C', charges: 600, date: '2025-01-03' },
  ];

  // Column Definitions
  const columns = [
    { field: 'batchName', headerName: 'Batch Name', width: 200 },
    { field: 'charges', headerName: 'Charges ($)', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        borderRadius: '16px',
        margin: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          padding: 2,
        }}
      >
        {batches.map((batch) => (
          <Box
            key={batch.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              padding: 2,
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              boxShadow: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              gap:'150px'
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: 1, color: '#333', fontWeight: 'bold' }}
            >
              {batch.batchName}
            </Typography>
            <Typography sx={{ marginBottom: 1, color: '#555' }}>
              Charges: {batch.charges}
            </Typography>
            <Typography sx={{ marginBottom: 1, color: '#555' }}>
              Created Date: {batch.createdDate}
            </Typography>
            <Typography
              sx={{
                color: batch.status === 'Active' ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              Status: {batch.status}
            </Typography>
          </Box>
        ))}
      </Box>

      <div style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Paper>
  );
};

export default BatchesData;
