// js/main.js

document.addEventListener("DOMContentLoaded", async () => {
  const output = document.getElementById("output");
  const saveButton = document.getElementById("save-model");
  const loadButton = document.getElementById("load-model");

  // Load and preprocess data
  const { xs, ys, minPrice, maxPrice } = preprocessData(data);

  let model = await loadModel();
  if (!model) {
    model = await createModel();
    await trainModel(model, xs, ys);
  }

  const minDate = Math.min(...data.map(d => new Date(d.date).getTime()));
  const maxDate = Math.max(...data.map(d => new Date(d.date).getTime()));
  const normalizeDate = date => (date - minDate) / (maxDate - minDate);

  const newDate = normalizeDate(new Date('2023-01-10').getTime());

  // Make predictions
  const newXs = tf.tensor2d([
    [newDate, 0], // Supplier A
    [newDate, 1], // Supplier B
    [newDate, 2], // Supplier C
    [newDate, 3]  // Supplier D
]);

  const predictions = await makePrediction(model, newXs);
  const denormalizedPredictions = predictions.map(p => p * (maxPrice - minPrice) + minPrice);

  // Display predictions
  output.innerHTML = `
        <p>Supplier A's predicted price: ${denormalizedPredictions[0]}</p>
        <p>Supplier B's predicted price: ${denormalizedPredictions[1]}</p>
        <p>Supplier C's predicted price: ${denormalizedPredictions[2]}</p>
        <p>Supplier D's predicted price: ${denormalizedPredictions[3]}</p>
    `;

  // Save model on button click
  saveButton.addEventListener("click", async () => {
    await saveModel(model);
  });

  // Load model on button click
  loadButton.addEventListener("click", async () => {
    model = await loadModel();
    if (model) {
      const predictions = await makePrediction(model, newXs);
      const denormalizedPredictions = predictions.map(p => p * (maxPrice - minPrice) + minPrice);
      output.innerHTML = `
                <p>Supplier A's predicted price: ${denormalizedPredictions[0]}</p>
                <p>Supplier B's predicted price: ${denormalizedPredictions[1]}</p>
                <p>Supplier C's predicted price: ${denormalizedPredictions[2]}</p>
                <p>Supplier D's predicted price: ${denormalizedPredictions[3]}</p>
            `;
    }
  });
});
