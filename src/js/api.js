import HTMLElems from './htmlElems.js';

export default class Api {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
      this.htmlElems = new HTMLElems();
      this.ws = false;
    }
    
    async add(user) {
        console.log(this.apiUrl)
      const request = fetch(this.apiUrl + `players/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      
      const result = await request;

      console.log(result)
      if (!result.ok) {
        
        return result;
      }
  
      const json = await result.json();
      const status = json.status;
      
      return status;
    }
    
    async remove(user) {
      const query = 'subscriptions/' + encodeURIComponent(user.phone);
  
      const request = fetch(this.apiUrl + query, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      const result = await request;
  
      if (!result.ok) {
        console.error('Ошибка!');
        
        return;
      }
  
      const json = await result.json();
      const status = json.status;
      
      console.log(status);
    }

    wsInit(conteiner) {
        this.ws = new WebSocket('ws://localhost:7070/ws');
  
        this.ws.addEventListener('open', (e) => {
            console.log(e);
    
            console.log('ws open');
        });
  
        this.ws.addEventListener('close', (e) => {
            console.log(e);
    
            console.log('ws close');
        });
  
        this.ws.addEventListener('error', (e) => {
            console.log(e);
    
            console.log('ws error');
        });

        this.ws.addEventListener('message', (e) => {
                console.log(e);
              
                const data = JSON.parse(e.data);
                const { chat: messages } = data;

                console.log(data)
                console.log(messages)
                
                messages.forEach(message => {
                    conteiner.appendChild(this.htmlElems.htmlMessage(message.toString()));
                });
                
                console.log('ws message');
              });
    }

    sendWs(msg) {
        this.ws.send(`${msg}`);
    }
  }
  
//   const ws = new WebSocket('ws://http://localhost:7070/ws');
  
//   const chat = document.querySelector('.chat');
//   const chatMessage = document.querySelector('.chat-message');
//   const chatSend = document.querySelector('.chat-send');
  
//   chatSend.addEventListener('click', () => {
//     const message = chatMessage.value;
    
//     if (!message) return;
    
//     ws.send(message);
    
//     chatMessage.value = '';
//   });
  
//   ws.addEventListener('open', (e) => {
//     console.log(e);
    
//     console.log('ws open');
//   });
  
//   ws.addEventListener('close', (e) => {
//     console.log(e);
    
//     console.log('ws close');
//   });
  
//   ws.addEventListener('error', (e) => {
//     console.log(e);
    
//     console.log('ws error');
//   });
  
//   ws.addEventListener('message', (e) => {
//     console.log(e);
  
//     const data = JSON.parse(e.data);
//     const { chat: messages } = data;
    
//     messages.forEach(message => {
//       chat.appendChild(document.createTextNode(message) + '\n');
//     });
    
//     console.log('ws message');
//   });
  
//   window.api = new SubscriptionApi('http://localhost:7070/');