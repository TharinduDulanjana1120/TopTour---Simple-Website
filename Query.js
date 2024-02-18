function validateForm() {
  var rating = document.querySelector('input[name="rating"]:checked');
  var experience = document.querySelector('select[name="experience"]');
  var experienceError = document.getElementById('experienceError');

  if (!rating) {
    alert("The rating question is required");
    return false;
  }

  if (experience.value === "Select") {
    alert("The experience question is required");
    return false;
  }

  // Remove the selected option from the dropdown
  experience.options.selectedIndex = -1;

  alert("Thank you for taking the time to give us your feedback on our website!");
  window.open("mailto:TopTourTravels@gmail.com");
  window.location.href = "query.html";
  return false;
}