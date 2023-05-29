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