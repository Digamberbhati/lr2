document.getElementById('menu-toggle').addEventListener('click', function () {
  console.log("hello world")
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('hidden');
});


document.addEventListener("DOMContentLoaded", function () {
  let carousel = document.querySelector(".carousel");
  let items = carousel.querySelectorAll(".item");
  let dotsContainer = document.querySelector(".dots");

  // Insert dots into the DOM
  items.forEach((_, index) => {
    let dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  let dots = document.querySelectorAll(".dot");

  // Function to show a specific item
  function showItem(index) {
    items.forEach((item, idx) => {
      item.classList.remove("active");
      dots[idx].classList.remove("active");
      if (idx === index) {
        item.classList.add("active");
        dots[idx].classList.add("active");
      }
    });
  }

  // Event listeners for buttons
  document.querySelector(".prev").addEventListener("click", () => {
    let index = [...items].findIndex((item) =>
      item.classList.contains("active")
    );
    showItem((index - 1 + items.length) % items.length);
  });

  document.querySelector(".next").addEventListener("click", () => {
    let index = [...items].findIndex((item) =>
      item.classList.contains("active")
    );
    showItem((index + 1) % items.length);
  });

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      let index = parseInt(dot.dataset.index);
      showItem(index);
    });
  });
});


const counts = document.querySelectorAll('.count');
const speed = 97;

// Function to animate the count
function runCounter(counter) {
    function upDate() {
        const target = Number(counter.getAttribute('data-target'));
        const count = Number(counter.innerText);
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.floor(inc + count);
            setTimeout(upDate, 15);
        } else {
            counter.innerText = target;
        }
    }
    upDate();
}

// IntersectionObserver callback
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            runCounter(counter);  // Run the counter when the element is in view
            observer.unobserve(counter);  // Stop observing once the animation starts
        }
    });
}

// Set up IntersectionObserver
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5 // Adjust as needed (0.5 means 50% of the element needs to be visible)
});

counts.forEach(count => {
    observer.observe(count);  // Start observing each .count element
});