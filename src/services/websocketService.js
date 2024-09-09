// websocketService.js
let socket = null;

const connect = (url) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.warn('WebSocket connection already open');
    return;
  }

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connection opened');
  };

  socket.onmessage = (event) => {
    console.log('Message received:', event.data);
    // Handle incoming messages
    const data = JSON.parse(event.data);
    if (data.action === 'orderUpdate') {
      // Handle order updates if needed
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
    // Optionally handle reconnections
  };
};

const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not connected');
  }
};

const disconnect = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export { connect, sendMessage, disconnect };
