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
                  <div>
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


export default App;
