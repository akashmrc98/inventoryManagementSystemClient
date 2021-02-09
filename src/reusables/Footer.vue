<template lang="pug">
  .columns.headColor.MainHeader
    .column.is-1
      .logo
    .column.is-10
      h2.title.txt.t1
        | ANDHRA LOYOLA COLLEGE
      h3.subtitle.txt.t2
        | INVENTORY MANAGEMENT SYSTEM
    .column.is-1
      .logo
</template>

<style>
.logo {
  background-color: #a0ffe6;
  text-align: center;
  box-shadow: 2px 2px 15px black;
  content: url(logo.png);
  width: 115px;
  height: 105px;
  margin-top: 10%;
  margin-left: 15%;
  border-radius: 85%;
}
.logo:hover {
  animation-name: logoMover;
  animation-duration: 1s;
}

.MainHeader {
  padding: 25px;
}
.headColor {
  background-color: #a0ffe6;
}
.title {
  font-size: 5em;
}
.txt {
  text-shadow: 2px 2px 10px #a0ffe6, 2px 2px 10px #a0ffe6, 10px 0px 10px #a0ffe6,
    0px 10px 10px #142850, 2px 2px 0px #142850;
  font-weight: bold;
  color: #142850;
}
@keyframes logoMover {
  50% {
    transform: scale(1.25);
  }
}
.t1 {
  font-size: 4em;
}
.t2 {
  font-size: 2.5em;
}
</style>
