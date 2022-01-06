function $(a) {
    return document.querySelector(a);
}

function $A(a) {
    return document.querySelectorAll(a);
}

const b = $(".b"),
 	e = $(".e"),
 	c = $(".c"),
 	load = $(".load"),
 	hardArr = ["", "", "", "", "", "", "", "", ""],
 	easyArr = ["", "", "", "", "", "", "", "", ""],
 	twoArr = ["", "", "", "", "", "", "", "", ""];

let allGlobalPlayTwo = true,
	globalTwoPlayerX = true,
	localChangerNowX = true;

function checkLocalChangerNowX(runner,runnerIcon) {
	if (localChangerNowX) {
    	runner.style.left = "99px";
    	runnerIcon.style.transform = "rotate(0deg)";
    } else {
    	runner.style.left = "6px";
    	runnerIcon.style.transform = "rotate(180deg)";
    }
}

const modal = $(".modal"),
	resBtn = $(".restart");

function closedModal(event) {
    setTimeout(() => {
        resBtn.style.opacity = 0;
        resBtn.style.pointerEvents = "none";
        setTimeout(() => {
            modal.querySelector(".modal-box").innerHTML = "";
            modal.style.top = "-200vh";
            resBtn.removeEventListener("click", event);
        }, 320);
    }, 10);
}

function clearAllBox() {
	const allBox = $A(".inBox");
	
	hardArr.forEach((item,i) => {
		hardArr[i] = "";
		easyArr[i] = "";
		twoArr[i] = "";
	});

    allBox.forEach((box,i) => {
    	box.classList.remove("active");
    	box.style.color = "#fff";
        box.innerHTML = "";
    });
}

function restartGame() {
    closedModal(restartGame);
    clearAllBox();
    globalTwoPlayerX = true;
    playEasy();
    playHard();
    globalTwoPlayerX = true;
    playTwo();
    localChangerNowX = allGlobalPlayTwo;
}

