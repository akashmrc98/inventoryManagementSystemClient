<template lang="pug">
.page
  router-view.is-fullhd
</template>

<style lang="scss">
body,
html {
  width: 100%;
  height: 100%;
  background-color: #a0ffe6;
}
.extras {
  color: #9abd97;
}

.extras:hover {
  color: #a0ffe6;
}
.close {
  width: 100%;
  height: 3%;
  background-color: #142850;
  box-shadow: 2px 2px 15px #142850, 3px 3px 15px #142850;
}
.buttonClose {
  margin-left: 99%;
}
.error {
  font-size: 0.85em;
  color: red;
  font-weight: 500;
}
.component {
  background-color: #a0ffe6;
  margin: 25px;
  box-shadow: 2px 2px 10px black;
}
.page {
  background-color: #a0ffe6;
  height: 100%;
}
.componentHead {
  background-color: #142850;
  color: #a0ffe6;
  box-shadow: 2px 2px 10px black;
  font-weight: bold;
  font-size: 1.25em;
  text-shadow: 1px 1px 0px #a0ffe6;
}
.input {
  border: 2px solid green;
  background-color: rgba(0, 255, 0, 0.2);
  box-shadow: 2px 2px 10px black;
  color: #142850;
  font-weight: bold;
  text-shadow: 2px 2px 15px #a0ffe6;
}
.inputArea {
  border: 2px solid green;
  background-color: rgba(0, 255, 0, 0.2);
  box-shadow: 2px 2px 10px black;
  text-shadow: 2px 2px 15px #a0ffe6;
}
.navItem {
  margin-right: 12px;
  box-shadow: 2px 2px 10px black;
  text-shadow: 2px 2px 15px #142850;
}
.ModalService {
  margin: 250px;
}
.closeButton {
  margin-left: 96%;
  margin-top: 8px;
  margin-right: 18px;
  border: 2px solid #142850;
  border-radius: 35px;
  justify-content: center;
}
.Item {
  margin-right: 10px;
}
.hasError {
  border: 2px solid red;
  background-color: rgba(255, 0, 0, 0.3);
  animation-name: errorMove;
  animation-duration: 1s;
  box-shadow: 2px 2px 10px black;
  text-shadow: 2px 2px 15px red;
}
.linkz {
  width: 22px;
  height: 22px;
  background-color: #142850;
  padding: 15px;
  color: #a0ffe6;
  box-shadow: 2px 3px 5px black;
  margin: 5px;
}
.Message {
  font-size: 1.2em;
  text-align: center;
  width: 95%;
  margin-top: 45%;
  box-shadow: 2px 2px 10px black;
  font-weight: bold;
  text-shadow: 2px 2px 15p;
}

.viewPos {
  margin-top: 3%;
  width: 35%;
}

.UpdateModal {
  width: 30%;
  margin-top: 15%;
  margin-left: 32%;
  height: 60%;
}
.button {
  box-shadow: 2px 2px 10px black;
}
th,
tr,
td {
  background-color: #9abd97;
  border: 3px solid #142850;
  color: #142850;
  font-size: 0.9em;
  font-weight: bold;
  padding: 10px;
  box-shadow: 3px 3px 10px #142850;
}
.logPos {
  margin-top: 10%;
  width: 30%;
  border: 1px solid #142850;
  box-shadow: 2px 2px 15px #142850;
}
.searchInput {
  font-weight: bolder;
}

@keyframes errorMove {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
.buttonmt {
  margin-top: 30px;
}
.modalpos {
  margin-top: 5%;
  margin-left: 5%;
  width: 35%;
  background-color: #9abd97;
}
.buts {
  font-size: 1em;
  padding: 15px;
  background-color: #142850;
  color: #9abd97;
  margin: 18px;
  box-shadow: 2px 2px 5px black, 3px 3px 8px black;
}
.Msg {
  font-size: 1.25em;
  text-align: center;
  font-weight: bold;
}
.slideMe {
  animation: messageSlider 1.5s;
  font-size: 1.25em;
}

.slideMeOpen {
  animation: messageSliderDelete 1.5s;
  font-size: 1.25em;
}

.slideMeClose {
  animation: messageSliderDeleteClose 1.5s;
  font-size: 1.25em;
}

@keyframes messageSlider {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.slideMeDelete {
  animation: messageSliderDelete 0.5s;
  font-size: 1.25em;
}
@keyframes messageSliderDelete {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.sizeWidth {
  width: 30%;
}

.slideMeDeleteClose {
  animation: messageSliderDeleteClose 0.5s;
  font-size: 1.25em;
}
@keyframes messageSliderDeleteClose {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.modalpos2 {
  margin-top: 12%;
  margin-left: 32%;
  width: 30%;
  color: #9abd97;
}

.dashs {
  height: 255px;
  width: 425px;
  box-shadow: 2px 2px 13px #142850, 3px 3px 15px #142850;
  text-align: center;
  font-size: 1.75em;
  font-weight: bold;
  margin: 5%;
  color: #9abd97;
  background-color: #142850;
}

.dashs:hover {
  background-color: #9abd97;
  color: #142850;
  animation: dashs;
  animation-duration: 1s;
}

@keyframes dashs {
  50% {
    transform: scale(1.1);
  }
}
.linkColor {
  color: #9abd97;
  background-color: #142850;
}

.linkColor:hover {
  background-color: #9abd97;
  color: #142850;
}
</style>
