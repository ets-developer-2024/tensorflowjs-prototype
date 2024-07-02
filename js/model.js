// js/model.js



async function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 50, inputShape: [2], activation: 'relu'}));
    model.add(tf.layers.dense({units: 1}));

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
    });

    return model;
}

async function trainModel(model, xs, ys) {
    await model.fit(xs, ys, {
        epochs: 200,
        batchSize: 4,
        validationSplit: 0.2,
        // callbacks: tf.callbacks.earlyStopping({monitor: 'val_loss'})
        callbacks: {
            onEpochEnd: (epoch, log) => {
                console.log(`Epoch ${epoch}: loss = ${log.loss}`);
            }
        }
    });
}

async function saveModel(model) {
    await model.save('localstorage://my-model');
    console.log('Model saved');
}

async function loadModel() {
    try {
        const model = await tf.loadLayersModel('localstorage://my-model');
        console.log('Model loaded');
        return model;
    } catch (error) {
        console.log('No saved model found');
        return null;
    }
}

async function makePrediction(model, xs) {
    const predictions = model.predict(xs);
    // return predictions.dataSync();
    return predictions.arraySync().flat();
}
