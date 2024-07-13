const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let cars = [
  { id: 1, name: "BMW" },
  { id: 2, name: "Mercedes" },
  { id: 3, name: "Honda" },
  { id: 4, name: "Toyota" },
];

app.get("/cars", (req, res) => {
  res.json({
    total: cars.length,
    cars: cars,
  });
});

// Get car by name "Case sensitive".
app.get("/cars/:name", (req, res) => {
  let filteredCars = [...cars];

  if (req.params.name) {
    filteredCars = cars.filter((car) => {
      return car.name.toLowerCase().includes(req.params.name.toLowerCase());
    });
  }

  res.json({
    total: cars.length,
    cars: filteredCars,
  });
});

app.post("/cars", (req, res) => {
  const newCar = {
    id: cars.length + 1,
    ...req.body,
  };
  cars.push(newCar);
  res.status(201).json(newCar);
});

app.delete("/cars/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const initialLength = cars.length;

  cars = cars.filter((car) => car.id !== cardId);

  if (cars.length === initialLength) {
    return res.status(404).json({ message: "Car not found" });
  }

  res.json({
    initialLength: initialLength,
    message: "Car deleted successfully",
    length: cars.length,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.listen(port, () => {
  console.log(`Express server listening at port ${port}`);
});
