// Get data from localStorage
let get_profile = JSON.parse(localStorage.getItem('profile'));
let get_skills = JSON.parse(localStorage.getItem('skills'));
let get_interests = JSON.parse(localStorage.getItem('interests'));
let get_education = JSON.parse(localStorage.getItem('education'));
let get_experience = JSON.parse(localStorage.getItem('experience'));

// Get variables from dom
const fullname = document.querySelector('.fullname');
const occupation = document.querySelector('.occupation');
const phone_no = document.querySelector('.phone');
const user_email = document.querySelector('.email');
const user_address = document.querySelector('.address');
const bio = document.querySelector('.bio');
const skills = document.querySelector('.skill-container');
const education = document.querySelector('.education-inner-con');
const experience = document.querySelector('.experience-inner-con');
const hobbies = document.querySelector('.hobbies-inner-con');


// display values on view
fullname.textContent = `${get_profile['firstname']} ${get_profile['lastname']}`;
occupation.textContent = get_profile['occupation'];
phone_no.textContent = get_profile['phone'];
user_email.textContent = get_profile['email'];
user_address.textContent = get_profile['location'];
bio.textContent = get_profile['intro_text']


// get user skills
get_skills['skills'].forEach(element => {
    let inner = document.createElement('p');
    inner.textContent += `${element}`
    skills.append(inner);
});


//Get Education
for(let i in get_education['colleges']) {
    let institution = document.createElement('ul');
    institution.innerHTML += `<li>
                                    <div class="date mt-2 mb-2">${get_education['enddates'][i]} - ${get_education['stardates'][i]}</div> 
                                    <div class="info">
                                        <p class="college">${get_education['courses'][i]}</p>
                                        <p class="course">${get_education['colleges'][i]}</p>
                                    </div>
                                </li>
                                `
    education.append(institution)
}

//Get Occupation
for(let i in get_experience['occupations']) {
    let institution = document.createElement('ul');
    institution.innerHTML += `
                                <li>
                                <div class="date mt-2 mb-2">${get_experience['enddates'][i]} - ${get_experience['stardates'][i]}</div> 
                                    <div class="info">
                                        <p class="work-occupation">${get_experience['companies'][i]}</p> 
                                        <p class="work-occupation">${get_experience['occupations'][i]}</p> 
                                        <p>${get_experience['description'][i]}</p>
                                    </div>
                                </li>
                                `
    experience.append(institution)
}

// get user hobbies
get_interests['interests'].forEach(element => {
    let inner = document.createElement('p');
    inner.textContent += `${element}`
    hobbies.append(inner);
});




document.querySelector('.btn').addEventListener('click', generatePDF())

function generatePDF() {
    // Choose the element that your CV is rendered in.
    let element = document.querySelector('.container');
    // // Choose the element and save the PDF for our user.
    var opt = {
        margin: 0.5,
        filename:     'my_cv.pdf',
        html2canvas:  { scale: 10 }
      };
      
    //   // New Promise-based usage:
      html2pdf().set(opt).from(element).save();
}
