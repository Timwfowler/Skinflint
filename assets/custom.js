
function initHeader(){
  let lastScrollTop = 0;

  const headerWrap = document.querySelector('.site-header')

  window.onscroll = function(e) {
    let st = window.pageYOffset;
    let stickBuy = document.querySelector('.sticky-buy')
    let allIcons = document.querySelectorAll('.site-nav__icons a')

    if (st > lastScrollTop && st > 60){
      headerWrap.classList.add('shrink')  

      if (stickBuy) {
        stickBuy.classList.add('active')
        allIcons.forEach((icon) => {
          icon.style.display = "none"
        })
        
      }
    } 
    if (st < 60){
      headerWrap.classList.remove('shrink')

      if (stickBuy) {
        stickBuy.classList.remove('active')

        allIcons.forEach((icon) => {
          icon.style.display = "flex"
        })
      }
    }
    lastScrollTop = st;
  }
}


function initMegaMenu(){
  const hamburger = document.querySelector('.btn-hamburger')
  const megWrap = document.querySelector('.mega-menu')
  let headerWrap = document.querySelector('#SiteHeader')
  let stickBuy = document.querySelector('.sticky-buy')

  let allIcons = document.querySelectorAll('.site-nav__icons a')

  hamburger.addEventListener('click', () => {

    if (!headerWrap.classList.contains('mega-menu--open')) {      
      headerWrap.classList.add('mega-menu--open')

      if (stickBuy) {
        stickBuy.classList.remove('active')

        allIcons.forEach((icon) => {
          icon.style.display = "flex"
        })
      }


    }else{

      if (stickBuy) {
        stickBuy.classList.add('active')

        allIcons.forEach((icon) => {
          icon.style.display = "none"
        })
      }


    headerWrap.classList.remove('mega-menu--open')
    }
  })

  //mobile menu

  const accordianBts = document.querySelectorAll('.mobile-nav-accordian-header')

  accordianBts.forEach((btn) => {

    btn.addEventListener('click', () =>{
      let ul = btn.parentNode.querySelector('ul')

      if (ul.classList.contains('active')) {
        ul.classList.remove('active')
      }else{
        ul.classList.add('active')
      }

      
    })

  })
}

function initSplitImage(){
  const dragToken = document.querySelector('.drag-token')
  const overlayImage = document.querySelector('.image-split__overlay')


  if(!overlayImage){
    return;
  }

  dragToken.addEventListener('mousedown', initDrag, false);
  dragToken.addEventListener('touchmove', initDrag, false);  



  function initDrag(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = startX  - overlayImage.left;
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
    document.addEventListener("touchmove", doDrag, false);
    document.addEventListener("touchend", stopDrag, false);
  }

  function doDrag(e) {
    //detect mobile drag
    if (e.targetTouches) {
      let touchLocation = e.targetTouches[0];
      let mousePos = overlayImage.getBoundingClientRect().left

      if((touchLocation.clientX - mousePos) > 0 && (touchLocation.clientX - mousePos) < 1400){
        overlayImage.style.width = (touchLocation.clientX - mousePos) + 'px';
        dragToken.style.left = (touchLocation.clientX - mousePos) + 'px';
      } 
    }else{

      let mousePos = overlayImage.getBoundingClientRect().left
      if((e.clientX - mousePos) > 0 && (e.clientX - mousePos) < 1400){
        overlayImage.style.width = (e.clientX - mousePos) + 'px';
        dragToken.style.left = (e.clientX - mousePos) + 'px';
      }
    }
  }

  function stopDrag(e) {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
  }
}


