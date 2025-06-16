function toggleChatbot() {
  const $chatbot = $('#chatbot');
  $chatbot.css('display') === 'flex'
    ? $chatbot.css('display', 'none')
    : $chatbot.css('display', 'flex');
}

async function sendMessage() {
  const $input = $('#userInput');
  const message = $input.val().trim();
  if (message === "") return;

  const $chatBody = $('.chat-body');

  // Mensagem do usuário
  $('<div class="msg user"></div>').text(message).appendTo($chatBody);

  $input.val('');

  // Mostra que está pensando
  const $botThinking = $('<div class="msg bot">Digitando...</div>').appendTo($chatBody);
  $chatBody.scrollTop($chatBody[0].scrollHeight);

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBBddS3SdxTHO4oLd7sRoj2LTY5uoFda9E", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: message }]
        }]
      })
    });

    const data = await response.json();
    const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui entender.";

    $botThinking.text(botText);
  } catch (error) {
    $botThinking.text("Erro ao conectar com o assistente.");
    console.error(error);
  }

  $chatBody.scrollTop($chatBody[0].scrollHeight);
}

function getBotReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes("curso")) {
    return "Oferecemos cursos técnicos, livres, graduação e pós. Quer saber mais sobre algum?";
  } else if (msg.includes("enfermagem")) {
    return "O curso Técnico em Enfermagem começa em 10/07/2025 em Jaraguá do Sul.";
  } else if (msg.includes("inscrição")) {
    return "Você pode se inscrever clicando em 'Inscreva-se já!' no topo da página.";
  } else {
    return "Desculpe, não entendi. Pergunte sobre cursos, inscrições ou unidades.";
  }
}