function playHard(playerX) {
    const checkbox = $("input");

    const arr = hardArr;

    let nextX = playerX;

    const p = allGlobalPlayTwo ? "X" : "O";

    const cp = allGlobalPlayTwo ? "O" : "X";

    let nextP = nextX ? "X" : "O";


    const btns = $A(".c .inBox");
    const modal = $(".modal");
    const resBtn = $(".restart");

    const runner = $(".two .go-select-next-player");
    const runnerIcon = $(".two .go-select-next-player i");

    function closedModal(event) {
        setTimeout(() => {
            resBtn.style.opacity = 0;
            resBtn.style.pointerEvents = "none";
            setTimeout(() => {
                modal.querySelector(".modal-box").innerHTML = "";
                modal.style.top = "-200vh";
                resBtn.removeEventListener("click", event);
            }, 320);
        }, 10);
    }

    function openedModal(txt, event) {
        modal.querySelector(".modal-box").innerHTML = txt;

        resBtn.addEventListener("click", event);

        setTimeout(() => {
            modal.style.top = 0;
            setTimeout(() => {
                resBtn.style.opacity = 1;
                resBtn.style.pointerEvents = "all";
            }, 320);
        }, 10);
    }

    const winArr = [
        [[1, 2], [3, 6], [4, 8]],
        [[0, 2], [4, 7]],
        [[0, 1], [5, 8], [4, 6]],
        [[0, 6], [4, 5]],
        [[2, 6], [3, 5], [1, 7], [0, 8]],
        [[3, 4], [2, 8]],
        [[7, 8], [0, 3], [2, 4]],
        [[6, 8], [1, 4]],
        [[6, 7], [2, 5], [0, 4]]
    ];


    checkLocalChangerNowX(runner,runnerIcon);

    function findWinner(id) {
        const c = arr[id];
        if (typeof id === "number") {
            for (let i = 0; i < winArr[id].length; i++) {
                const f = arr[winArr[id][i][0]];
                const s = arr[winArr[id][i][1]];
                if (c === f && f === s) {
                    btns[id].style.color = "green";
                    btns[winArr[id][i][0]].style.color = "green";
                    btns[winArr[id][i][1]].style.color = "green";
                    load.style.display = "none";
                    openedModal(`${c} - Player Won`, () => restartGame());
                    break;
                } else if (i === winArr[id].length - 1) {
                    const a = arr.indexOf("");
                    if (a < 0) {
                        load.style.display = "none";
                        openedModal("Draw", () => restartGame());
                        break;
                    }
                }
            }
        }
    }
    if (!allGlobalPlayTwo) {
    	const randomChoose = Math.floor(Math.random() * arr.length);
    	arr[randomChoose] = "X" ;
        btns[randomChoose].innerHTML = "X";
        localChangerNowX = !localChangerNowX;
        setTimeout(() => {
        	btns[randomChoose].classList.add("active");
        },10);
    }

    checkLocalChangerNowX(runner,runnerIcon);

    function clickedBtn(id) {
        if (arr[id] === "") {
        	localChangerNowX = !localChangerNowX;

        	checkLocalChangerNowX(runner,runnerIcon);

            load.style.display = "block";

            arr[id] = allGlobalPlayTwo ? "X" : "O" ;

            btns[id].innerHTML = allGlobalPlayTwo ? "X" : "O";

            btns[id].classList.add("active");

            findWinner(id);
            let autoSelectedId = null;
            let randomDelay = Math.floor(Math.random() * 500);
            randomDelay = randomDelay < 50 ? 100 : randomDelay;
            setTimeout(() => {
                autoSelectedId = autoChoose(id, arr, allGlobalPlayTwo ? "O" : "X");

                load.style.display = "none";
                findWinner(autoSelectedId);
                btns[autoSelectedId].classList.add("active");
                localChangerNowX = !localChangerNowX;

                checkLocalChangerNowX(runner,runnerIcon);
            }, randomDelay);
        }
    }



    function autoChoose(id, arr, cp) {
        const boxArr = winArr[id];
        for (let i = 0; i < boxArr.length; i++) {
            const fId = boxArr[i][1];
            const sId = boxArr[i][0];
            const f = arr[fId];
            const s = arr[sId];
            const c = arr[id];
            if (c === f && s === "") {
                arr[sId] = cp;
                btns[sId].innerHTML = cp;
                return sId;
                break;

            } else if (c === s && f === "") {
                arr[fId] = cp;
                btns[fId].innerHTML = cp;

                return fId;
                break;

            } else if (f !== c && s === "") {
                if (i === boxArr.length - 1) {
                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;
                }
            } else if (s !== c && f === "") {
                if (i === boxArr.length - 1) {
                    arr[fId] = cp;
                    btns[fId].innerHTML = cp;
                    return fId;
                    break;
                }
            } else if (f === "" && c === "") {
                if (i === boxArr.length - 1) {
                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;
                }
            } else if (s !== "" && f === "") {
                if (i === boxArr.length - 1) {
                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;
                }
            } else if (f !== "" && s === "") {
                if (i === boxArr.length - 1) {
                    arr[fId] = cp;
                    btns[fId].innerHTML = cp;
                    return fId;
                    break;
                }
            } else {
                if (c === f && s === "") {
                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;
                } else if (c === s && f === "") {
                    arr[fId] = cp;
                    btns[fId].innerHTML = cp;
                    return fId;
                    break;
                } else if (s === "") {
                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;
                } else if (f === "") {
                    arr[fId] = cp;
                    btns[fId].innerHTML = cp;
                    return fId;
                    break;
                } else if (f !== c && s === "") {

                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;

                } else if (s !== c && f === "") {

                    arr[fId] = cp;
                    btns[fId].innerHTML = cp;
                    return fId;
                    break;

                } else if (f === "" && c === "") {

                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;
                } else if (s !== "" && f === "") {

                    arr[sId] = cp;
                    btns[sId].innerHTML = cp;
                    return sId;
                    break;
                } else if (f !== "" && s === "") {

                    arr[fId] = cp;
                    btns[fId].innerHTML = cp;
                    return fId;
                    break;
                } else {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === "") {
                            arr[i] = cp;
                            btns[i].innerHTML = cp;
                            return i;
                            break;


                        }
                    }
                }
                break;

            }
        }
    }


    const pureBoxs = $A(".c .box");

    pureBoxs.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            clickedBtn(i);
        });
    });
}

