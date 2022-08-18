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
const education = document.querySelector('.education-container');
const experience = document.querySelector('.experience');
const hobbies = document.querySelector('.hobbies-container');


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
for(let i in get_education['courses']){

    console.log(i)

    // let institution = document.createElement('div');
    // institution.setAttribute('class', 'institution mb-1');
    // institution.innerHTML += `
    //                         <p class="sidebar-year">${get_education['enddates'][i]} -- ${get_education['stardates'][i]}</p>
    //                         <p class="certificate light-bold">${get_education['courses'][i]}</p>
    //                         <p class="institute">${get_education['colleges'][i]}</p>
    //                         `
    // education.append(institution)
}