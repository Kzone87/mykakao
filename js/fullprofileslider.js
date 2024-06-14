const $fullCloser = document.querySelector('.fullprofile>.fullclose');
const $fullProfile = document.querySelector('.fullprofile');
const $fullFrame = document.querySelector('.minicontainer>.frame');
const $fullName = document.querySelector('.minicontainer>.name');
const $fullStatus = document.querySelector('.minicontainer>.status');

const $mainProfile = document.querySelector('.mainprofile');
const $miniProfiles = document.querySelectorAll('.miniprofile');

const $fullProfileImg = document.querySelector('.fullprofile>.minicontainer>.frame>img');
const $miniProfileImg = document.querySelectorAll('.miniprofile>.frame>img');

const $mSlider = document.querySelector('.mslider');

// 메인프로필 클릭시 풀프로필 표시
$mainProfile.addEventListener('click', () => {
    const mainProfileName = $mainProfile.children[1].firstElementChild;
    const mainProfileStatus = $mainProfile.children[1].lastElementChild;
    const miniImg = $mainProfile.firstElementChild.firstElementChild.getAttribute('src');
    const bgData = $mainProfile.firstElementChild.lastElementChild.getAttribute('src');

    // 클릭한 프로필의 이름,상태글, 프로필 이미지 정보를 풀페이지 화면에 할당
    $fullName.textContent = mainProfileName.textContent;
    $fullStatus.textContent = mainProfileStatus.textContent;
    $fullProfileImg.setAttribute("src", `${miniImg}`);
    $fullProfile.setAttribute('style', `height: 100%;background-image: url(${bgData});`);

    $fullFrame.setAttribute('style', 'height: 100px;');
    $fullName.setAttribute('style', 'font-size: 20px;height: 40px;');
    $fullStatus.setAttribute('style', 'font-size: 14px;');
    $fullCloser.setAttribute('style', 'display: block;');
    $mSlider.setAttribute('style', 'position: relative;z-index: 300;color: #fff;');
});

// 미니프로필 클릭시 풀프로필 표시
$miniProfiles.forEach((miniProfile, Idx) => {
    miniProfile.addEventListener('click', () => {

        if (Idx === 0) { return; } // 생일자 페이지클릭시 표시중지

        const miniProfileImg = miniProfile.firstElementChild.firstElementChild;
        const miniImg = miniProfileImg.getAttribute("src");
        const miniProfileName = miniProfile.children[1].firstElementChild;
        const miniProfileStatus = miniProfile.children[1].lastElementChild;
        const bgData = miniProfile.firstElementChild.lastElementChild.getAttribute('src');

        // 클릭한 프로필의 이름,상태글, 프로필 이미지 정보를 풀페이지 화면에 할당
        $fullName.textContent = miniProfileName.textContent;
        $fullStatus.textContent = miniProfileStatus.textContent;
        $fullProfileImg.setAttribute("src", `${miniImg}`);
        $fullProfile.setAttribute('style', `height: 100%;background-image: url(${bgData});`);

        $fullFrame.setAttribute('style', 'height: 100px;');
        $fullName.setAttribute('style', 'font-size: 20px;height: 40px;');
        $fullStatus.setAttribute('style', 'font-size: 14px;');
        $fullCloser.setAttribute('style', 'display: block;');
        $mSlider.setAttribute('style', 'position: relative;z-index: 300;color: #fff;');
    });
});

// 페이지 끄기(X)클릭시 풀프로필 숨김
$fullCloser.addEventListener('click', () => {
    $fullProfile.setAttribute('style', 'height: 0;');
    $fullFrame.setAttribute('style', 'height: 0;');
    $fullName.setAttribute('style', 'font-size: 0;');
    $fullStatus.setAttribute('style', 'font-size: 0;');
    $fullCloser.setAttribute('style', 'display: none;');
    $mSlider.setAttribute('style', 'position: initial;z-index: initial;color: initial;');
});