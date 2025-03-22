import {createUserData ,getUserData, updateScore, updateLevelScore, toggleOnlineState} from "./database.js";
import { ñ,InsertElement, ConmuteClassAndInner} from './utils.js'
import {loadDataFile} from './files.js'

// views.GoTo("Wellcome").then(()=>{  
//   ñ('#startButton').addEventListener('click', (e)=>{
//       clipAmbient.loop = true;
//       clipAmbient.play();
//       clipBtn.play();
//       ñ('#PopUpRegistro').hidden = false;
//   });
// });

// loadDataFile("txt").then((res)=>{
//   TotalQuestions = res[0].Questions;
//   console.log(TotalQuestions.length);
// });

// loadDataFile('json')

window.TryLogin = (form)=>{
  // Check if form has all the required fields
  if(!form.elements['name'].value)
      return false;


  // Loading(true);
  // clipBtn.play();
  // progress = localStorage.getItem("progress") || 0;
  getUserData().then((res)=>{
      let exist = false
      console.log(res);
      for (const u in res) 
          if (res.hasOwnProperty(u)) 
              exist |= u=== form.elements['name'].value
      localStorage.setItem("userName", form.elements['name'].value );
      if(exist)
        console.log("Usuario ya existe")
      // GoToLobby();
      else
        console.log("Usuario NO existe")
          Login(form)
      return false;
  }).catch((res)=> {
      Loading(false);
      console.log("Error login: "+res)
      alert("Ranking, Ha ocurrido un error, intente nuevamente.")
      return false;
  });
  return false;
}

const Loading =(state)=>{
  // ñ('#loader').hidden = !state;
  document.body.classList.toggle('avoidEvents', state);
}
// const GoToLobby = ()=>{
//   Loading(false);
//   Questions = TotalQuestions;

//   views.GoTo("Lobby").then(()=>{
//       let questionBtns = ñ('.ContenedorSeleccionNivel');
//       questionBtns.forEach( (b, i)=> {
//           b.classList.add(i===Questions[progress].level?'NivelActual':(i>=Questions[progress].level?'NivelInactivo':'NivelSuperado'));
//       });
//       questionBtns[Questions[progress].level].addEventListener('click', ()=> GoQuestion(progress) );
//       toggleOnlineState(false);
//   });
// }

// const GoQuestion = ()=>{
//   views.GoTo("Pregunta").then((res)=>{
//       SetQuestionAndAnswers(Questions[progress]);
//       RunTimer();
//   });
// }

// const SetQuestionAndAnswers = (question)=>{
//   ñ('#TituloNivel').innerHTML="NIVEL "+(question.level+1)
//   ñ('.SeccionPuntaje')[0].innerHTML= localStorage.score
//   ñ('#TextoPregunta').innerHTML = question.statement;
//   for(let ans of question.Answers){
//       let r = InsertElement('div',['Respuesta'],'',ñ('#contRespuestas'),undefined,false);
//       r.addEventListener("click", () => Answer(ans, question));
//       let aImg= InsertElement('img',['IconoRespuestas'],'',r,undefined,false);
//       aImg.src = `../Images/Ans${ans.id}.png`;
//       InsertElement('div',['BotonRespuesta'],ans.text,r,'answer'+ans.id,false);
//       InsertElement('div',['space1vh'],'',ñ('#contRespuestas'),undefined,false);
//   }
//   InsertElement('div',['space1vh'],'',ñ('#contRespuestas'),undefined,false);
// }

// const Answer = (ans, question)=>{
//   let classTarget = ans.isCorrect ?'RespuestaCorrecta':'RespuestaIncorrecta';
//   multiAns[question.id] = multiAns[question.id]? multiAns[question.id]+1 : 1;
//   if(question.id === "11" && ans.isCorrect && multiAns[question.id] <= 2){
//       clipBtn.play();
//       ConmuteClassAndInner(ñ('#answer'+ans.id),classTarget,'dumb')
//   }else{
//       let s_ans = ans.isCorrect? clipCorrect : clipFail;
//       s_ans.play();
//       let classTarget = ans.isCorrect ?'RespuestaCorrecta':'RespuestaIncorrecta';
//       UpdateStatus(ans.id, ans.isCorrect)
//       AnimateAnswer(ans,ñ('#answer'+ans.id), classTarget,  150);
//   }
// }

