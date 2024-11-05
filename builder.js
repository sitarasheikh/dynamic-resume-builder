// Initialize selected template
let selectedTemplate = 'template1';

// Navigation to Resume Builder
function startResumeBuilder() {
    window.location.href = "resume-builder.html";
}

// Add Skill
function addSkill() {
    const skillsSection = document.getElementById('skills');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Skill';
    input.classList.add('skill-input');
    skillsSection.appendChild(input);

    input.addEventListener('input', updatePreview);
}

// Add Experience
function addExperience() {
    const experiencesSection = document.getElementById('experiences');
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Job Title';
    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.placeholder = 'Describe your experience...';
    
    experiencesSection.appendChild(titleInput);
    experiencesSection.appendChild(descriptionTextarea);

    titleInput.addEventListener('input', updatePreview);
    descriptionTextarea.addEventListener('input', updatePreview);
}

// Add Education
function addEducation() {
    const educationSection = document.getElementById('education');
    const degreeInput = document.createElement('input');
    degreeInput.type = 'text';
    degreeInput.placeholder = 'Degree';
    const institutionInput = document.createElement('input');
    institutionInput.type = 'text';
    institutionInput.placeholder = 'Institution';

    educationSection.appendChild(degreeInput);
    educationSection.appendChild(institutionInput);

    degreeInput.addEventListener('input', updatePreview);
    institutionInput.addEventListener('input', updatePreview);
}

// Select Template and Apply Style to Preview
function selectTemplate(template) {
    selectedTemplate = template;
    const previewElement = document.getElementById('resume-preview');
    previewElement.className = '';
    previewElement.classList.add(`${template}-preview`);
}

// Update Preview Content
function updatePreview() {
    document.getElementById('preview-name').textContent = document.getElementById('name').value;
    document.getElementById('preview-email').textContent = document.getElementById('email').value;
    document.getElementById('preview-contact').textContent = document.getElementById('contact').value;
    document.getElementById('preview-careerObjective').textContent = document.getElementById('careerObjective').value;

    const skillInputs = document.querySelectorAll('#skills .skill-input');
    const previewSkills = document.getElementById('preview-skills');
    previewSkills.innerHTML = '';
    skillInputs.forEach(input => {
        if (input.value) {
            const li = document.createElement('li');
            li.textContent = input.value;
            previewSkills.appendChild(li);
        }
    });

    const experienceInputs = document.querySelectorAll('#experiences input, #experiences textarea');
    const previewExperience = document.getElementById('preview-experience');
    previewExperience.innerHTML = '';
    for (let i = 0; i < experienceInputs.length; i += 2) {
        const jobTitle = experienceInputs[i].value;
        const jobDescription = experienceInputs[i + 1].value;
        if (jobTitle || jobDescription) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${jobTitle}</strong><br>${jobDescription}`;
            previewExperience.appendChild(li);
        }
    }

    const educationInputs = document.querySelectorAll('#education input');
    const previewEducation = document.getElementById('preview-education');
    previewEducation.innerHTML = '';
    for (let i = 0; i < educationInputs.length; i += 2) {
        const degree = educationInputs[i].value;
        const institution = educationInputs[i + 1].value;
        if (degree || institution) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${degree}</strong> - ${institution}`;
            previewEducation.appendChild(li);
        }
    }
}

// Display Uploaded Profile Picture
function displayProfilePicture(event) {
    const profilePictureDisplay = document.getElementById('profile-picture-display');
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePictureDisplay.innerHTML = `<img src="${e.target.result}" alt="Profile Picture" class="rounded-picture">`;
        };
        reader.readAsDataURL(file);
    }
}

// Download PDF using html2pdf
const downloadButton = document.getElementById('download-pdf');

downloadButton.addEventListener('click', function () {
    const element = document.getElementById('resume-preview');
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(opt).save();
});
