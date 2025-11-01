const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, prefix: "WDD", completed: true },
  { code: "WDD231", name: "Frontend Dev II", credits: 3, prefix: "WDD", completed: false },
  { code: "CSE110", name: "Intro to Programming", credits: 2, prefix: "CSE", completed: true }
];

function displayCourses(filteredCourses) {
  const container = document.getElementById("courseContainer");
  container.innerHTML = "";

  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.className = course.completed ? "course completed" : "course";
    div.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} credits</p>`;
    container.appendChild(div);
  });

  const total = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById("totalCredits").textContent = total;
}

displayCourses(courses);

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.prefix === "WDD")));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.prefix === "CSE")));