function playTwo() {
    load.style.display = "none";
    const arr = twoArr;

    let nextX = globalTwoPlayerX;
    const runner = $(".one .go-select-next-player");
    const runnerIcon = $(".one .go-select-next-player i");

    const btns = $A(".b .inBox");

    const winArr = [
        [[1, 2], [3, 6], [4, 8]],
        [[0, 2], [4, 7]],
        [[0, 1], [5, 8], [4, 6]],
        [[0, 6], [4, 5]],
        [[2, 6], [3, 5], [1, 7], [0, 8]],
        [[3, 4], [2, 8]],
        [[7, 8], [0, 3], [2, 4]],
        [[6, 8], [1, 4]],
        [[6, 7], [2, 5], [0, 4]]
    ];


    function openedModal(txt, event) {
        modal.querySelector(".modal-box").innerHTML = txt;

        resBtn.addEventListener("click", event);

        setTimeout(() => {
            modal.style.top = 0;
            setTimeout(() => {
                resBtn.style.opacity = 1;
                resBtn.style.pointerEvents = "all";
            }, 320);
        }, 10);
    }

    function findWinner(id) {
        const c = arr[id];
        if (typeof id === "number") {
            for (let i = 0; i < winArr[id].length; i++) {
                const f = arr[winArr[id][i][0]];
                const s = arr[winArr[id][i][1]];
                if (c === f && f === s) {
                    btns[id].style.color = "green";
                    btns[winArr[id][i][0]].style.color = "green";
                    btns[winArr[id][i][1]].style.color = "green";
                    openedModal(`${c} Player Won`, () => restartGame());
                    break;
                } else if (i === winArr[id].length - 1) {
                    const a = arr.indexOf("");
                    if (a < 0) {
                        openedModal("Draw", () => restartGame());
                        break;
                    }
                }
            }
        }
    }

    if (globalTwoPlayerX) {
    	runner.style.left = "99px";
    	runnerIcon.style.transform = "rotate(0deg)";
    } else {
    	runner.style.left = "6px";
    	runnerIcon.style.transform = "rotate(180deg)";
    }

    function clickedBox(id) {
        if (arr[id] === "") {
            const p = globalTwoPlayerX ? "X" : "O";

            arr[id] = p;
            btns[id].innerHTML = p;
            globalTwoPlayerX = !globalTwoPlayerX;
            btns[id].classList.add("active");
            findWinner(id);

            if (globalTwoPlayerX) {
            	runner.style.left = "99px";
            	runnerIcon.style.transform = "rotate(0deg)";
            } else {
            	runner.style.left = "6px";
            	runnerIcon.style.transform = "rotate(180deg)";
            }
        }
    }

    const pureBoxs = $A(".b .box");
    pureBoxs.forEach((btn, i) => {
        btn.addEventListener("click",e => {
            clickedBox(i);
        });
    });

}

