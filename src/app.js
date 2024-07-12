const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

//sign up customer list and viewing customers

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sign-up-form');
    const viewCustomersButton = document.getElementById('view-customers');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const number = document.getElementById('number').value;
            const bookingTime = document.getElementById('booking-time').value;

            const code = generateRandomCode(); //generate code
            
            const customer = { name, email, number, bookingTime };
            let customers = JSON.parse(localStorage.getItem('customers')) || [];
            customers.push(customer);
            localStorage.setItem('customers', JSON.stringify(customers));
            
            alert(`Your appointment has been set! Here is your code just for you: #${code}`);
            form.reset();
        });
    }

    if (viewCustomersButton) {
        viewCustomersButton.addEventListener('click', function() {
            window.location.href = '/customer.html';
        });
    }

    const customerList = document.getElementById('customer-list');
    if (customerList) {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        customers.forEach(customer => {
            const customerDiv = document.createElement('div');
            customerDiv.classList.add('customer');
            customerDiv.innerHTML = `
                <p>Name: ${customer.name}</p>
                <p>Email: ${customer.email}</p>
                <p>Number: ${customer.number}</p>
                <p>Booking Time: ${customer.bookingTime}</p>
                <p>Code: #${customer.code}</p> <!-- Display the generated code -->
            `;
            customerList.appendChild(customerDiv);
        });
    }
});

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 7; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// interactive photo carousel

document.addEventListener('DOMContentLoaded', () => {
    const galleryWrapper = document.querySelector('.gallery__wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - galleryWrapper.offsetLeft;
        scrollLeft = galleryWrapper.scrollLeft;
    });

    galleryWrapper.addEventListener('mouseleave', () => {
        isDown = false;
    });

    galleryWrapper.addEventListener('mouseup', () => {
        isDown = false;
    });

    galleryWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryWrapper.offsetLeft;
        const walk = (x - startX) * 3; // Adjust speed factor
        galleryWrapper.scrollLeft = scrollLeft - walk;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gallery-submit-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const codeInput = document.getElementById('code');
            const codeValue = codeInput.value.trim(); // Trim whitespace
            
            // Check if code starts with #
            if (!codeValue.startsWith('#')) {
                alert("Error: Improper Code!");
                return;
            }
            
            // Simulate a message about photos being processed
            alert("Your photos are still in the making, you'll get an email soon when they're ready!");
            form.reset();
        });
    }
});
