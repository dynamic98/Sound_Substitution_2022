let inputLeft = document.getElementById("input-left");
let inputRight = document.getElementById("input-right");

let thumbLeft = document.querySelector(".slider > .thumb.left");
let thumbRight = document.querySelector(".slider > .thumb.right");
let range = document.querySelector(".slider > .range");

function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbLeft.style.left = percent + "%";
	range.style.left = percent + "%";
}
setLeftValue();

function setRightValue() {
	var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbRight.style.right = (100 - percent) + "%";
	range.style.right = (100 - percent) + "%";
}
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

inputLeft.addEventListener("mouseover", function() {
	thumbLeft.classList.add("hover");
});
inputLeft.addEventListener("mouseout", function() {
	thumbLeft.classList.remove("hover");
});
inputLeft.addEventListener("mousedown", function() {
	thumbLeft.classList.add("active");
});
inputLeft.addEventListener("mouseup", function() {
	thumbLeft.classList.remove("active");
});

inputRight.addEventListener("mouseover", function() {
	thumbRight.classList.add("hover");
});
inputRight.addEventListener("mouseout", function() {
	thumbRight.classList.remove("hover");
});
inputRight.addEventListener("mousedown", function() {
	thumbRight.classList.add("active");
});
inputRight.addEventListener("mouseup", function() {
	thumbRight.classList.remove("active");
});


// /** Default config */
// const rangeSlider_min = 30;
// const rangeSlider_max = 60;

// document.querySelector('#RangeSlider .range-slider-val-left').style.width = `${rangeSlider_min + (100 - rangeSlider_max)}%`;
// document.querySelector('#RangeSlider .range-slider-val-right').style.width = `${rangeSlider_min + (100 - rangeSlider_max)}%`;
 
// document.querySelector('#RangeSlider .range-slider-val-range').style.left = `${rangeSlider_min}%`;
// document.querySelector('#RangeSlider .range-slider-val-range').style.right = `${(100 - rangeSlider_max)}%`;

// document.querySelector('#RangeSlider .range-slider-handle-left').style.left = `${rangeSlider_min}%`;
// document.querySelector('#RangeSlider .range-slider-handle-right').style.left = `${rangeSlider_max}%`;

// document.querySelector('#RangeSlider .range-slider-tooltip-left').style.left = `${rangeSlider_min}%`;
// document.querySelector('#RangeSlider .range-slider-tooltip-right').style.left = `${rangeSlider_max}%`;

// document.querySelector('#RangeSlider .range-slider-tooltip-left .range-slider-tooltip-text').innerText = rangeSlider_min;
// document.querySelector('#RangeSlider .range-slider-tooltip-right .range-slider-tooltip-text').innerText = rangeSlider_max;

// document.querySelector('#RangeSlider .range-slider-input-left').value = rangeSlider_min;
// document.querySelector('#RangeSlider .range-slider-input-left').addEventListener( 'input', e => {
// 	e.target.value = Math.min(e.target.value, e.target.parentNode.childNodes[5].value - 1);
// 	var value = (100 / ( parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.value) - (100 / (parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.min);
//     console.log(value);
// 	var children = e.target.parentNode.childNodes[1].childNodes;
//     console.log('left: ', children)
// 	children[1].style.width = `${value}%`;
// 	children[5].style.left = `${value}%`;
// 	children[7].style.left = `${value}%`;
// 	children[11].style.left = `${value}%`;

// 	children[11].childNodes[1].innerHTML = e.target.value;
// });

// document.querySelector('#RangeSlider .range-slider-input-right').value = rangeSlider_max;
// document.querySelector('#RangeSlider .range-slider-input-right').addEventListener( 'input', e => {
// 	e.target.value = Math.max(e.target.value, e.target.parentNode.childNodes[3].value - (-1));
// 	var value = (100 / ( parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.value) - (100 / ( parseInt(e.target.max) - parseInt(e.target.min) )) * parseInt(e.target.min);

// 	var children = e.target.parentNode.childNodes[1].childNodes;
//     console.log('right: ', children);
// 	children[3].style.width = `${100-value}%`;
// 	children[5].style.right = `${100-value}%`;
// 	children[9].style.left = `${value}%`;
// 	children[13].style.left = `${value}%`;
// 	children[13].childNodes[1].innerHTML = e.target.value;
// });
