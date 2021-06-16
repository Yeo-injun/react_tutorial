/* eslint-disable */

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let blogTitle = "Ratels BasketBall Crew";

  let [ title, setTitle ] = useState(['글 제목', '글제목22', '글제목33']);
  let [ content, setContent ] = useState('글 내용');

  let [ likeCnt, setLikeCnt ] = useState([0,0,0]);
  
  // UI 상태를 저장하는 useState를 새로 만듦
  let [ YN, setYN ] = useState(true);

  let [ no, setNo ] = useState(0);

  // 사용자가 입력한 값을 저장하기 위한 State : 초기값 ''(공백 문자열)
  let [ inputVal, setInputVal ] = useState('');

  // Array형태의 useState값을 변경하기 위해서는 해당 객체를 deepCopy해주어야 함.
  // 1. 기존 State 카피본 만들고, 2. 카피본에 수정사항 반영하고, 3. 변경함수()에 값 넣어주기
  function setNewTitle () {
    var newArray = [...title];
    newArray[0] = '글 제목1111';
    setTitle(newArray);  
  }

  function modalSwitch() {
    const deepCopy = require('lodash.clonedeep');
    var newYN = deepCopy(YN);
    newYN === false 
    ? newYN = true
    : newYN = false;
    setYN(newYN);
  }

  // 반복문으로 HTML 구현 : for 키워드 사용시 return 문 바깥에서 function()으로 구현
  function repeatedHTML() {
    var newArray = [];
    for (var i=0; i<3; i++) {
      newArray.push(<div>안녕하시옹!</div> + i);
    }
    return newArray;
  }

  // 좋아요 버튼 구현 : 게시글별로 분리
  function riseLikeCnt(idx) {
    var newCnt = [...likeCnt];
    newCnt[idx] += 1;
    console.log(newCnt);
    setLikeCnt(newCnt);
  }

  // 글 저장 기능 구현
  function publishing(post) {
    // State데이터는 '=' 연산자로 직접 할당하는 방식은 지양. 
    // State데이터를 직접 Copy해서 Copy본을 변경해서 할당 
    var newTitle = [...title]; 
    newTitle.unshift(post); // .unshift() array맨앞에 자료 추가하는 문법
    setTitle(newTitle);

    var newLikeCnt = [...likeCnt];
    newLikeCnt.push(0);
    setLikeCnt(newLikeCnt);
  }

  /* HTML시작 */
  return (
    <div className="App">
      <div className="black-nav"> {blogTitle} </div>
      
      <button onClick= { ()=> { modalSwitch() } }>게시글 열기/닫기</button>

      <div className="list">
          { /* repeatedHTML() for키워드로 반복문 구현 */ }

          { /* .map() 메소드로 반복문 구현 
               useState의 변수가 Array일 경우에 사용 가능
               Array내의 요소를 하나씩 꺼내면서 동작
               Array내 요소는 map() 안에 () => {} 구현시 해당 화살표 함수에 인자값 할당
            */

            title.map(
              (element, index) => {
                // 글제목 인덱스 참조 : () => {} 에 두번째 인자값을 넣어주면 map객체내 요소의 index값을 받을 수 있음!
                // var index = title.indexOf(element);
                return (
                  <div className="list" key={ index /* 해당 반복요소의 인덱스값 부여 >> 없을시 console에 Warning 발생 */} >
                  <h3 onClick={ () => { setNo(index) } }> { element } </h3>
                  <span onClick= { () => riseLikeCnt(index) }>🐣</span> { likeCnt[index] }
                  <p> { content } </p>
                  </div>
                )
              }
            )
          /* 반복문 끝 */}
      </div>

      {/* 버튼 클릭시에 Modal창 보여주기 : 삼항 연산자 사용 */}
      {
        YN === true
        ? <Modal title={ title } no={ no }></Modal>
        : null
      }

      {/* 글 발행 기능
        * 사용자 입력값 받기 : input태그 사용
        * 사용자가 입력한 값을 가져오기 위해서는 e.target.value 활용
        * e.target : 현재 이벤트가 동작하는 곳을 지칭 */}
      <div className="publish">
        <input onChange={ (e)=>{ setInputVal(e.target.value); } }/>
        <button onClick={ ()=>{publishing(inputVal);} }>글 저장</button>

      </div>

      <Profile />
    </div>
  );
}

/*  컴포넌트 만들기
1. 반복출현하는 HTML덩어리
2. 자주변경되는 HTML UI
3. 다른 페이지를 만들때 사용

요령 : function ComponentName ( props 인자값 작명 ) { return ( HTML 덩어리 작성 ) 
*/
function Modal (props) {
  return (
  <div>
    <h3> { props.title[props.no] } </h3>
    <p>날짜</p>
    <p>글 내용</p>
  </div>
  );
}

/* 구버전 Component 만들기 : Class방식 
 * Class방식으로 만든 Component를 App()의 return(HTML 덩어리를 쓰는 곳)에 작성해주면 됨*/
class Profile extends React.Component {
  // 변수값(State 등) 작성 영역
  constructor() { 
    super();
    this.state = {name : 'Yeo', age : 30};
    this.testState = {test : '이것도?' };
  }

  // 메소드 작성 영역
  /* Arrow함수로 작성시 데이터 바인딩시 this값 없어도 됨.
     changeName = ()=>{
       this.setState( {name: 'Park'})
     }
     HTML덩어리에는 this.메소드명 으로 작성하면 해당 메소드 호출됨.
  */
  changeName() {
    this.setState( {name: 'Park'})
  }

  // HTML 덩어리 작성하는 곳
  render() {
    return (
    <div> 
      <h1> PROFILE </h1>
      <h3> 저는 { this.state.name } 입니다. </h3>
      <button onClick={ this.changeName.bind(this) }>이름 변경</button>
      <h5> { this.testState.test } </h5>
    </div>
    )
  }
}

export default App;
