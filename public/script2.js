function fetchChatResponse(message) {
  return fetch('http://localhost:5500/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
    credentials: 'include',
  })
  .then(response => response.json())
  .then(data => marked(data.candidates[0].content.parts[0].text))
  .catch((error) => {
    console.error('Error:', error);
  });
}

function clearHistory() {
  document.getElementById('chat-container').innerHTML = '';
  document.getElementById('chat-title').innerHTML = 'New Chat';
  fetch('http://localhost:5500/clear', {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.status);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
// clearHistory();

// document.getElementById('clear-history').addEventListener('click', clearHistory);

var input = document.getElementById('user-input');
var button = document.getElementById('submit-button');
input.addEventListener('input', function() {
  if (input.value == '' || input.value == null) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});

let isSubmitting = true;

document.getElementById('chat-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var promptButton = document.getElementById('prompt-button');
  var userInputField = document.getElementById('user-input');
  promptButton.disabled = true;
  userInputField.disabled = true;

  var userInput = document.getElementById('user-input').value;
  var chatContainer = document.getElementById('chat-container');
  var userMessageElement = document.createElement('div');
  userMessageElement.className = 'chat-message user-message';
  userMessageElement.innerText = userInput;
  // addThemeClass(userMessageElement);
  chatContainer.appendChild(userMessageElement);
  // Scroll the chat container to the bottom
  // chatContainer.scrollTop = chatContainer.scrollHeight;
  userMessageElement.scrollIntoView({ behavior: 'smooth' });
  // Create a menu for the message
  var menu = document.createElement('div');
  menu.className = 'menu';
  menu.innerHTML = '<button class="copy-button">Copy</button>';

  // Append the menu to the message
  userMessageElement.appendChild(menu);

  // Create a new div for the typing animation
  var typingAnimation = document.createElement('div');
  typingAnimation.className = 'typing-animation';

  // Create the three dots
  for (var i = 0; i < 3; i++) {
    var dot = document.createElement('div');
    dot.className = 'dot';
    typingAnimation.appendChild(dot);
  }

  chatContainer.appendChild(typingAnimation);
  // chatContainer.scrollTop = chatContainer.scrollHeight;
  typingAnimation.scrollIntoView({ behavior: 'smooth' });

  fetchChatResponse(userInput)
  .then(botMessage => {
    // spinner.style.display = 'none'; // Hide spinner
    typingAnimation.style.display = 'none'; // Hide typing animation
    promptButton.disabled = false;
    userInputField.disabled = false;
    var botMessageElement = document.createElement('div');
    botMessageElement.className = 'chat-message bot-message';
    botMessageElement.innerHTML = botMessage;
    // addThemeClass(botMessageElement);
    chatContainer.appendChild(botMessageElement);
    // Scroll the chat container to the bottom
    // chatContainer.scrollTop = chatContainer.scrollHeight;
    botMessageElement.scrollIntoView({ behavior: 'smooth' });
    // Create a menu for the message
menu = document.createElement('div');
menu.className = 'menu';
menu.innerHTML = '<button class="copy-button">Copy</button>';

// Append the menu to the message
botMessageElement.appendChild(menu);

// chatContainer.appendChild(newMessage);

    var chatTitle = document.getElementById('chat-title');
    if (chatTitle.innerHTML == 'New Chat') {
      fetchChatResponse('Give a suitable title for out current conversation. \
      Only return the title and no other text. Not even the "Title: "')
      .then(title => {
        chatTitle.innerHTML = title;
      });
    }
  });

  document.getElementById('user-input').value = '';
});

// chatContainer.addEventListener('click', function(event) {
//   if (event.target.matches('.copy-button')) {
//     var messageText = event.target.parentNode.parentNode.textContent;
//     navigator.clipboard.writeText(messageText);
//   }
// });

// const filePath = '/uploads/file.pdf';

// fetch(filePath, { method: 'HEAD' })
//   .then(response => {
//     if (response.ok) {
//       // fileStatusElement.textContent = 'File uploaded successfully';

//     } else {
//       fileStatusElement.textContent = 'File not uploaded';
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     fileStatusElement.textContent = 'Error checking file upload';
//   });

// Function to check and retrieve extracted text
function checkExtractedText() {
  const extractedTextPath = '/uploads/extracted_text.txt';
  console.log("function executed")
  fetch(extractedTextPath)
    .then(response => {
      if (response.ok) {
        console.log("Extracted text found");
        return response.text();
      } else {
        console.log("Extracted text not found");
        throw new Error('File not found');
      }
    })
    .then(extractedText => {
      // extractedTextElement.textContent = extractedText;
      // sys prompt
      console.log(extractedText);
      document.getElementById('prompt-button').disabled = true;
      fetchChatResponse("Below lies the text extracted from a pdf file. You have to answer any queries related to this PDF document. Here's the text of the pdf file:\n" + extractedText)
      .then(document.getElementById('prompt-button').disabled = false);
    })
    .catch(error => {
      console.error('Error:', error);
      extractedTextElement.textContent = 'Error retrieving extracted text';
    });
    console.log("function execution comleted")
}
// checkExtractedText();

function clear_n_check() {
  clearHistory();
  checkExtractedText();
}
clear_n_check();

// const pdfDisplayIframe = document.getElementById('pdf-display');
// const pdfErrorDiv = document.getElementById('pdf-error');

// function showPdfError() {
//   pdfDisplayIframe.style.display = 'none';
//   pdfErrorDiv.style.display = 'block';
// }

const pdfDisplayIframe = document.getElementById('pdf-display');
const pdfErrorDiv = document.getElementById('pdf-error');

// Function to check and display the PDF file
function displayPdf() {
  const filePath = '/uploads/file.pdf';

  fetch(filePath, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        pdfDisplayIframe.src = filePath;
        pdfErrorDiv.style.display = 'none';
      } else {
        pdfDisplayIframe.src = '';
        pdfDisplayIframe.style.display = 'none';
        pdfErrorDiv.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      pdfDisplayIframe.src = '';
      pdfErrorDiv.style.display = 'block';
    });
}

