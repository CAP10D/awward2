//locomotive js
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform
        ? "transform"
        : "fixed",
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
  locomotiveAnimation();
//navbar 
function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
      transform: "translateY(-100%)",
      scrollTrigger: {
        trigger: "#page1",
        scroller: ".main",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });
    
    gsap.to("#nav-part2 #links", {
      transform: "translateY(-100%)",
      opacity: 0,
      scrollTrigger: {
        trigger: "#page1",
        scroller: ".main",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });

  }
  navbarAnimation()
  
//mouse animation
function cursore() {
    var playbtn=document.querySelector('.play')
var videocon=document.querySelector('.video_container')
videocon.addEventListener('mouseenter',function () {
    gsap.to(playbtn,{
        opacity:1,
        scale:1,
    })
})
videocon.addEventListener('mouseleave',function () {
    gsap.to(playbtn,{
        opacity:0,
        scale:0,
    })
})
  videocon.addEventListener('mousemove', function (dets) {
        // Use getBoundingClientRect to account for LocomotiveScroll transformations
        const videoContainerRect = videocon.getBoundingClientRect(); //imp using locomotive

        gsap.to(playbtn, {
            left: dets.clientX - videoContainerRect.left -40,
            top: dets.clientY - videoContainerRect.top + 550,
        });
    });
}
cursore()

//loading text animation
function textanimation() {
    gsap.from(".page1 h1",{
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.5,
        stagger:0.2
    })
}
textanimation()
// cursor
function crsanim() {
    document.addEventListener('mousemove',function (dets) {
        gsap.to('.cursor',{
            left:dets.x,
            top:dets.y
        })
    })
    
    document.querySelectorAll('.child').forEach(function (elm) {
        elm.addEventListener('mouseenter',function(){
            gsap.to('.cursor',{
                transform: 'translate(-50%,-50%) scale(1)',
                opacity:1
            })
        })
        elm.addEventListener('mouseleave',function(){
            gsap.to('.cursor',{
                transform: 'translate(-50%,-50%) scale(0)',
                opacity:0
            })
        })
    })
}   
crsanim()

function btnsld_mesgsld() {
    const buttons = document.querySelectorAll('.bt');
const btnContainer = document.querySelector('.btn');
const sliderWrapper = document.querySelector('.slider-wrapper');

// Convert buttons to an array and remove the first button from cloning
const btnsArray = Array.from(buttons);
const cloneArray = btnsArray.slice(1); // Exclude the first button from clones

// Clone the buttons on both sides to create an infinite scroll effect
cloneArray.forEach(button => {
    const cloneStart = button.cloneNode(true);
    const cloneEnd = button.cloneNode(true);
    btnContainer.appendChild(cloneStart);
    btnContainer.insertBefore(cloneEnd, btnContainer.firstChild);
});

// Adjust the initial position to the "real" first button
let currentOffset = btnsArray[0].offsetLeft; // offset of the original first button
btnContainer.style.transform = `translateX(${-currentOffset}px)`;

document.querySelectorAll('.bt').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Remove the filled icon from any other buttons
        document.querySelectorAll('.bt i').forEach(icon => {
            icon.className = 'ri-circle-line';
        });

        // Change icon of the clicked button to filled
        const icon = button.querySelector('i');
        icon.className = 'ri-circle-fill';

        // Calculate the offset needed to center the clicked button in the slider
        const buttonRect = button.getBoundingClientRect();
        const wrapperRect = sliderWrapper.getBoundingClientRect();
        const offset = button.offsetLeft + buttonRect.width / 2 - wrapperRect.width / 2;
        btnContainer.style.transition = 'transform 0.5s ease';
        btnContainer.style.transform = `translateX(${-offset}px)`;

        // Adjust position if clicked on a cloned button
        setTimeout(() => {
            if (index < btnsArray.length - 1) { // If we clicked a clone at the start
                btnContainer.style.transition = 'none';
                btnContainer.style.transform = `translateX(${-currentOffset}px)`;
            } else if (index >= btnsArray.length + cloneArray.length) { // If we clicked a clone at the end
                btnContainer.style.transition = 'none';
                btnContainer.style.transform = `translateX(${-currentOffset}px)`;
            }
        }, 500); // After animation completes

       
    });
});

const messages = document.querySelectorAll('.msg');

// Add click event to each button
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all messages to hide them
    messages.forEach(msg => msg.classList.remove('active'));

    // Add 'active' class to the corresponding message
    const selectedMsg = document.querySelector(`#msg${index + 1}`);
    selectedMsg.classList.add('active');

    // Apply GSAP animation only to '.line' elements within the selected message
    const lines = selectedMsg.querySelectorAll('.line');
    gsap.from(lines, {
      y: 100,
      opacity: 0,
      delay: 0.1,   // Reduced delay for faster animation start
      duration: 0.3,
      stagger: 0.2  // Animates each line sequentially within the selected message
    });
  });
});

// Select all buttons and messages
// const messages = document.querySelectorAll('.msg');