// const UpdateStatus = ( idAns, isCorrect)=>{
//   answered = JSON.parse( localStorage.answered ||JSON.stringify({}));
//   answered[progress] = idAns;
//   localStorage.answered = JSON.stringify(answered);
//   if (isCorrect)
//       localStorage.score = Number.parseInt(localStorage.score)+ pointsBySuccess -timeTrans
//   progress++;
//   localStorage.progress = progress;
// }

// const RunTimer = ()=>{
//   countdownTimer = setInterval(() => {
//       timeTrans = pausedTime? timeTrans: timeTrans +1;
//       timeTrans = timeTrans>=pointsBySuccess? pointsBySuccess: timeTrans;
//   }, 1000);
// }

const Login = (form)=>{
  Reset();
  createUserData( 
    form.elements['name'].value, 
    form.elements['company'].value,
    form.elements['employees'].value,
  )
  .then((res)=>{
      Loading(false);
      window.location.href = "trivia.html";
  //     views.GoTo("Instrucciones01").then(()=>{
  //         ñ('#idNext').addEventListener('click', (e)=>{
  //             clipBtn.play();    
  //             views.GoTo("Instrucciones02").then(()=>{
  //                 ñ('#idNext').addEventListener('click', (e)=>{clipBtn.play(); GoToLobby();} );
  //             });
  //         });
  //     });
  //     toggleOnlineState(false);
  }).catch((e)=> {
      Loading(false);
      console.log("E.login: "+e);
      alert("Ha ocurrido un error, intente nuevamente. E.login.")
  })
}

// const AnimateAnswer = (ans, element, classTarget, interval)=>{
//   document.body.classList.add('avoidEvents');
//   ConmuteClassAndInner(element,classTarget,'dumb')
//   setTimeout(() => {ConmuteClassAndInner(element,'dumb',classTarget)}, interval);
//   setTimeout(() => {ConmuteClassAndInner(element,classTarget,'dumb')}, interval*2);
//   setTimeout(() => {ConmuteClassAndInner(element,'dumb',classTarget)}, interval*3);
//   setTimeout(() => {ConmuteClassAndInner(element,classTarget,'dumb')}, interval*4);
//   setTimeout(() => {ShowFinalMessage(ans); document.body.classList.remove('avoidEvents');}, interval*5);
// }

// const ShowFinalMessage = (ans)=>{
//   clearInterval(countdownTimer);
//   views.GoTo("Retroalimentacion").then(()=>{   
//       ñ('#BackgroundImageFull').src = ans.isCorrect? "../Images/FondoCorrecta.jpg":"../Images/FondoIncorrecta.jpg";
//       ñ('#BackgroundImageFull').hidden = false;
//       ñ('#idNext').addEventListener('click', (e)=>NextQuestionOrResults() );
//   });
// }


// const NextQuestionOrResults = ()=>{
//   clipBtn.play();
//   if (Object.keys(answered).length === (Questions.length) )
//       GoToResults();
//   else if(Questions[progress-1].level !== Questions[progress].level)
//       GoToEndLevel();
//   else
//       GoQuestion(progress);
// }

// const GoToEndLevel = ()=>{
//   views.GoTo("FinalLevel").then(()=>{
//       updateLevelScore( localStorage.getItem("userName"), Number.parseInt(localStorage.score) ).
//       then((res)=>{
//           if(Questions[progress].level === 5)
//               ñ('#idDownload').hidden = false;
//           ñ('#idNext').addEventListener('click', (e)=>GoToLobby() );
//           toggleOnlineState(false);
//       });
//   });
// }

// const GoToResults = ()=>{
//   document.body.classList.add('avoidEvents');
//   updateScore( localStorage.getItem("userName"), Number.parseInt(localStorage.score), answered)
//   .then((res)=>{
//       views.GoTo("FinalTrivias").then((res)=>{
//           console.log("Terminado!");
//           Reset();
//           document.body.classList.remove('avoidEvents');
//       });
//       toggleOnlineState(false);
//   }).catch((e) =>{
//       console.log("Error Update: "+e);
//       alert("Ocurrió un error, intenta nuevamente.");
//       document.body.classList.remove('avoidEvents');
//       GoToResults();
//   });
// }

const Reset = ()=>{
  // localStorage.removeItem("answered");
  // localStorage.removeItem("progress");
  localStorage.removeItem("score");
  localStorage.score = 0;
  // progress = 0;
  // answered = {};
}
