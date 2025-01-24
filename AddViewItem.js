import React, { useState, useEffect } from 'react';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


// Assuming you have an IndexedDB utility to interact with IndexedDB
import { openDB, deleteDB } from 'idb';  // Use a library or your own IndexedDB utility

const AddViewItem = () => {
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  // Function to open IndexedDB and fetch items
  const fetchItems = async () => {
    const db = await openDB('myDB', 1, {
      upgrade(db) {
        db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
      },
    });
    const allItems = await db.getAll('items');
    setItems(allItems);
  };

  // Fetch items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle adding a new item
  const handleAddItem = async () => {
    const db = await openDB('myDB', 1);
    const newItem = { name: itemName, description: itemDescription };
    await db.add('items', newItem);
    setItemName('');
    setItemDescription('');
    fetchItems(); // Refresh the list after adding
  };

  // Handle editing an item
  const handleEditItem = async () => {
    const db = await openDB('myDB', 1);
    await db.put('items', { id: editItem.id, name: itemName, description: itemDescription });
    setItemName('');
    setItemDescription('');
    setOpenDialog(false);
    fetchItems(); // Refresh the list after editing
  };

  // Handle deleting an item
  const handleDeleteItem = async (id) => {
    const db = await openDB('myDB', 1);
    await db.delete('items', id);
    fetchItems(); // Refresh the list after deleting
  };

  // Handle open dialog for editing an item
  const handleOpenDialog = (item) => {
    setEditItem(item);
    setItemName(item.name);
    setItemDescription(item.description);
    setOpenDialog(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setEditItem(null);
    setItemName('');
    setItemDescription('');
    setOpenDialog(false);
  };

  return (
    <div>
      <h1>IndexedDB in React</h1>
      <TextField
        label="Item Name"
        variant="outlined"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{ marginBottom: '10px', marginRight: '10px' }}
      />
      <TextField
        label="Item Description"
        variant="outlined"
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
        style={{ marginBottom: '10px', marginRight: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        startIcon={<AddIcon />}
        style={{ marginBottom: '20px' }}
      >
        Add Item
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="items table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell align="left"><strong>Description</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpenDialog(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item Description"
            variant="outlined"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddViewItem;
