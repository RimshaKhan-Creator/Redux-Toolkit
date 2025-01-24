import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { setBatch } from './Store/Batchslice';

const Batcheslist = () => {
  
// Dummy Data for Batches
const batchData = [
  {
    batchName: 'Batch A',
    charges: '$100',
    createdDate: '2024-12-01',
    status: 'Active',
  },
  {
    batchName: 'Batch B',
    charges: '$150',
    createdDate: '2024-11-20',
    status: 'Inactive',
  },
  {
    batchName: 'Batch C',
    charges: '$200',
    createdDate: '2024-10-10',
    status: 'Active',
  },
];

  const dispatch = useDispatch(setBatch)
  const handleClick = (batch) => {
  dispatch(setBatch(batch));
    
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column', // Stack items vertically
        '& > :not(style)': {
          m: 1,
          height: 'auto',
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          mb: 1,
          cursor: 'pointer',
          border: '0.5px solid grey',
        }}
      >
        <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
          Batches Detail
        </Typography>
        {batchData.map((batch, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              width: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 1,
              mb: 2,
              cursor: 'pointer',
              border: '0.5px solid blue',
              '&:hover': { backgroundColor: '#e0e0e0' },
              p: 2,
              gap: 4, // Gap between the flex columns
            }}
            onClick={() => handleClick(batch)}
          >
            {/* Left Column (Batch Name and Created Date) */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: 'blue' }}>
                Batch Name: {batch.batchName}
              </Typography>
              <Typography sx={{ color: 'black' }}>
                Created Date: {batch.createdDate}
              </Typography>
            </Box>

            {/* Right Column (Charges and Status) */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: 'blue' }}>
                Charges: {batch.charges}
              </Typography>
              <Typography sx={{ color: 'green' }}>
                Status: {batch.status}
              </Typography>
            </Box>
            <IconButton aria-label="Example">
              <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
};

export default Batcheslist;
