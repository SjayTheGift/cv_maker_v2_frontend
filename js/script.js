

// Variables
const edu_add_more = document.querySelector('.edu-add-more');
const exp_add_more = document.querySelector('.exp-add-more');
const profile_next = document.querySelector('.pro-next ');
const education_next = document.querySelector('.edu-next');
const exp_next = document.querySelector('.exp-next');
const skill_next = document.querySelector('.skill-next');
const hooby_submit = document.querySelector('.hooby-submit');
const all_progress_inner = document.querySelectorAll('.progress-inner')
const all_sections = document.querySelectorAll('section');

const previous = document.querySelectorAll('.previous');

//Form variables
const pro_form = document.querySelector('.pro-form');
const edu_form = document.querySelector('.edu-form');
const exp_form = document.querySelector('.exp-form');
const skills_form = document.querySelector('.skill-form');
const hoobies_form = document.querySelector('.hoob-form');


//Form variables
const pro_form_label = document.querySelector('.pro-form > .form-container');
const edu_form_label = document.querySelector('.edu-form > .form-container');
const exp_form_label = document.querySelector('.exp-form > .form-container');
const skills_form_label = document.querySelector('.skill-form > label');
const hoobies_form_label = document.querySelector('.hoob-form > label');

// Container variables
const pro_container = document.querySelector('.pro-container');
const edu_container = document.querySelector('.edu-container');
const exp_container = document.querySelector('.exp-container');
const skill_container = document.querySelector('.skill-container');
const hooby_container = document.querySelector('.hooby-container');


//Add progress bar to each section
all_progress_inner.forEach(inner => {
    let percent = inner.getAttribute('percent');
    inner.style.width = percent+'%';
})


// Previous Btn

previous.forEach( prev => {
    let sections = prev.parentElement.parentElement.parentElement;
    let current = sections.classList.contains('active');
    console.log(current)


    prev.addEventListener('click', e =>{
        e.preventDefault();
        
        if(!current){
           sections.previousElementSibling.classList.add('active');
            sections.classList.remove('active')
        }
    })

})

// Profile next button
profile_next.addEventListener('click', (e) =>{
    e.preventDefault();

    let fname = document.querySelector('.fname');
    let lname = document.querySelector('.lname');
    let phone = document.querySelector('.phone');
    let email = document.querySelector('.email');
    let location = document.querySelector('.location');
    let occupation = document.querySelector('.occupation');
    let intro_text = document.querySelector('.intro');

    if(fname.value === '' || lname.value === '' || phone.value === '' || email.value === '' || location.value === '' || occupation.value === '' || intro_text.value ===''){
        alertMsg(pro_form, pro_form_label, 'error', 'All fields are required.');
        // getBorderError([fname, lname, phone, email, location, occupation, intro_text]);
    }
    else if (!validateEmail(email.value)){
        alertMsg(pro_form, pro_form_label, 'error', 'Please Enter valid email address.');
    }else{
        const profile = {
            'firstname': fname.value,
            'lastname': lname.value,
            'phone': phone.value,
            'email': email.value,
            'location': location.value,
            'occupation': occupation.value,
            'intro_text': intro_text.value
        }
    
        localStorage.setItem('profile', JSON.stringify(profile));

        //Hide profile section and display education section 
        pro_container.classList.remove('active');
        edu_container.classList.add('active');
    }
});


// Education next button
education_next.addEventListener('click', (e)=>{
    e.preventDefault();
    let colleges = document.querySelectorAll('.college');
    let courses = document.querySelectorAll('.course');
    let start_date = document.querySelectorAll('.startDate');
    let end_date = document.querySelectorAll('.endDate');

    if(loadData(courses).includes('') || loadData(colleges).includes('')  || loadData(start_date).includes('') || loadData(end_date).includes('')  ){
        alertMsg(edu_form, edu_form_label, 'error', 'All fields are required.')
    }else if(filterDate(start_date, end_date) === true){
        alertMsg(edu_form, edu_form_label, 'error', 'End-date can not be greather than start-date');
    }else{
        let start_date_arr = loadData(start_date);
        let end_date_arr = loadData(end_date)
        let course_arr = loadData(courses);
        let college_arr = loadData(colleges)
        let education = {
            'courses': course_arr,
            'colleges': college_arr,
            'stardates': start_date_arr,
            'enddates': end_date_arr
        }

        localStorage.setItem('education', JSON.stringify(education))

        //Hide education section and display experience section 
        edu_container.classList.remove('active');
        exp_container.classList.add('active');
    }
    
});


// Experience next button
exp_next.addEventListener('click', (e) =>{
    e.preventDefault();

    let exp_start_date = document.querySelectorAll('.expStartDate');
    let exp_end_date = document.querySelectorAll('.expEndDate');
    let companies = document.querySelectorAll('.company');
    let occupations = document.querySelectorAll('.exp-occupation');
    let description = document.querySelectorAll('.description');


    if(loadData(occupations).includes('') || loadData(companies).includes('') || loadData(description).includes('')  || loadData(exp_start_date).includes('') || loadData(exp_end_date).includes('')  ){
        alertMsg(exp_form, exp_form_label, 'error', 'All fields are required.')
    }else if(filterDate(exp_start_date, exp_end_date) === true){
        alertMsg(exp_form, exp_form_label, 'error', 'End-date can not be greather than start-date');
    }else{
        let start_date_arr = loadData(exp_start_date);
        let end_date_arr = loadData(exp_end_date)
        let companies_arr = loadData(companies);
        let occupation_arr = loadData(occupations)
        let description_arr = loadData(description)

        let experience = {
            'occupations': occupation_arr,
            'companies': companies_arr,
            'description': description_arr,
            'stardates': start_date_arr,
            'enddates': end_date_arr
        }

        localStorage.setItem('experience', JSON.stringify(experience))

        //Hide experience section and display skills section 
        exp_container.classList.remove('active');
        skill_container.classList.add('active');
    }

    
    
});


