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
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);

        // Scroll to bottom of chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function generateResponse(query) {
        let response = "";

        // Example: Detect if user asked for predictions based on date
        const dateRegex = /predict prices on (.+)/i;
        const dateMatch = query.match(dateRegex);

        if (dateMatch) {
            const requestedDate = dateMatch[1]; // Extract date from query

            // NORMALIZE DATA FUNCTIONS PROTO
            const minDate = Math.min(...data.map(d => new Date(d.date).getTime()));
            const maxDate = Math.max(...data.map(d => new Date(d.date).getTime()));
            function normalizeDate(date) {
              return (date - minDate) / (maxDate - minDate);
            }

            const model = await loadModel();
            if (model) {
                // Calculate normalized date
                
                const newDate = normalizeDate(new Date(requestedDate).getTime());

                // Prepare input tensor for prediction
                const newXs = tf.tensor2d([
                    [newDate, 0], // Supplier A
                    [newDate, 1], // Supplier B
                    [newDate, 2], // Supplier C
                    [newDate, 3]  // Supplier D
                ]);


                // MAX PRICE PROTO
                const prices = data.map(d => d.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);

                // Make predictions
                const predictions = await makePrediction(model, newXs);
                const denormalizedPredictions = predictions.map(p => p * (maxPrice - minPrice) + minPrice);

                // Format response
                response = `
                    Supplier A's predicted price: ${denormalizedPredictions[0]}\n
                    Supplier B's predicted price: ${denormalizedPredictions[1]}\n
                    Supplier C's predicted price: ${denormalizedPredictions[2]}\n
                    Supplier D's predicted price: ${denormalizedPredictions[3]}
                `;
            } else {
                response = "Sorry, I couldn't load the model.";
            }
        } else {
            response = "I'm sorry, I don't understand. Please ask for predictions based on a specific date.";
        }

        return response;
    }
});
