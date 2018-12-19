// load All memo of selected user
const loadMemo = userId => {
  getter(`memo?userId=${userId}`).then(res => {
    res.length > 0 ? changeSection(res) : changeSection()
  })
}

// after last child of contentBox memo Data rendering
const renderLoadedMemo = memo => {
  memoBox.classList.toggle("memo--close", false)
  memo.map(memo => makeMemoElement(memo))
}

// create memo
const createMemo = e => {
  e.preventDefault()
  if (blankChecker(input.value)) {
    alert("공백은 사용 불가능합니다")
    input.value = ""
    return false
  } else {
    adder({
      path: "memo",
      title: textChanger(input.value),
      userId: lsUserId
    }).then(res => {
      memoBox.classList.toggle("memo--close", false)
      makeMemoElement(res)
    })
    input.value = ""
  }
}

/* memo element return */
const makeMemoElement = memo => {
  return memoBox.insertAdjacentHTML(
    "afterbegin",
    `<li class="memo-item text"><span class="memo-title">${
      memo.title
    }</span><i class="fas fa-backspace" onclick="deleteMemo(${memo.id},'${
      memo.title
    }')"></i></li>`
  )
}

/* delete memo */
const deleteMemo = (id, title) => {
  const memos = [...memoBox.children]
  const idx = memos.findIndex(val => val.textContent === title)
  deleter(id).then(() => {
    memoBox.children[idx].remove()
    if (memoBox.childElementCount === 0) {
      memoBox.classList.toggle("memo--close", true)
    }
  })
}
