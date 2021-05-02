/**
 * @file Static website using API
 */


/**
 * @async fettchApi 
 * @param {*} url
 * @description - This async/await function will return a json file of url  
 */
async function fetchApis(url){
    const response = await fetch(url);
    const profileJSON = await response.json();  
    const users = profileJSON.results.map( async (person) => {
        return {...person};
      });
    return Promise.all(users);
}
/**
 * @fetch 
 * @description - This will call the api and display 12 users
 */
fetchApis('https://randomuser.me/api/?results=12')
    .then(person =>  {
        createGallery(person);
        myClick(person);
        mySearch(person);
    })

/**
 * @function createSearchbar
 * @description - this will create a search bar in the upper right hand corner 
 */
function createSearchbar(){
    const searchContainer = document.querySelector('.search-container');

    const containerInnerHtml = `                        
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `
    searchContainer.insertAdjacentHTML('beforeend', containerInnerHtml)
    }
createSearchbar()

/**
 * @function createGallery
 * @param {*} data 
 * @description -This will manipulate the DOM to print the API elements in the correct spot
 */

function createGallery(data){
   
    data.map(person=> {
       
            const gallery = document.querySelector('.gallery');
            const galleryInnerHtml = `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${person.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                    </div>
                </div>
                ` 
                gallery.insertAdjacentHTML('beforeend', galleryInnerHtml)
             
          
    })
}
/**
 * @function createModalContainer
 * @param {*} persons 
 * @description - This will create a modal card when user is selected
 */
function createModalContainer(persons){
        const gallery = document.querySelector('.gallery')
        const modalInnerHtml = `
        <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${persons.picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${persons.name.first} ${persons.name.last}</h3>
                            <p class="modal-text">${persons.email}</p>
                            <p class="modal-text cap">${persons.location.city}</p>
                            <hr>
                            <p class="modal-text">${persons.phone}</p>
                            <p class="modal-text">${persons.location.street.number} ${persons.location.street.name}, ${persons.location.state}, ${persons.nat} ${persons.location.postcode}</p>
                            <p class="modal-text">Birthday: ${persons.dob.date}</p>
                        </div>
                    </div>

                    // IMPORTANT: Below is only for exceeds tasks 
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>
        `
    gallery.insertAdjacentHTML('afterend', modalInnerHtml)
    
    const closeBtn = document.querySelector('#modal-close-btn');
    const modalContainer = document.querySelector('.modal-container');
    // Used to exit out a card
    closeBtn.addEventListener('click', e =>{
        modalContainer.style.display = 'none'
    })
}

/**
 * @function myClick
 * @param {*} callback 
 * @description - This will call the createModalContainer function when you select a user
 */
function myClick(callback){
    const cards = document.querySelectorAll('.card')
    for(let i = 0; i<cards.length; i++){
        cards[i].addEventListener('click', () =>{
             createModalContainer(callback[i])  
        })
    }
}     
