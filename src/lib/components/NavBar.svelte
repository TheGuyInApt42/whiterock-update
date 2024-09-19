<script>
  const toggler = () =>{
    console.log('here');
    let items = document.getElementsByClassName('item');
    for(var i=0; i<items.length;++i){
      items[i].classList.toggle('active');
    }
    
  }
</script>


<style>
/* Basic styling */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

nav {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 18px;
  background-color: #000050;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
}
ul {
  list-style-type: none;
}
a {
    color: white;
    font-weight: bold;
    text-decoration: none;
}
a:hover {
  text-decoration: underline;
  color: aqua;
}
.logo a:hover {
  text-decoration: none;
}
.menu li {
  font-size: 16px;
  padding: 15px 5px;
  white-space: nowrap;
}

.logo{
    display: inline-block;
    font-family: 'Fascinate', cursive;
    font-size: 22px;
}
.logo a,
.toggle a {
  font-size: 20px;
}

/* Mobile menu */
.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.toggle {
  order: 1;
}

.item {
  width: 100%;
  text-align: center;
  order: 3;
  display: none;
}
:global(.item.active) {
  display: block;
}
/* Tablet menu */
@media all and (min-width: 600px) {
  .menu {
    justify-content: center;
  }
  .logo {
    flex: 1;
  }
  .toggle {
    flex: 1;
    text-align: right;
  }
 
  .toggle {
    order: 2;
  }

}
/* Desktop menu */
@media all and (min-width: 900px) {
  .item {
    display: block;
    width: auto;
  }
  .toggle {
    display: none;
  }
  .logo {
    order: 0;
  }
  .item {
    order: 1;
  }

  .menu li {
    padding: 15px 10px;
  }
}

</style>

<nav>
  <ul class="menu">
    <li class="logo"><a href="#">White Rock</a></li>
    <li class="item"><a href="#about">About Us</a></li>
    <li class="item"><a href="#testimonials">Testimonials</a></li>
    <li class="item"><a href="#faq">FAQ</a></li>
    <li class="item"><a href="#contact">Contact</a>
    </li>
    <!--<li class="item button"><a href="#">Call Today</a></li>-->
    <li class="toggle" on:click={toggler}><a href="#"><i class="fa fa-bars"></i></a></li>
  </ul>
</nav>