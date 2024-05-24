// window.addEventListener('load', function() {
//   document.body.classList.remove('no-transition');
// });

// document.addEventListener('DOMContentLoaded', function() {
//   // Use a timeout to ensure all rendering and CSS application has been done
//   setTimeout(function() {
//     document.body.classList.remove('no-transition');
//   }, 100); // 100ms should be enough, adjust if needed
// });

// document.addEventListener('DOMContentLoaded', function() {
//   // setThemeBasedOnSystemPreference();

//   // Use a timeout to ensure all rendering and CSS application has been done
//   setTimeout(function() {
//     // Add the transition property to every element
//     const elements = document.querySelectorAll('body, body *');
//     elements.forEach(element => {
//       element.style.transition = 'background-color 0.5s, color 0.5s';
//     });
//   }, 100); // 100ms should be enough, adjust if needed
// });

// function addThemeClass(element) {
//   if (document.body.classList.contains('light-theme')) {
//     element.classList.add('light-theme');
//   } else if (document.body.classList.contains('dark-theme')) {
//     element.classList.add('dark-theme');
//   }
// }

document.getElementById('theme-toggle').addEventListener('click', function() {
  var button = this;
  var icon = button.querySelector('i');
  var body = document.body;
  if (body.classList.contains('dark-theme')) {
    body.classList.toggle('dark-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    body.classList.toggle('dark-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
  // const elements = document.querySelectorAll('body, #header, #chat-container, .user-message, .bot-message, #user-input, #prompt-button, #clear-history');
  // const elements = document.querySelectorAll('body, body *');

  // elements.forEach(element => {
  //   const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   const lightThemeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  //   // element.classList.toggle('light-theme');
  //   element.classList.toggle('dark-theme');
  //   if (lightThemeMediaQuery.matches) {
  //     element.classList.add('light-theme');
  //     element.classList.remove('dark-theme');
  //   } else if (darkThemeMediaQuery.matches) {
  //     element.classList.add('dark-theme');
  //     element.classList.remove('light-theme');
  //   }
  // });
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
  
  // if (icon.classList.contains('fa-sun')) {

  // } else {

  // }
});

// function toggleDarkTheme() {
//   const elements = document.querySelectorAll('body, #chat-container, .user-message, .bot-message, #user-input, #prompt-button, #clear-history');

//   elements.forEach(element => {
//     element.classList.toggle('dark-theme');
//   });
// }

// document.body.classList.add('light-theme');
function setThemeBasedOnSystemPreference() {
  // const elements = document.querySelectorAll('body, body *');

  if (window.matchMedia) {
    const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightThemeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  
    // const applyTheme = () => {
    //   if (darkThemeMediaQuery.matches) {
    //     // document.documentElement.className = 'dark-theme';
    //     document.documentElement.classList.add('dark-theme');
    //   } else if (lightThemeMediaQuery.matches) {
    //     // document.documentElement.className = 'light-theme';
    //     document.documentElement.classList.add('light-theme');

    //   }
    // };

    const elements = document.querySelectorAll('body, body *');

  elements.forEach(element => {
    // element.classList.toggle('light-theme');
    // element.classList.toggle('dark-theme');
    if (document.body.classList.contains('light-theme')) {
      element.classList.add('light-theme');
      element.classList.remove('dark-theme');
    } else if (document.body.classList.contains('dark-theme')) {
      element.classList.add('dark-theme');
      element.classList.remove('light-theme');
    }
  });
  
    // Apply the theme when the page loads
    applyTheme();
  
    // Re-apply the theme whenever the user changes their system color theme
    darkThemeMediaQuery.addEventListener('change', applyTheme);
    lightThemeMediaQuery.addEventListener('change', applyTheme);
  }
}


const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDarkScheme.matches) {
  document.body.classList.add('dark-theme');
}
// Call the function when the page loads
// setThemeBasedOnSystemPreference();