// Call the function when the page loads or when needed
window.addEventListener('load', displayPdf);
// const pdfDisplayIframe = document.getElementById('pdf-display');
// const pdfErrorDiv = document.getElementById('pdf-error');

// // Function to check and display the PDF file
// function displayPdf() {
//   const filePath = '/uploads/file.pdf';

//   fetch(filePath, { method: 'HEAD' })
//     .then(response => {
//       if (response.ok) {
//         pdfDisplayIframe.src = filePath;
//         pdfErrorDiv.style.display = 'none';
//       } else {
//         pdfDisplayIframe.src = '';
//         pdfErrorDiv.style.display = 'block';
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       pdfDisplayIframe.src = '';
//       pdfErrorDiv.style.display = 'block';
//     });
// }

// // Call the function when the page loads or when needed
// window.addEventListener('load', displayPdf);

document.getElementById('clear-history').addEventListener('click', clear_n_check);

let uploadedFilename;

function downloadAndDisplay() {
    fetch('/upload', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const fileName = data.fileName;
        // const filePath = data.filePath;
        
        // Request download using the filename
        fetch(`/download?fileName=${fileName}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const iframe = document.getElementById('fileDisplay');
            iframe.src = url;
            iframe.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

// const fs = require('fs');
// const PDFParser = require('pdf-parse');

// const filePath = '/uploads/file.pdf'; // Replace 'example.pdf' with the actual filename

// // Read the PDF file
// fs.readFile(filePath, (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
    
//     // Create a new PDFParser instance
//     const pdfParser = new PDFParser();

//     // Parse the PDF data
//     pdfParser.parseBuffer(data, (parseErr, pdfData) => {
//         if (parseErr) {
//             console.error('Error parsing PDF:', parseErr);
//             return;
//         }

//         // Extract text from the PDF data
//         const text = pdfData.text;

//         // Print the extracted text
//         console.log('Extracted text:', text);
//     });
// });
