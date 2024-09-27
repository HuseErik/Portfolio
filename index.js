const developerRole = document.getElementById('developerRole');

// Add event listener to detect the end of typing and deleting animations
developerRole.addEventListener('animationend', (event) => {
  if (event.animationName === 'typing') {
    // Start deleting animation
    setTimeout(() => {
    developerRole.style.animation = 'deleting 2s steps(22) forwards, blink-caret 0.5s step-end infinite alternate';
    }, 3000);
  } else if (event.animationName === 'deleting') {
    // Wait for 1 second and then start typing animation
    setTimeout(() => {
      developerRole.style.animation = 'typing 3s steps(22) forwards, blink-caret 0.5s step-end infinite alternate';
    }, 2000);
  }
});

// For changing Pic for About Me
document.addEventListener("DOMContentLoaded", function () {
    const aboutMeImage = document.getElementById("aboutMeImage");

    const initialImageSrc = "./images/aboutMe2.jpg";
    const alternateImageSrcArray = ["./images/aboutMe1.jpg", "./images/aboutMe2.jpg"];

    let currentIndex = 0;

    aboutMeImage.src = initialImageSrc;

    const intervalTime = 5000;

    function changeImage() {
        const nextImageSrc = alternateImageSrcArray[currentIndex];
        aboutMeImage.src = nextImageSrc;
        currentIndex = (currentIndex + 1) % alternateImageSrcArray.length;
    }

    setInterval(changeImage, intervalTime);
});

// For Nav only Appear when scrolling up and Skills Animation
document.addEventListener("DOMContentLoaded", function () {
    /*const navBar = document.getElementById("mainNav");
    let prevScrollPos = window.pageYOffset;

    // Update the navigation bar visibility on scroll
    window.addEventListener("scroll", function () {
        const currentScrollPos = window.pageYOffset;
        
        if (prevScrollPos > currentScrollPos) {
            // Scrolling up
            navBar.style.top = "0";
        } else {
            // Scrolling down
            navBar.style.top = `-${navBar.offsetHeight}px`;
        }

        prevScrollPos = currentScrollPos;
    });*/

    const skillSections = document.querySelectorAll(".skill-progress");

    const options = {
        threshold: 0.5, // Trigger when 50% of the element is in view
    };

    function handleIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target, true); // Start animation
            } else {
                animateProgressBar(entry.target, false); // Reverse animation
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe each skill section
    skillSections.forEach((skillSection) => {
        observer.observe(skillSection);
    });

    // Function to animate the progress bar
    function animateProgressBar(skillSection, startAnimation) {
        const progressBar = skillSection.querySelector(".progress-bar");

        // Get the target width from the 'data-progress' attribute
        const targetWidth = parseFloat(progressBar.getAttribute("data-progress"));

        // Initial width of the progress bar
        let currentWidth = parseFloat(progressBar.style.width) || 0;

        // Define the direction of the animation (increase or decrease)
        const direction = startAnimation ? 1 : -1;

        // Animate the progress bar width
        const animationInterval = setInterval(() => {
            currentWidth += direction; // You can adjust the step size for a smoother or faster animation
            progressBar.style.width = currentWidth + "%";

            if ((direction === 1 && currentWidth >= targetWidth) || (direction === -1 && currentWidth <= 0)) {
                clearInterval(animationInterval);
            }
        }, 10); // interval for a smoother or faster animation
    }

});
