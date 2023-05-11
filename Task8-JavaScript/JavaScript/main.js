function splitNumber() {
    var output = document.getElementById('output')
    if (output.lastChild){
        output.removeChild(output.lastChild)
    }

    const number = parseInt(document.getElementById('number').value);
    const times = parseInt(document.getElementById('split-times').value);
    const boxes = [];
    let num = Math.floor(number/times)
    let remaining = number%times;

    for (let i = 0; i < times; i++) {
        if (remaining>0){
            boxes.push(num+1);
            remaining -= 1
        }
        else{
            boxes.push(num)
        }
    }
    console.log(boxes)
    const container = document.createElement('div');
    container.classList.add('container');
    document.getElementById('output').appendChild(container);

    const colors = ['red', 'blue', 'green', 'gray'];
    for (let i = boxes.length-1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box', colors[i % colors.length]);
        box.style.width = `${(100*boxes[i])/number }%`;
        box.textContent = boxes[i];
        container.appendChild(box);
    }
    
}