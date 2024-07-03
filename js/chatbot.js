// js/chatbot.js

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-btn");

  sendButton.addEventListener("click", async () => {
    const userQuery = userInput.value.trim();
    if (userQuery) {
      appendMessage("user", userQuery);

      // Process user query and generate response
      const response = await generateResponse(userQuery);
      appendMessage("bot", response);

      userInput.value = "";
    }
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(
      sender === "user" ? "user-message" : "bot-message"
    );
    messageElement.innerHTML = message;
    chatMessages.appendChild(messageElement);

    // Scroll to bottom of chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function generateResponse(query) {
    let response = "";

    // Regular expressions for different types of queries
    const predictPricesRegex = /predict prices for supplier (\w+) on (.+)/i;
    const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/g;
    const infoRegex = /tell me about (.+)/i;
    const generalQuestionRegex = /what is (.+)/i;

    // Handle predictions based on date
    if (predictPricesRegex.test(query) || dateRegex.test(query)) {
      response = await handlePredictionQuery(query);
    } else if (infoRegex.test(query)) {
      response = handleInfoQuery(query);
    } else if (generalQuestionRegex.test(query)) {
      response = handleGeneralQuestion(query);
    } else {
      response = "I'm sorry, I don't understand your question. Please ask in a different way.";
    }

    return response;
  }

  async function generateResponse(query) {
    let response = "";

    // Regular expressions for different types of queries
    const predictPricesRegex = /predict prices for supplier (\w+) on (.+)/i;
    const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/g;
    const infoRegex = /tell me about (.+)/i;
    const generalQuestionRegex = /what is (.+)/i;

    // Handle predictions based on date
    if (predictPricesRegex.test(query) || dateRegex.test(query)) {
      response = await handlePredictionQuery(query);
    } else if (infoRegex.test(query)) {
      response = handleInfoQuery(query);
    } else if (generalQuestionRegex.test(query)) {
      response = handleGeneralQuestion(query);
    } else {
      response = "I'm sorry, I don't understand your question. Please ask in a different way.";
    }

    return response;
  }

  async function handlePredictionQuery(query) {
    const predictPricesRegex = /predict prices for supplier (\w+) on (.+)/i;
    const dateRegexExp = /\b\d{4}-\d{2}-\d{2}\b/g;
    const predictMatch = query.match(predictPricesRegex);
    const dates = query.match(dateRegexExp);

    let requestedDate;
    let supplier;

    if (predictMatch) {
      supplier = predictMatch[1].toUpperCase(); // Extract supplier from query
      requestedDate = predictMatch[2]; // Extract date from query
    } else if (dates) {
      requestedDate = dates[0]; // Extract date from query
    }

    if (!requestedDate) {
      return "Please provide a valid date in the format YYYY-MM-DD.";
    }

    const supplierIndex = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    };

    const minDate = Math.min(...data.map((d) => new Date(d.date).getTime()));
    const maxDate = Math.max(...data.map((d) => new Date(d.date).getTime()));
    function normalizeDate(date) {
      return (date - minDate) / (maxDate - minDate);
    }

    const model = await loadModel();
    if (model) {
      const newDate = normalizeDate(new Date(requestedDate).getTime());

      if (supplier) {
        const supplierIdx = supplierIndex[supplier];

        if (supplierIdx === undefined) {
          return `Unknown supplier: ${supplier}`;
        }

        const newXs = tf.tensor2d([
          [newDate, supplierIdx]
        ]);

        const prices = data.map((d) => d.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        const predictions = await makePrediction(model, newXs);
        const denormalizedPrediction = predictions[0] * (maxPrice - minPrice) + minPrice;

        return `Supplier ${supplier}'s predicted price: ${denormalizedPrediction.toFixed(4)}`;
      } else {
        const newXs = tf.tensor2d([
          [newDate, 0], // Supplier A
          [newDate, 1], // Supplier B
          [newDate, 2], // Supplier C
          [newDate, 3], // Supplier D
        ]);

        const prices = data.map((d) => d.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        const predictions = await makePrediction(model, newXs);
        const denormalizedPredictions = predictions.map(
          (p) => p * (maxPrice - minPrice) + minPrice
        );

        return `
          <p>Supplier A's predicted price: ${denormalizedPredictions[0].toFixed(4)}</p>
          <p>Supplier B's predicted price: ${denormalizedPredictions[1].toFixed(4)}</p>
          <p>Supplier C's predicted price: ${denormalizedPredictions[2].toFixed(4)}</p>
          <p>Supplier D's predicted price: ${denormalizedPredictions[3].toFixed(4)}</p>
        `;
      }
    } else {
      return "Sorry, I couldn't load the model.";
    }
  }

  function handleInfoQuery(query) {
    const infoMatch = query.match(/tell me about (.+)/i);
    if (infoMatch) {
      const topic = infoMatch[1];
      // Add logic to provide information about the topic
      return `Information about ${topic}: ...`;
    } else {
      return "I'm sorry, I don't have information about that topic.";
    }
  }

  function handleGeneralQuestion(query) {
    const questionMatch = query.match(/what is (.+)/i);
    if (questionMatch) {
      const topic = questionMatch[1];
      // Add logic to answer general questions
      return `Answer to the question "What is ${topic}": ...`;
    } else {
      return "I'm sorry, I don't have an answer to that question.";
    }
  }
});
