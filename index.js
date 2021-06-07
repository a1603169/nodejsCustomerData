const express = require('express');

const app = express();

const port = 3000;


let customers = [
  {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
  {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
  {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
]

// Get all movies
app.get("/api/customers", (req, res) => {
  res.json(customers);
})

// Fetch movie by id
app.get("/api/customers/:id", (req, res) => {
  const customersId = req.params.id;

  const customer = customers.filter(customer => customer.id === customersId);
  if (customer.length > 0)
    res.json(customer);
  else
    res.status(404).end();
})



// Add new movie
app.post("/api/customers", (req, res) => {
  // Extract movie from the request body and generate id
  const newCustomer = {'id' : Date.now(), ...req.body};

  // Add new movie at the end of the movies array

   customers = [...customers, newCustomer];

  res.json(newCustomer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

//Delete movie
app.delete("/api/customers/:id", (req, res) => { 
  const id = req.params.id;

  customers = customers.filter(movie => movie.id !== id);
  res.status(204).end();
})

//Update movie
app.put("/api/customers/:id", (req, res) => { 
  const id = req.params.id;
  const updatedCustomer = {'id': id, ...req.body};

  //Get the index of updated movie
  const index = customers.findIndex(movie => movie.id === id);
  //Replace updated movie in the array
  customers.splice(index, 1, updatedCustomer); 

  res.json(updatedCustomer);
})