function playEasy(playerX) {
	localChangerNowX = allGlobalPlayTwo
    const arr = easyArr;

    let nextX = playerX;

    const p = allGlobalPlayTwo ? "X" : "O";

    const cp = allGlobalPlayTwo ? "O" : "X";

    let nextP = nextX ? "X" : "O";


    const winArr = [
        [[1, 2], [3, 6], [4, 8]],
        [[0, 2], [4, 7]],
        [[0, 1], [5, 8], [4, 6]],
        [[0, 6], [4, 5]],
        [[2, 6], [3, 5], [1, 7], [0, 8]],
        [[3, 4], [2, 8]],
        [[7, 8], [0, 3], [2, 4]],
        [[6, 8], [1, 4]],
        [[6, 7], [2, 5], [0, 4]]
    ];

    const btns = $A(".e .inBox");
    const modal = $(".modal");
    const resBtn = $(".restart");

    const runner = $(".two .go-select-next-player");
    const runnerIcon = $(".two .go-select-next-player i");

    function closedModal(event) {
        setTimeout(() => {
            resBtn.style.opacity = 0;
            resBtn.style.pointerEvents = "none";
            setTimeout(() => {
                modal.querySelector(".modal-box").innerHTML = "";
                modal.style.top = "-200vh";
                resBtn.removeEventListener("click", event);
            }, 320);
        }, 10);
    }


    function openedModal(txt, event) {
        modal.querySelector(".modal-box").innerHTML = txt;

        resBtn.addEventListener("click", event);

        setTimeout(() => {
            modal.style.top = 0;
            setTimeout(() => {
                resBtn.style.opacity = 1;
                resBtn.style.pointerEvents = "all";
            }, 320);
        }, 10);
    }

    function findWinner(id) {
        const c = arr[id];
        if (typeof id === "number") {
            for (let i = 0; i < winArr[id].length; i++) {
                const f = arr[winArr[id][i][0]];
                const s = arr[winArr[id][i][1]];
                if (c === f && f === s) {
                    btns[id].style.color = "green";
                    btns[winArr[id][i][0]].style.color = "green";
                    btns[winArr[id][i][1]].style.color = "green";
                    load.style.display = "none";
                    openedModal(`${c} Player Won`, () => restartGame());
                    return true;
                    break;
                } else if (i === winArr[id].length - 1) {
                    const a = arr.indexOf("");
                    if (a < 0) {
                        load.style.display = "none";
                        openedModal("Draw", () => restartGame());
                        return false;
                        break;
                    }
                }
            }
        }
    }

    if (localChangerNowX) {
    	runner.style.left = "99px";
    	runnerIcon.style.transform = "rotate(0deg)";
    } else {
    	runner.style.left = "6px";
    	runnerIcon.style.transform = "rotate(180deg)";
    }

    if (!allGlobalPlayTwo) {
    	const randomChoose = Math.floor(Math.random() * arr.length);
    	arr[randomChoose] = "X" ;
        btns[randomChoose].innerHTML = "X";
        localChangerNowX = localChangerNowX ? !localChangerNowX : localChangerNowX;
        setTimeout(() => {
        	btns[randomChoose].classList.add("active");
        },900);
	}

    if (localChangerNowX) {
    	runner.style.left = "99px";
    	runnerIcon.style.transform = "rotate(0deg)";
    } else {
    	runner.style.left = "6px";
    	runnerIcon.style.transform = "rotate(180deg)";
    }

    function clickedBtn(id) {
        if (arr[id] === "") {
        	localChangerNowX = !localChangerNowX;

        	if (localChangerNowX) {
		    	runner.style.left = "99px";
		    	runnerIcon.style.transform = "rotate(0deg)";
		    } else {
		    	runner.style.left = "6px";
		    	runnerIcon.style.transform = "rotate(180deg)";
		    }
            load.style.display = "block";

            arr[id] = allGlobalPlayTwo ? "X" : "O";
            btns[id].innerHTML = allGlobalPlayTwo ? "X" : "O";
            btns[id].classList.add("active");

            const gameOver = findWinner(id);

            if (!gameOver) {
                autoChoose(arr, allGlobalPlayTwo ? "O" : "X");
            }
        }
    }



    function autoChoose(arr, cp) {
        const freeArr = [];

        arr.forEach((item, i) => {
            if (item === "") {
                freeArr.push(i);
            }
        });
        if (freeArr.length) {

            const rS = freeArr[Math.floor(Math.random() * freeArr.length)];

            let randomDelay = Math.floor(Math.random() * 1000);
            randomDelay = randomDelay < 100 ? 200 : randomDelay;

            setTimeout(() => {
                arr[rS] = cp;
                btns[rS].innerHTML = cp;
                load.style.display = "none";
                findWinner(rS);
                btns[rS].classList.add("active");
                localChangerNowX = !localChangerNowX;

	            if (localChangerNowX) {
			    	runner.style.left = "99px";
			    	runnerIcon.style.transform = "rotate(0deg)";
			    } else {
			    	runner.style.left = "6px";
			    	runnerIcon.style.transform = "rotate(180deg)";
			    }
                return rS;
            }, randomDelay);
        }
    }



    const pureBoxs = $A(".e .box");

    pureBoxs.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            clickedBtn(i);
        });
    });   
}

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        c.style.display = "grid";
        e.style.display = "none";
        hardArr.forEach((item,i) => {
            hardArr[i] = "";
            easyArr[i] = "";
            twoArr[i] = "";
        });
        clearAllBox();
        playHard(true);
    } else {
        c.style.display = "none";
        e.style.display = "grid";
        hardArr.forEach((item,i) => {
            hardArr[i] = "";
            easyArr[i] = "";
            twoArr[i] = "";
        });
        clearAllBox();
        playEasy(false);
    }
    localChangerNowX = allGlobalPlayTwo;
});

