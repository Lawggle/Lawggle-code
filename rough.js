<!-- [Attributes by Finsweet] Disable scrolling -->
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-scrolldisable@1/scrolldisable.js"></script>
<style> 

.listings .item.yes {
display: none!important; 
}
 #selectorTags {
text-align: center;
padding: 0 60px 0;
margin: 70px auto 0;
min-height: 30px;
}
#selectorTags span {
background: #00adee;
padding: 4px 6px;
margin: 0 4px 2px;
border-radius: 4px;
display: inline-block;
}

#select {
 box-sizing: content-box;
 padding: 5px 40px 5px 10px;
}
.listings .item {
  border-top: 1px solid #eee;
  text-decoration: none;
  padding: 20px;
  background: #fff;
}
.listings .item.active-c {
display: none!important;
}
.listings .item.active-d {
display: block;
}
.item.non-active {
display: none;
}
.item strong {
font-size: 13px;
padding-left: 90px;
}
.i-wrap {
display: inline-block;
float: left;
min-height: 90px;
}
.listings .item:last-child { border-bottom: none; }

.listings .item .title {
  display: block;
  color: #333;
  font-weight: 700;
  font-size: 16px;
}
.l-profile {
width: 80px;
margin-right: 10px;
float: left;
display: inline-block;
}
.l-profile-link {
display: block;
padding: 4px 0;
text-decoration: none;
color: #00adee;
font-size: 14px;
}
.item .l-profile-link {
padding-left: 90px;
}
.content-l {
padding: 0 10px 6px;
}
.content-l span,
.details span {
background: #f3f3f3;
    border-radius: 20px;
    padding: 3px 10px;
    }
    .details span {
   background: #fff;
    display: table-cell;
    font-size: 12px;
    font-weight: 500;
    padding: 0px 8px;
    line-height: 20px;
    border: 1px solid #ddd;
    }
.listings .item .title small { font-weight: 400; }

.listings .item.active .title,
.listings .item .title:hover { color: #333; }

.listings .item.active {
  background: #fff;
  border-left: 4px solid #00adee;
  display: block;
}
.item .details {
color: #333;
line-height: 1.6em;
text-decoration: none;
display: block;
font-size: 14px;
overflow: hidden;
}
.mapboxgl-popup-content h4{
font-size: 16px;
color: #fff;
}
.item .details h4 {
font-size: 16px;
color: #333;
margin: 0px
}
.item .details h5 {
margin: 6px 0;
}
.mapboxgl-popup-content .mapboxgl-popup-close-button {
color: #fff;
}
.mapboxgl-popup .mapboxgl-popup-content {
padding: 0px;
}
.mapboxgl-popup .mapboxgl-popup-content h4 {
margin: 0;
padding: 6px 20px;
background: #00adee;
}

.mapboxgl-popup {
  max-width: 200px;
}
.marker {
    border: none;
    cursor: pointer;
    height: 56px;
    width: 56px;
    background-image: url("https://i.imgur.com/MK4NUzI.png");
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0, 0, 0, 0);
}
/* Marker tweaks */
      .mapboxgl-popup {
        padding-bottom: 50px;
      }



::-webkit-scrollbar {
  width: 0px;
  height: 3px;
  border-left: 0;
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-track {
  background: none;
}

::-webkit-scrollbar-thumb {
  background: #00853e;
  border-radius: 0;
}
.gone {
opacity: 0;
}
  
.listings .blue {
min-height: 0px;
background: none;
}

.mapboxgl-ctrl-geocoder {
 width: 100%!important;
}

body .mapboxgl-ctrl-geocoder--input {
height: 55px;
border-radius: 6px;
background: #fff;
font-family: Lato, sans-serif;
color: #222222;
width: 350px;
font-size: 18px;
font-weight: 700;
padding: 6px 15px;
}
body .mapboxgl-ctrl-geocoder--icon-search {
display: none;
}
body .mapboxgl-ctrl-geocoder--icon-close {
position: absolute;
right: -100px;
}
	.overlay{overflow-x:visible;}
 #animatedBackground {
 background-repeat: repeat-x;
/*adjust s value for speed*/
  animation: animatedBackground 500s linear infinite;
}
.next.button { 
z-index: 0;
}

.w-dropdown-link {
margin-left: 0;
}
.dropdown-toggle {
padding-left: 15px;
}
@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -10000px 0;
  }
  }
 @media screen and (max-width: 479px) {
body .mapboxgl-ctrl-geocoder--input {
width: 90vw;
}

.mapboxgl-canvas {
    left: 0;
    bottom: 0;
}
.main-wrapper .hero-section {
padding-top: 80px;
}
}
.item.exclusive {
    background: #f3f3f3!important;
}


/*
.no-results {
display: none;
}
.no-results.display {
display: block;
}
*/
a {
text-decoration: none;
}

 </style>
 <link href="https://api.mapbox.com/mapbox-gl-js/v1.9.0/mapbox-gl.css" rel="stylesheet" />
 <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.css'></link>