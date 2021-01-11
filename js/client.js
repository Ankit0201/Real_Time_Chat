const socket= io();
    
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');
const showmsg=document.getElementsByClassName('.message');
console.log(showmsg);

const audio=document.getElementById("myAudio");

//Apend Name
const appendName=(personName,position)=>{
    const nameElement=document.createElement('div');
        nameElement.innerText=personName;
        nameElement.classList.add('userName')
        nameElement.classList.add(position);
        messageContainer.append(nameElement);
}
// Append msg
const append = (msg,position)=>{
    const msgElement=document.createElement('div');
    msgElement.innerText=msg;
    if(position === 'left'){
        msgElement.classList.add('message_left');
        msgElement.classList.add(position);
        messageContainer.append(msgElement);
        audio.play()
    }else{
        msgElement.classList.add('message_right');
        msgElement.classList.add(position);
        messageContainer.append(msgElement);
    }
}

form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send',message);
$(".emojionearea-editor").html('')

})
const userName=prompt("Enter your name to join");
if(userName){
    append(`Welcome ${userName} in Real time Chat`,'right')
}

// If new user is joined
socket.emit('new-user-joined',userName)

//update the user someone has joined
socket.on('user-joined',data=>{
append(`${data} join the Chat`,'right')
})

//Message is recieve
socket.on('recieve',data=>{
    appendName(`${data.name}`,'left')
    append(`${data.message} `,'left')
})

// Someone left the chat
socket.on('left',name=>{
    append(`${name} left the chat `,'left')
})

