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
            
            const customer = { name, email, number, bookingTime };
            let customers = JSON.parse(localStorage.getItem('customers')) || [];
            customers.push(customer);
            localStorage.setItem('customers', JSON.stringify(customers));
            
            alert('Customer information saved!');
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
            `;
            customerList.appendChild(customerDiv);
        });
    }
});


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
