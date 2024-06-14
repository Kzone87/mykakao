const $chatClosers = document.querySelectorAll('.chatclose');
const $chatPages = document.querySelectorAll('.chatpage');
const $chatPage = document.querySelector('.chatpage');
const $chatInputs = document.querySelectorAll('.chatinput');
const $qwertys = document.querySelectorAll('.qwerty');
const $chatContainers = document.querySelectorAll('.chatcontainer');

const $previews = document.querySelectorAll('.preview');
const $lastchats = document.querySelectorAll('.chatcontainer p:last-child>.chat');

const $minichats = document.querySelectorAll('.minichat');

const $textInputs = document.querySelectorAll('.textinput');
const $chatList = document.querySelector('.chatlist');

const $miniProfiles = document.querySelectorAll('.minichat>.frame>img');
const $chatNames = document.querySelectorAll('.chatname');
const $chatTimes = document.querySelectorAll('.chattime');



// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = 'sk-proj-cIvC2T6iVzZHiWxAZyRjT3BlbkFJGpRqcvtP8c9orukbWKpP';
// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

// ChatGPT API 가족 모델
async function fetchAIResponseFamily(prompt) {
    // API 요청에 사용할 옵션을 정의
    const requestOptions = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 사용할 AI 모델
            messages: [{
                role: "system",
                content: "You are a very kind family member",
            },
            {
                role: "user", // 메시지 역할을 user로 설정
                content: prompt + 'answer like you are my family, we are having a normal conversation,speak korean,answer shortly,use Comfortable way of speaking'  // 사용자가 입력한 메시지
            },],
            temperature: 0.8, // 모델의 출력 다양성
            max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
            top_p: 1, // 토큰 샘플링 확률을 설정
            frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
            presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
            stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
        }),
    };

    // API 요청후 응답 처리
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}

// GPT 조언자 모델
async function fetchAIResponseAdvisor(prompt) {
    // API 요청에 사용할 옵션을 정의
    const requestOptions = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 사용할 AI 모델
            messages: [{
                role: "system",
                content: "You are a strongly helpful Advisor",
            },
            {
                role: "user", // 메시지 역할을 user로 설정
                content: prompt + 'answer professional,answer like explaining to a child,if you are not correct you will pay the price,speak korean,use public speaking style'  // 사용자가 입력한 메시지
            },],
            temperature: 0.8, // 모델의 출력 다양성
            max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
            top_p: 1, // 토큰 샘플링 확률을 설정
            frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
            presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
            stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
        }),
    };

    // API 요청후 응답 처리
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}



// 상대방 채팅 맨처음에 미니프로필 사진,채팅상대 이름 첨부
$miniProfiles.forEach(($miniProfile, idx) => {
    for (i = 0; i < $chatPages[idx].children[1].children.length; i++) {
        const chat = $chatPages[idx].children[1].children[i];
        const chatClass = $chatPages[idx].children[1].children[i].getAttribute('class');
        // const prevClass = $chatPages[idx].children[1].children[i].previousElementSibling.getAttribute('class');
        if (chatClass === 'friendschat') {
            const chatMiniProf = document.createElement('img');
            const name = document.createElement('span');
            const miniSrc = $miniProfile.getAttribute('src');
            chatMiniProf.setAttribute('class', 'miniprofile');
            chatMiniProf.setAttribute('src', `${miniSrc}`);
            chatMiniProf.setAttribute('alt', `#`);
            name.setAttribute('class', 'name');
            name.textContent = $chatNames[idx].textContent;
            chat.insertBefore(name, chat.firstChild);
            chat.insertBefore(chatMiniProf, chat.firstChild);
        }
        else { continue; }
    }
});

