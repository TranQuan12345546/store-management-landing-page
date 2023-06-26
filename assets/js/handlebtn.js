const registerBtn = document.getElementById("registerBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");

registerBtn.addEventListener("click", function () {
    modal.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    modal.classList.add("fadeOut");
    setTimeout(function () {
        modal.classList.remove("active", "fadeOut");
    }, 400);
});

// api get tỉnh, thành phố
const province = document.getElementById("province");

async function getProvince() {
    const res = await fetch("https://provinces.open-api.vn/api/p/");
    const provinceData = await res.json();

    for (let i = 0; i < provinceData.length; i++) {
        let option = document.createElement("option");
        option.innerText = provinceData[i].name;
        option.value = `${provinceData[i].code}`;
        province.appendChild(option);
    }
    province.addEventListener("change", function () {
        getDistrict(province.value);
    });
}

async function getDistrict(provinceCode) {
    const district = document.getElementById("district");
    district.innerHTML = "";

    console.log(district);
    const res = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    const districtData = await res.json();
    console.log(districtData);

    for (let i = 0; i < districtData.districts.length; i++) {
        let option = document.createElement("option");
        option.innerText = districtData.districts[i].name;
        option.value = `${districtData.districts[i].code}`;
        district.appendChild(option);
    }
}

getProvince();
