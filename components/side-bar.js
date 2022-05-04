app.component("side-bar", {
  template:
    /*html*/
    `<div class="menu">
        <div class="close"> <i class="fa-solid fa-xmark"></i></div>
        <div class="logo">
            <i class="fa-solid fa-atom"></i>
            <span class="text">JAWA</span>
        </div>
        <div class="item">
            <i class="fa-solid fa-border-all"></i>
            <span class="text"><a href="#"> Dashboard</a></span>
        </div> 

        <div class="item">
            <i class="fa-regular fa-map"></i>
            <span class="text"><a href="#"> Map</a></span>
        </div> 

        <div class="item">
            <i class="fa-regular fa-star"></i>
            <span class="text"><a href="#"> Favourits</a></span>
        </div>

        <div class="item">
            <i class="fa-regular fa-thumbs-up"></i>
            <span class="text"><a href="#"> Review</a></span>
        </div>
        <div class="item">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span class="text"><a href="#"> Logout</a></span>
        </div>
        <div class="item">
            <i class="fa-solid fa-gears"></i>
            <span class="text"><a href="#"> Debug</a></span>
        </div>
        
    </div>`,
});