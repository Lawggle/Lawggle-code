<!-- [Attributes by Finsweet] Disable scrolling -->
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-scrolldisable@1/scrolldisable.js"></script>
<style> 

.listings .result-item.yes {
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
.listings .result-item.active-c {
display: none!important; 
}
.listings .result-item.active-d {
display: flex;
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

.item .l-profile-link {
padding-left: 90px;
}
.content-l {
padding: 0 10px 6px;
}
.listings .item .title small { font-weight: 400; }

.listings .item.active .title,
.listings .item .title:hover { color: #333; }

.mapboxgl-popup-content h4{
font-size: 16px;
color: #fff;
}

.mapboxgl-popup-content .mapboxgl-popup-close-button {
color: #fff;
min-height: 10px;
min-width: 10px;
}
.mapboxgl-popup .mapboxgl-popup-content {
padding: 1px;
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
    height: 40px;
    width: 40px;
    background-image: url("https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/6214115a3c12d53181076626_map%20pin.png");
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
  height: 1px;
  border-left: 0;
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-track {
  background: none;
}
/*
::-webkit-scrollbar-thumb {
  background: #00853e;
  border-radius: 0;
}
*/
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
 <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.css'>