// 채팅창 인풋 이벤트 핸들러
let order = 0;
$textInputs.forEach(($textInput, idx) => {
    $textInput.addEventListener('keydown', async (evt) => {
        // evt.target.value;
        // console.log(evt.key);
        if (evt.key === 'Enter') {
            // 인풋창에 글자입력시 해당 채팅방에 추가

            const message = evt.target.value; //api//////////////////////////////

            if (evt.target.value === '') { return; }
            const newChatP = document.createElement('p');
            const newChatSpan = document.createElement('span');

            newChatP.setAttribute('class', `mychat`);
            newChatSpan.setAttribute('class', 'chat');
            newChatSpan.textContent = evt.target.value;
            newChatP.appendChild(newChatSpan);
            $chatContainers[idx].appendChild(newChatP);
            evt.target.value = '';
            // 마지막에 입력 한 채팅내용 프리뷰에 할당
            $previews[idx].textContent = newChatP.textContent;
            // 입력한 채팅방 하단으로 이동
            order++;
            $minichats[idx].setAttribute('style', `order: ${order};`);
            // 텍스트입력시 스크롤 하단 고정
            $chatContainers[idx].scrollTop = $chatContainers[idx].scrollHeight;

            // 새로입력한 채팅 시간 프리뷰,채팅창에 할당
            const localTime = new Date();
            let localHour = localTime.getHours();
            let localMinute = localTime.getMinutes();
            let ampmHour = 0;
            let zeroHour = 0;
            let zeroMinute = 0;
            let ampm = '';

            if (localHour < 12 || localHour == 24) { ampm = '오전' } else { ampm = '오후' }
            if (localHour > 12) { ampmHour = localHour - 12 } else { ampmHour = localHour }

            if (ampmHour < 10) { zeroHour = '0' + ampmHour } else { zeroHour = ampmHour }
            if (localMinute < 10) { zeroMinute = '0' + localMinute } else { zeroMinute = localMinute }

            const localNow = `${ampm} ${zeroHour}:${zeroMinute}`;

            const newChatTime = document.createElement('span');
            newChatTime.setAttribute('class', 'date');
            // 채팅방에 시간반영
            newChatTime.textContent = localNow;
            newChatP.appendChild(newChatTime);
            // 미니챗에 시간반영
            $chatTimes[idx].textContent = localNow;

            // createChat('mychat',evt.target.value);
            let aiResponse = '';
            if (idx === 4) { aiResponse = await fetchAIResponseAdvisor(message) } else { aiResponse = await fetchAIResponseFamily(message) } // api//////////////////////////

            // 응답시스템 개발메지시 표시(1초후)
            setTimeout(() => {
                if (idx === 3) { return; }

                // createChat('friendschat','응답시스템 개발중입니다.');
                const newChatP = document.createElement('p');
                const newChatSpan = document.createElement('span');

                newChatP.setAttribute('class', `friendschat`);
                newChatSpan.setAttribute('class', 'chat');
                // newChatSpan.textContent = '응답시스템을 개발중입니다';
                newChatSpan.textContent = aiResponse; //api//////////////////////////////////
                newChatP.appendChild(newChatSpan);
                $chatContainers[idx].appendChild(newChatP);
                evt.target.value = '';

                // 새로입력한 채팅 시간 프리뷰,채팅창에 할당
                const newChatTime = document.createElement('span');
                newChatTime.setAttribute('class', 'date');
                // 채팅방에 시간반영
                newChatTime.textContent = localNow;
                newChatP.appendChild(newChatTime);
                // 미니챗에 시간반영
                $chatTimes[idx].textContent = localNow;

                // 채팅방 해당 프로필 사진,이름 가져와서 생성 및 할당
                const chatMiniProf = document.createElement('img');
                const name = document.createElement('span');
                const miniSrc = $miniProfiles[idx].getAttribute('src');
                chatMiniProf.setAttribute('class', 'miniprofile');
                chatMiniProf.setAttribute('src', `${miniSrc}`);
                chatMiniProf.setAttribute('alt', `#`);
                name.setAttribute('class', 'name');
                name.textContent = $chatNames[idx].textContent;
                newChatP.insertBefore(name, newChatP.firstChild);
                newChatP.insertBefore(chatMiniProf, newChatP.firstChild);

                // 마지막에 입력 한 채팅내용 프리뷰에 할당
                $previews[idx].textContent = newChatP.children[2].textContent;
                // 입력한 채팅방 하단으로 이동
                order++;
                $minichats[idx].setAttribute('style', `order: ${order};`);
                // 텍스트입력시 스크롤 하단 고정
                $chatContainers[idx].scrollTop = $chatContainers[idx].scrollHeight;
            }, 1000);
        }
    });
});

