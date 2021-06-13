// EmployeeS data

const employeeData = [
    {
        team: 'Engineering',
        employees: [
          'Lawana Fan',
          'Larry Rainer',
          'Rahul Malik',
          'Leah Shumway',
        ],
    },
    {
        team: 'Executive',
        employees: [
          'Rohan Gupta',
          'Ronda Dean',
          'Robby Maharaj',
        ]
    },
    {
        team: 'Finance',
        employees: [
          'Caleb Brown',
          'Carol Smithson',
          'Carl Sorensen',
        ],
    },
    {
        team: 'Sales',
        employees: [
          'Ankit Jain',
          'Anjali Maulingkar',
        ],
    },
]

// Modal Event handlers

const onboardModal = document.getElementById("onboardModal");
const onboardBtn = document.getElementById("onboardButton");

const teamSelectError = document.getElementById('error-team-select');
const employeeelectError = document.getElementById('error-employee-select');

onboardBtn.onclick = () => {
    populateDefaults();
    const employeeSelect = document.getElementById("employeeSelect");
    const teamSelect = document.getElementById("teamSelect");
    const welcomeMailCheckbox = document.getElementById("welcomeMail");
    teamSelect.value = '';
    employeeSelect.value = ''
    welcomeMailCheckbox.checked = false;
    onboardModal.style.display = "block";
}

// Populate initail values

populateDefaults = () => {
    let teamOptions = "<option value='' disabled selected>Select Team...</option>";
    let employeeOptions = "<option value='' disabled selected>Select Employee...</option>";
    for (const data of employeeData) {
        teamOptions += `<option>${data.team}</option>`;
        for (const employee of data.employees) {
            employeeOptions += `<option>${employee}</option>`;
        } 
    } 
    document.getElementById("teamSelect").innerHTML = teamOptions;
    document.getElementById("employeeSelect").innerHTML = employeeOptions;
}

populateDefaults();

// Select (dropdown) event handlers

onEmployeeSelect = (selectObject) => {
    const selectedGroup =  employeeData.find((group) => {
        for (const employee of group.employees) {
            if(employee === selectObject.value) return group;
        }
    })
    document.getElementById("teamSelect").value = selectedGroup.team;
}

onTeamSelect = (selectObject) => {
    let employeeOptions = "<option value='' disabled selected>Select Employee...</option>";
    for (const data of employeeData) {
        if(data.team !== selectObject.value) continue
        for (const employee of data.employees) {
            employeeOptions += `<option>${employee}</option>`;
        }
        break
    } 
    document.getElementById("employeeSelect").innerHTML = employeeOptions;
}


// Submit and Close event handler 

const submitBtn = document.getElementById('submitBtn');
const closeBtn = document.getElementById('modalCloseBtn');
const closeIcon = document.getElementById('closeIcon');



submitBtn.onclick = () => {
    const employeeValue = document.getElementById("employeeSelect").value;
    const teamValue = document.getElementById("teamSelect").value;
    const isWelcomeMailChecked = document.getElementById("welcomeMail").checked;
    teamValue ? teamSelectError.style.display = "none" : teamSelectError.style.display = "block";
    employeeValue ? employeeelectError.style.display = "none" : employeeelectError.style.display = "block";
    if(employeeValue && teamValue) {
       const onboardDetails = {
           name: employeeValue,
           team: teamValue,
           welcomeMail: isWelcomeMailChecked
       }
       makeEmployeeCard(onboardDetails);
       onboardModal.style.display = "none";
    }
}

closeBtn.onclick = () => onboardModal.style.display = "none";
closeIcon.onclick = () => onboardModal.style.display = "none";

// Make Employee Card

makeEmployeeCard = (onboardDetails) => {
    let checkboxValue = onboardDetails.welcomeMail ? "yes" : "no"
    const cardHtml = `<div class="card"><div class="list-item"><p class="list-label">Name:</p><p class="list-value">${onboardDetails.name}</p></div><div class="list-item"><p class="list-label">Team:</p><p class="list-value">${onboardDetails.team}</p></div><div><div class="list-item"><p class="list-label">Welcome Mail Required:</p><p class="list-value">${checkboxValue}</p></div><div>`;
    document.getElementById('employeeCardWrapper').style.display = "flex";
    document.getElementById('employeeCardWrapper').insertAdjacentHTML('beforeend', cardHtml);
}