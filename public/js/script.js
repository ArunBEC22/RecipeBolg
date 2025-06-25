

    document.addEventListener('DOMContentLoaded', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const containerFluid = document.querySelector('.container-fluid');

        navbarToggler.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('#navbarScroll');
            
            if (navbarCollapse.classList.contains('show')) {
                // Menu is currently open, so we close it and remove the background color
                containerFluid.style.backgroundColor = '#f8f9fa';
            } else {
                // Menu is closed, so we open it and add the white background color
                containerFluid.style.backgroundColor = '#f8f9fa';
            }
        });
    });