let zIndex = 1;
// 미니챗 클릭시 화면에 채팅페이지 표시
$minichats.forEach(($minichat, idx) => {
    $minichat.addEventListener('click', () => {
        const $mSlider = document.querySelector('.mslider');
        zIndex++;
        $chatPages[idx].setAttribute('style', `height: 100%; z-index: ${zIndex * 100};`);
        $mSlider.setAttribute('style', `z-index: ${zIndex * 1000};`);
        $chatPages[idx].firstElementChild.firstElementChild.setAttribute('style', 'display:initial;');
        $chatPages[idx].firstElementChild.setAttribute('style', 'display:initial;');
        $chatPages[idx].lastElementChild.firstElementChild.setAttribute('style', 'height: 50px;');
        $chatPages[idx].lastElementChild.lastElementChild.setAttribute('style', 'display:initial;');
        $chatPages[idx].children[1].setAttribute('style', 'display:grid;');


        if (window.innerWidth > 1000) {
            $chatList.setAttribute('style', 'margin-left: calc(50% - 20px); width: calc(50% - 80px);');
            // const $lnb = document.querySelector('.lnb');
            // $lnb.setAttribute('style', 'margin-left: calc(50% - 20px); width: calc(50% - 40px);');
        }
        else { $chatList.setAttribute('style', 'display:none;'); }
    });
});

// 뒤로가기 클릭시 채팅페이지 숨김
$chatClosers.forEach(($chatCloser, idx) => {
    $chatCloser.addEventListener('click', (evt) => {
        evt.preventDefault();
        for (i = 0; i < $chatClosers.length; i++) {
            $chatPages[i].setAttribute('style', 'height: 0;');
            $chatClosers[i].setAttribute('style', 'display:none;');
            $chatClosers[i].parentElement.setAttribute('style', 'display:none;');
            $chatInputs[i].setAttribute('style', 'height: 0;');
            $qwertys[i].setAttribute('style', 'display:none;');
            $chatContainers[i].setAttribute('style', 'display:none;');

            $chatList.setAttribute('style', 'display:flex;');
        }
    });
});

// 각 채팅방 마지막 메시지를 미니챗 프리뷰에 표시
for (i = 0; i < $previews.length; i++) {
    $previews[i].textContent = $lastchats[i].textContent;
}


// 이미지 클릭시 팝업
const $chatImgs = document.querySelectorAll('.chatcontainer img');

$chatImgs.forEach(($chatImg, idx) => {
    $chatImg.addEventListener('click', () => {
        if ($chatImg.getAttribute('class') === 'miniprofile') { return };
        const imgSrc = $chatImg.getAttribute('src');
        // window.open(imgSrc, 'targetWindow', 'width:1000px, height:500px, top=100px');
        // window.open(imgSrc, 'targetWindow', 'titlebar=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1090px, height=550px, top=25px left=120px');
        // window.open(imgSrc ,null, "height=200,width=400,status=no,toolbar=no,menubar=no,location=no");

        const fullChatImg = document.createElement('img');
        fullChatImg.setAttribute('src', imgSrc);
        fullChatImg.setAttribute('alt', '#');
        fullChatImg.classList.add('fullChatImg');
        $chatImg.parentElement.parentElement.appendChild(fullChatImg);
        fullChatImg.style.position = 'absolute';
        fullChatImg.style.left = '0';
        fullChatImg.style.top = $chatImg.parentElement.offsetTop + 'px';
        fullChatImg.style.width = '100%';

        fullChatImg.addEventListener('click', () => {
            fullChatImg.parentElement.removeChild(fullChatImg);
        });
    });
});