function init3dModelPDP(){
  const button = document.querySelector('.js-open-3d-model')
  const overlay = document.querySelector('.model-overlay')
  const popup = document.querySelector('.threed-model-modal')

  if (!button) {
    return;
  }


  //comment button to activate
  button.addEventListener('click', () => {
    overlay.classList.add('active')
    setTimeout(function() {
      popup.classList.add('active')
    }, 600);

    document.querySelector('.btn-model-close').addEventListener('click', () => {
      popup.classList.remove('active')
      setTimeout(function() {
        overlay.classList.remove('active')
      }, 100);
    })

    popup.addEventListener('click', function (event) {

      if (!event.target.closest('.threed-model-modal__inner')) {
          popup.classList.remove('active')
          setTimeout(function() {
            overlay.classList.remove('active')
          }, 100);
      }
    }, false);
  })

  const dragToken = document.querySelector('.drag-token')
  const images = document.querySelectorAll('.threed-model-modal__inner img')

  dragToken.addEventListener('mousedown', initDrag, false);
  dragToken.addEventListener('touchmove', initDrag, false); 
  images[parseInt(images.length / 2)].style.display = "block"    


  function initDrag(e) {

    startX = e.clientX;
    startY = e.clientY;
    // startWidth = startX  - overlayImage.left;
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
    document.addEventListener("touchmove", doDrag, false);
    document.addEventListener("touchend", stopDrag, false);
  }

  function doDrag(e) {
    //detect mobile drag



    let touch
    if (e.targetTouches) {
      touch = e.targetTouches[0].clientX
    }else{
      touch = e.clientX
    }

    let mousePos = dragToken.getBoundingClientRect().left
    let increments = 45 / images.length
 
    let pointPosition = touch - mousePos
    let wholeNums = parseInt(pointPosition / increments)
    let imagePositon = parseInt(images.length / 2 + wholeNums)




    if (imagePositon >= 0 && imagePositon <= images.length - 1) {
      images.forEach((img) => {
        img.style.display = "none"
      })
      images[imagePositon].style.display = "block"       
    } 
  }

  function stopDrag(e) {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
  }
}

function initYoutubePlay(){

  if (!document.querySelector('.dummy-hack-play')) {
    return;
  }


  document.querySelector('.dummy-hack-play').addEventListener('click', () => {


    var div = document.querySelector(".video-wrapper");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;

    document.querySelector('.dummy-hack-play').style.display = "none"
    document.querySelector('.video__placeholder').style.display = "none"

    
    iframe.postMessage('{"event":"command","func":"' + 'mute' + '","args":""}', '*');
    // iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');

    setTimeout(function(){
      iframe.postMessage('{"event":"command","func":"' + 'unMute' + '","args":""}', '*');
    }, 10);

  })

  setTimeout(function(){


    }, 4000);




}

function initBlogFiltersMobile(){
  const button = document.querySelector('.blog-landing-page__filter-list')
  const menu = document.querySelector('.blog-landing-page__filter-list ul')


  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
      menu.classList.remove('active')
    }else{
      menu.classList.add('active')
    }
  })
}





function initWishlist(){
  const wishlistBtns = document.querySelectorAll('.wish-list-btn')
  const wishCount = document.querySelector('.js-wish-count')
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []

  updateCount()

  

  function updateCount(){
    

    if (wishlist.length > 0) {
      wishCount.innerHTML = wishlist.length
    }else{
      wishCount.innerHTML = ""
    }
  }




  wishlistBtns.forEach((btn) => {
    let productHandle = btn.getAttribute('data-product-handle')

    wishlist.forEach((item) => {



      if (item == productHandle) {
        btn.classList.add('added')
      }
    })


    btn.addEventListener('click', (e) => { 
      if (btn.classList.contains('added')) {
        console.log('already addedc');
        btn.classList.remove('added')   
        let index = wishlist.indexOf(productHandle);
        if (index !== -1) {
          wishlist.splice(index, 1);
        }


        localStorage.setItem('wishlist', JSON.stringify(wishlist))  
        updateCount()    
        
        if (document.querySelector('#wishlist')) {
          console.log();
          btn.closest('.card').style.display = "none"
          
        }
        
        
      }else{
        console.log('Remove!');
        btn.classList.add('added')        
        wishlist.push(productHandle)
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
        updateCount()
      }
    })
  })
}

function initAnnouncementBar(){
  // $('.cc-announcement__item').css('opacity', '1')

  // $('.main-content').addClass('announcement-showing')



  const bar = document.querySelectorAll('.notice-banner__slide')




    let i = 0;    

    // bar.style.display = 'none'
    // bar.classList.remove('active') 
    bar.forEach((bar) => {
      // bar.style.display = "none"
      bar.classList.remove('active')
    })

    bar[i].style.display = "block"
    bar[i].classList.add('active')
    i++          

    function loopTheMessages() {         
      setTimeout(function() {   
        bar.forEach((bar) => {
          // bar.style.display = "none"
          bar.classList.remove('active')
        })
        bar[i].style.display = "block"
        bar[i].classList.add('active')    

        if (i < bar.length - 1) {  
          i++;           
          loopTheMessages();            
        }else{
          i= 0;
          loopTheMessages(); 
        }                   
      }, 4000)
    }

    loopTheMessages(); 



 
} 




initHeader()
initMegaMenu()
initSplitImage()
init3dModelPDP()
initBlogFiltersMobile()
initYoutubePlay()
initWishlist()
initAnnouncementBar()
