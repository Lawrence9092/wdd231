const courses = [
  { code: "CSE110", name: "Intro to Programming", credits: 2, prefix: "CSE", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, prefix: "CSE", completed: false },
  { code: "CSE210", name: "Programming with Classes", credits: 2, prefix: "CSE", completed: false },
  { code: "WDD130", name: "Web Fundamentals", credits: 2, prefix: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, prefix: "WDD", completed: true },
  { code: "WDD231", name: "Frontend Dev II", credits: 2, prefix: "WDD", completed: false }
];

const container = document.getElementById("courseContainer");
const totalCount = document.getElementById("totalCount");

function displayCourses(list) {
  container.innerHTML = "";
  list.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    div.classList.add(course.completed ? "completed" : "not-completed");
    div.innerHTML = `${course.completed ? "✓ " : ""}${course.code}`;
    container.appendChild(div);
  });
  totalCount.textContent = list.length;
}

displayCourses(courses);

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.prefix === "WDD")));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.prefix === "CSE")));
