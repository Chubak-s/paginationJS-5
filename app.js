async function getData()  {
    const response = await fetch("http://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
}

async function main(){
    const postsData = await getData();
    let currPage = 1;
    let rows = 10;
    function displayList(arrData, rowPerPage, page){
        const postsEl = document.querySelector('.posts');

        const start = rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach((el) => {
            const post = document.createElement("div");
            post.classList.add("post");
            post.innerText = `${el.title}`;
            postsEl.appendChild(post);
        })

    }
    function displayPagination(arrData, rows){
        const pagination = document.querySelector('.pagination');
        const amountOfPages = arrData.length/rows;
        for (let i=1; i<=amountOfPages; i++){
            const pagesBtn = document.createElement("button");
            pagesBtn.type="button";
            pagesBtn.innerText=`${i}`;
            pagesBtn.classList.add('pagination__item');
            pagination.appendChild(pagesBtn);
            displayPaginationBtn(arrData, rows, i, pagesBtn);
            if (i===1){pagesBtn.classList.add('pagination__item--active');}
        }
    }
    function displayPaginationBtn(arrData, rowPerPage, page, pagesBtn){
        pagesBtn.addEventListener("click", ()=>{
            const postsEl = document.querySelector('.posts');
            postsEl.innerHTML=``;
            displayList(arrData, rowPerPage, page);
            let pagesButtons = document.querySelectorAll("button");
            pagesButtons.forEach(button => {
                button.classList.remove('pagination__item--active');
            });
            pagesBtn.classList.add('pagination__item--active');
        });
    }

    displayList(postsData, rows, currPage);
    displayPagination(postsData, rows, currPage);
}

main();