// Skills next button
skill_next.addEventListener('click', (e) =>{
    e.preventDefault();
    let skill_textarea = document.querySelector('.skills');

    if(skill_textarea.value === ''){
        alertMsg(skills_form, skills_form_label,'error', 'Text-area field is required.');
    }else{
        
        let skills = {
            'skills': skill_textarea.value.split(',')
        }

        localStorage.setItem('skills', JSON.stringify(skills));

        //Hide skills section and display hoobies section 
        skill_container.classList.remove('active');
        hooby_container.classList.add('active');
    }
});


// Hobbies next button
hooby_submit.addEventListener('click', (e) =>{
    e.preventDefault();
    
    let interest_textarea = document.querySelector('.hoobies');


    if(interest_textarea.value === ''){
        alertMsg('error', 'Interest field is required.');
    }else{
        
        let interests = {
            'interests': interest_textarea.value.split(',')
        }

        localStorage.setItem('interests', JSON.stringify(interests));
         // hide section 
        hooby_container.classList.remove('active');
            
        //show next section
        window.location.href = 'cv.html';
    }
});


edu_add_more.addEventListener('click', (e)=>{
    e.preventDefault();
    let div = document.createElement('div');

    div.setAttribute('class', 'form-container mt-2 mb-1');
    div.innerHTML = `
                    <div class="form-group">
                        <label for="college" class="mb-1">Institution:</label>
                        <input type="text"  name="college" class="input college">
                    </div>
    
                    <div class="form-group">
                        <label for="course" class="mb-1">Course:</label>
                        <input type="text"  name="course" class="input course">
                    </div>
    
                    <div class="form-group">
                        <label for="startDate" class="mb-1">Start Date:</label>
                        <input type="date" name="startDate" class="input startDate">
                    </div>
    
                    <div class="form-group">
                        <label for="endDate" class="mb-1">End Date:</label>
                        <input type="date" name="endDate" class="input endDate">
                    </div>
    `
    edu_form.append(div);
});

exp_add_more.addEventListener('click', (e)=>{
    e.preventDefault();
    let div = document.createElement('div');
    let div_2 = document.createElement('div')
    div.setAttribute('class', 'form-container mt-2 mb-1');

    div.innerHTML = `
    <div class="form-group">
        <label for="company" class="mb-1">Company:</label>
        <input type="text" name="company" class="input company">
    </div>

    <div class="form-group">
        <label for="occupation" class="mb-1">Occupation:</label>
        <input type="text" name="occupation" class="input exp-occupation">
    </div>

    <div class="form-group">
        <label for="startDate" class="mb-1">Start Date:</label>
        <input type="date" name="startDate" class="input expStartDate">
    </div>

    <div class="form-group mb-1">
        <label for="endDate" class="mb-1">End Date:</label>
        <input type="date"  name="endDate" class="input expEndDate">
    </div>
    `

    div_2.innerHTML = `
        <label for="description">Description:</label>
         <textarea name="description" class="description" cols="30" rows="10"></textarea>
    `

    exp_form.append(div, div_2);
});



function loopData(list_data){
    const arr = []
    list_data.forEach(data =>{
        arr.push(data.value)
    })
    return arr
}

// filter date and check if  startdate is greater than enddate or return an error message.
function filterDate(list_1, list_2){

    let arr_start_date = loadData(list_1)
    let arr_end_date = loadData(list_2)

    console.log(arr_start_date)
    // console.log(arr_end_date)


    var results = false;
    arr_start_date.forEach((start, index) =>{
        if(Date.parse(arr_end_date[index]) <= Date.parse(start)){
            console.log(arr_end_date[index])
            // alertMsg(form, label, 'error', 'End-date can not be greather than start-date.')
        results = true
        }
    })

   return results

    // for(let i in arr_start_date){
    //     console.log(i)
    //     console.log(arr_end_date[i])

    //     if(Date.parse(arr_end_date[i]) <= Date.parse(arr_start_date[i])){
    //         // console.log(arr_end_date[i])
    //         console.log('eerror')
    //     //   return true;
    //       break;
    //     }else{
    //         return {
    //             'startdate':[arr_start_date],
    //             'enddate': [arr_end_date]
    //          };
    //     }
        
    // }
 
 }



// Validate Email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Load data and return it in a array
function loadData(user_input_list){
    let data = []
    user_input_list.forEach( user_input =>{   
        data.push(user_input.value)    
    })
    return data;
}

// Get border errors for all
function getBorderError(lists =[]){
    for(let i in lists){
        lists[i].forEach(list=>{
            list.style.border = '1px solid red';

            setTimeout(() => {
                list.style.border = '1px solid black';
            }, 3000);
        })
    }
}


// alert message

function alertMsg(form, label, msg_type, msg){
    let newField = document.createElement('div');
    newField.innerHTML = `
        <p class='${msg_type} mb-2'> ${msg}</p>
    `
    form.insertBefore(newField, label)

    setTimeout(() => {
        newField.style.display = 'none';
    }, 3000);
}
