import HTMLElems from './htmlElems.js';

export default class Api {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
      this.nickname = false;
      this.htmlElems = new HTMLElems(this.nickname);
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

    wsInit(conteiner, nickname) {
        this.ws = new WebSocket('ws://ws-backend-0o4w.onrender.com/ws');
        this.htmlElems = new HTMLElems(nickname)
  
        this.ws.addEventListener('open', (e) => {
            console.log(e);
    
            console.log('ws open');
        });
  
        this.ws.addEventListener('close', (e) => {
            console.log(e);
            conteiner.appendChild(this.htmlElems.htmlMessage(`выход`));
            console.log('ws close');
        });
  
        this.ws.addEventListener('error', (e) => {
            console.log(e);
    
            console.log('ws error');
        });

        this.ws.addEventListener('message', (e) => {
                console.log(e);
              
                const data = JSON.parse(e.data);
                console.log(typeof data)

                if(data.length === 0) return

                if(data.length) {
                    data.forEach(item => {
                        conteiner.appendChild(this.htmlElems.htmlMessage(item));
                    });
                    return
                }

                conteiner.appendChild(this.htmlElems.htmlMessage(data));
                
                console.log('ws message');
              });
    }

    sendWs(obj) {
        this.ws.send(JSON.stringify(obj));
    }
  }
  