function showMenu(){
    document.getElementById('nav-list').classList.toggle('view')
  }
  
  function activePage(e){
    let children = document.getElementById('nav-list').children
    for(let i = 0; i< children.length; i++){
        children[i].classList.remove('active')
    }
    e.target.classList.add('active')
  }

const hoverEffect = e =>{
  for(const card of document.querySelectorAll('.skill-card')){
      const rect = card.getBoundingClientRect(),
          x = e.clientX-rect.left,
          y = e.clientY-rect.top;

      card.style.setProperty("--mouse-x",`${x}px`);
      card.style.setProperty("--mouse-y",`${y}px`);
  }
}

window.onload = () => {
  const containerSkills = document.getElementById('skills-container') ? document.getElementById('skills-container') : ''
  const containerAbout = document.getElementById('about-main') ? document.getElementById('about-main') : ''
  if(containerSkills !== '')
    containerSkills.classList.add('animate')
  if(containerAbout !== '')
    containerAbout.classList.add('animate')
}