// Add click event to each button
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all messages
    messages.forEach(msg => msg.classList.remove('active'));

    // Add 'active' class to the corresponding message
    const selectedMsg = document.querySelector(`#msg${index + 1}`);
    selectedMsg.classList.add('active');
  });
});

}
btnsld_mesgsld()
function message() {
  // Select elements once and store them in variables
  const secbx = document.querySelector('.secbx');
  const para = document.querySelector('.para');
  const fisbx = document.querySelector('.fisbx');
  const sendmsgButton = document.querySelector('.sendmsg button');

  // Event listener for 'secbx' click
  secbx.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    secbx.style.zIndex = '10';
    para.style.zIndex = '10';
    para.style.opacity = '0'; // Hide para text
    fisbx.style.zIndex = '99';

    // Animate 'fisbx' expanding and setting opacity to 1
    gsap.to(fisbx, {
      height: '60vh',
      opacity: 1,
      duration: 0.2 // smooth transition duration
    });
  });

  // Event listener for 'sendmsg' button click
  sendmsgButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    secbx.style.zIndex = '99';
    para.style.zIndex = '99';
    para.style.opacity = '0'; // Hide para text
    fisbx.style.zIndex = '10';

    // Animate 'fisbx' collapsing and setting opacity to 0
    gsap.to(fisbx, {
      height: '10vh',
      opacity: 0,
      duration: 0.2 // smooth transition duration
    });
  });

  // Event listener for clicking outside of .fisbx and .secbx
  document.addEventListener('click', function (event) {
    // Check if the clicked target is not .fisbx or .secbx
    if (!fisbx.contains(event.target) && !secbx.contains(event.target)) {
      // Reset styles and reverse animation
      secbx.style.zIndex = '99';
      para.style.zIndex = '99';
      para.style.opacity = '1'; // Show para text when collapsing
      fisbx.style.zIndex = '10';

      // Animate 'fisbx' collapsing and setting opacity to 0
      gsap.to(fisbx, {
        height: '10vh',
        opacity: 0,
        duration: 0.2 // smooth transition duration
      });
    }
  });
}

// Call the function to initialize event listeners
message();

function footer() {
  gsap.to('.page7 svg', {
    scale: 1,
    opacity: 1,
    duration:0.7,
    rotate:'0deg',
    scrollTrigger: {
      scroller: '.main',
      trigger: '.page7',
      start: "top 80%", // Start when .page7 top enters 80% down the viewport
      end: "bottom 50%",
    }
  });
}
footer();

// ************************email
function email() {
  const ftinput = document.querySelector('.footer1 input');
  const fticon = document.querySelector('.footer1 i');
  const footer = document.querySelector('.footer1');

  // Placeholder and icon class names for toggling
  const originalPlaceholder = "enter your email address for good";
  const originalIconClass = "ri-arrow-right-line";
  const changedIconClass = "ri-corner-down-left-line";

  footer.addEventListener('click', function() {
    // Toggle between the initial and changed states
    if (ftinput.placeholder === originalPlaceholder) {
      ftinput.placeholder = "";
      fticon.className = changedIconClass;
    } else {
      ftinput.placeholder = originalPlaceholder;
      fticon.className = originalIconClass;
    }
  });

  // Listen for Enter key press to toggle back to original state
  ftinput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      ftinput.value = ""; 
      // Reverse changes when Enter is pressed
      ftinput.placeholder = originalPlaceholder;
      fticon.className = originalIconClass;
    }
  });
}

email();
// menu*****************
function toggleMenu(isMenu) {
  const menuIcon = document.querySelector('.ri-menu-fill');
  const cartIcon = document.querySelector('.ri-shopping-cart-2-line');
  const menuContainer = document.querySelector('.menu');
  let isOpen = false; // Flag to track menu state

  function updateMenuState(open) {
    if (open) {
      // Open menu
      menuIcon.className = 'ri-close-large-fill';
      cartIcon.className = 'ri-close-large-fill';

      // Animate menu open
      gsap.to(menuContainer, {
        height: '100vh',
        ease: Circ.easeInOut,
      });

      document.querySelector('#twogood').style.color = 'white';
      document.querySelector('#twogoodlogo').style.color = 'white';
      document.querySelector('#nav-part2 #icons').style.backgroundColor = 'black';
      document.querySelector('#icons i').style.color = 'white';
      document.querySelector('#links').style.color = 'white';

    } else {
      // Close menu
      menuIcon.className = 'ri-menu-fill';
      cartIcon.className = 'ri-shopping-cart-2-line';

      // Animate menu close
      gsap.to(menuContainer, {
        height: '0',
        ease: Circ.easeInOut,
      });

      document.querySelector('#twogood').style.color = 'black';
      document.querySelector('#twogoodlogo').style.color = 'black';
      document.querySelector('#nav-part2 #icons').style.backgroundColor = 'white';
      document.querySelector('#icons i').style.color = 'black';
      document.querySelector('#links').style.color = '#333';
    }
  }

  function handleClick() {
    isOpen = !isOpen;
    updateMenuState(isOpen);
  }

  // Add event listeners
  menuIcon.addEventListener('click', handleClick);
  cartIcon.addEventListener('click', handleClick);
}

toggleMenu();


