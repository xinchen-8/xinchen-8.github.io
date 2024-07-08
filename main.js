document.querySelector('.bg-style').style.backgroundColor = 'white';

function RandomDots(container, numberOfDots) {
    const offsetHeight = container.style.top;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const dots = [];

    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        const x = Math.random() * containerWidth;
        const y = Math.random() * containerHeight + offsetHeight;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        const r = Math.random() * 300+50;
        dot.style.width = `${r}px`;
        dot.style.height = `${r}px`;
        
        dots.push({
            element: dot,
            x: x,
            y: y,
            dx: (Math.random() - 0.5) * 5,
            dy: (Math.random() - 0.5) * 5
        });

        container.appendChild(dot);
    }
    function limitSpeed(dot){
        if (Math.abs(dot.dx) < 0.2) dot.dx *= 5;
        if (Math.abs(dot.dy) < 0.2) dot.dy *= 5;
    }

    function updateDots() {
        dots.forEach(dot => {
            dot.x += dot.dx;
            dot.y += dot.dy;


            //four border
            if(dot.x < -parseFloat(dot.element.style.width) && dot.dx < 0){
                dot.x = containerWidth + parseFloat(dot.element.style.width);
                limitSpeed(dot);
            }
            if(dot.y < offsetHeight-parseFloat(dot.element.style.height) && dot.dy < 0){
                dot.y = offsetHeight + containerHeight + parseFloat(dot.element.style.height);
                limitSpeed(dot);
            }
            if(dot.x > containerWidth + parseFloat(dot.element.style.width) && dot.dx > 0){
                dot.x = -parseFloat(dot.element.style.width);
                limitSpeed(dot);
            }
            if(dot.y > offsetHeight + containerHeight + parseFloat(dot.element.style.height) && dot.dy > 0){
                dot.y = offsetHeight-parseFloat(dot.element.style.height);
                limitSpeed(dot);
            }
            dot.element.style.left = `${dot.x}px`;
            dot.element.style.top = `${dot.y}px`;
        });
        requestAnimationFrame(updateDots);
    }

    requestAnimationFrame(updateDots);
}

window.onload = function() {
    const container = document.querySelector('.bg-style');
    RandomDots(container, 20);
};