const oneP = $(".select-1"), 
	twoP = $(".select-2"),
	one = $(".one"),
	two = $(".two"),
	select = $(".select"), 
	backFromOne = $(".one-i .icon"), 
	backFromTwo = $(".two-i.icon"), 
	selectP = $(".select-p"),
	selectX = $(".select-x"), 
	selectO = $(".select-o"), 
	backFromSelectXO = $(".backFromSelectXO .icon"); 

selectX.addEventListener("click",() => {
	selectP.style.opacity = 0;

	setTimeout(() => {
		selectP.style.display = "none";
		setTimeout(() => {
			two.style.display = "flex";
			setTimeout(() => {
				two.style.opacity = 1;
			},301);
		},1);
	},301);

    allGlobalPlayTwo = true;
    localChangerNowX = true;

    hardArr.forEach((item,i) => {
        hardArr[i] = "";
        easyArr[i] = "";
        twoArr[i] = "";
    });
    clearAllBox();
    playEasy(true);
});

selectO.addEventListener("click",() => {
	selectP.style.opacity = 0;

	setTimeout(() => {
		selectP.style.display = "none";
		setTimeout(() => {
			two.style.display = "flex";
			setTimeout(() => {
				two.style.opacity = 1;
			},301);
		},1);
	},301);

    allGlobalPlayTwo = false;
    localChangerNowX = false;

    hardArr.forEach((item,i) => {
        hardArr[i] = "";
        easyArr[i] = "";
        twoArr[i] = "";
    });
    clearAllBox();
    playEasy(false);
});

backFromSelectXO.addEventListener("click",() => {
	selectP.style.opacity = 0;
	clearAllBox();

	setTimeout(() => {
		selectP.style.display = "none";
		setTimeout(() => {
			select.style.display = "flex";
			setTimeout(() => {
				select.style.opacity = 1;
			},301);
		},1);
	},301);
});

oneP.addEventListener("click",() => {
	playTwo();
	clearAllBox();
	globalTwoPlayerX = true;

	select.style.opacity = 0;

	setTimeout(() => {
		select.style.display = "none";
		setTimeout(() => {
			one.style.display = "flex";
			setTimeout(() => {
				one.style.opacity = 1;
			},301);
		},1);
	},301);
});

backFromOne.addEventListener("click",() => {
	one.style.opacity = 0;
	restartGame();

	setTimeout(() => {
		one.style.display = "none";
		setTimeout(() => {
			select.style.display = "flex";
			setTimeout(() => {
				select.style.opacity = 1;
			},301);
		},1);
	},301);
});

twoP.addEventListener("click",() => {
	select.style.opacity = 0;
	clearAllBox();

	setTimeout(() => {
		select.style.display = "none";
		setTimeout(() => {
			selectP.style.display = "flex";
			setTimeout(() => {
				selectP.style.opacity = 1;
			},301);
		},1);
	},301);
});
backFromTwo.addEventListener("click",() => {
	restartGame();
	two.style.opacity = 0;

	setTimeout(() => {
		two.style.display = "none";
		setTimeout(() => {
			selectP.style.display = "flex";
			setTimeout(() => {
				selectP.style.opacity = 1;
			},301);
		},1);
	},301);
});