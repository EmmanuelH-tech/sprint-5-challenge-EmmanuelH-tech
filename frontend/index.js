async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.
  const axios = require('axios');

  let mentors = [] // fix this
  let learners = [] // fix this

async function getData() {
  try {
    const [mentorsResponse , learnerResponse] = await Promise.all([
      axios.get('your_mentor_api_endpoint'),
      axios.get('your_learner_api_endpoint')
    ]);
    mentors = mentorsResponse.data;
    learners = learnerResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
getData();

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  function combineLearnersAndMentors() {
    learners = learners.map(learner => {
      const mentorNames = learner.mentors.map(id => {
        const mentor = mentors.find(mentor => mentor.id === id);
        return `${mentor.firstName} ${mentor.lastName}`;
      });
      return { ...learner, mentors: mentorNames };
    });
  }
  

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')

    // 👆 ==================== TASK 3 END ====================== 👆
    function createLearnerCards() {
      const cardsContainer = document.querySelector('.cards');
      const info = document.querySelector('.info');
      info.textContent = 'No learner is selected';
    
      learners.forEach(learner => {
        const card = document.createElement('div');
        card.className = 'card';
    
        const heading = document.createElement('h3');
        heading.textContent = learner.fullName;
        card.appendChild(heading);
    
        const email = document.createElement('div');
        email.className = 'email';
        email.textContent = learner.email;
        card.appendChild(email);
    
        const mentorsHeading = document.createElement('h4');
        mentorsHeading.textContent = 'Mentors';
        mentorsHeading.className = 'closed';
        card.appendChild(mentorsHeading);
    
        const mentorsList = document.createElement('ul');
        mentorsList.style.display = 'none'; // Initially hidden
    
        learner.mentors.forEach(mentorName => {
          const li = document.createElement('li');
          li.textContent = mentorName;
          mentorsList.appendChild(li);
        });
    
        card.appendChild(mentorsList);
        card.dataset.fullName = learner.fullName;
        cardsContainer.appendChild(card);
    
        card.addEventListener('click', evt => {
          const mentorsHeading = card.querySelector('h4');
          const didClickTheMentors = evt.target === mentorsHeading;
          const isCardSelected = card.classList.contains('selected');
    
          document.querySelectorAll('.card').forEach(crd => {
            crd.classList.remove('selected');
            crd.querySelector('h3').textContent = crd.dataset.fullName;
          });
          info.textContent = 'No learner is selected';
    
          if (!didClickTheMentors) {
            if (!isCardSelected) {
              card.classList.add('selected');
              heading.textContent += `, ID ${learner.id}`;
              info.textContent = `The selected learner is ${learner.fullName}`;
            }
          } else {
            card.classList.add('selected');
            if (mentorsHeading.classList.contains('open')) {
              mentorsHeading.classList.replace('open', 'closed');
              mentorsList.style.display = 'none';
            } else {
              mentorsHeading.classList.replace('closed', 'open');
              mentorsList.style.display = 'block';
            }
            if (!isCardSelected) {
              heading.textContent += `, ID ${learner.id}`;
              info.textContent = `The selected learner is ${learner.fullName}`;
            }
          }
        });
      });
    
      const footer = document.querySelector('footer');
      const currentYear = new Date().getFullYear();
      footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
    }
    


      
      
    
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
