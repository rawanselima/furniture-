let links_header = document.querySelectorAll(".header .page-item");
let popup_category = document.querySelector(".header .popup-category");
let none_divs = document.querySelectorAll(".none");

links_header.forEach((link) => {
  link.addEventListener("click", () => {
    links_header.forEach((ele) => {
      ele.classList.remove("active");
    });
    link.classList.add("active");
    if (link.textContent.includes("Category"))
      popup_category.classList.add("appear");
    else popup_category.classList.remove("appear");

    none_divs.forEach((div) => {
      if (div.getAttribute("name") == link.getAttribute("name"))
        div.style.display = "block";
      else div.style.display = "none";
    });
  });
});

let view_cart_btn = document.querySelector(".add-success .data .btn");
view_cart_btn.addEventListener("click", () => {
  none_divs.forEach((div) => {
    div.style.display = "none";
    if (div.getAttribute("name") == "cart") div.style.display = "block";
  });

  links_header.forEach((ele) => {
    ele.classList.remove("active");

    if (ele.getAttribute("name") == "cart") ele.classList.add("active");
  });
});

let boxs_unique_style = document.querySelectorAll(".products .box");
let input_search = document.querySelector(".product .side input");
let search_btn_side = document.querySelector(".product .side .btn");
let select = document.querySelector(".product .side select");
let options = document.querySelectorAll(".product .side option");

search_btn_side.addEventListener("click", () => {
  boxs_unique_style.forEach((box) => {
    if (
      window
        .getComputedStyle(box, "::after")
        .getPropertyValue("content")
        .toLowerCase()
        .includes(input_search.value.toLowerCase())
    )
      box.style.display = "block";
    else box.style.display = "none";
  });
});

select.addEventListener("change", () => {
  options.forEach((option) => {
    boxs_unique_style.forEach((box) => {});
  });
});

boxs_unique_style.forEach((box) => {
  box.addEventListener("mouseover", () => {
    box.querySelector("img").src = box
      .querySelector("img")
      .getAttribute("data-set");
  });

  box.addEventListener("mouseout", () => {
    box.querySelector("img").src = box
      .querySelector("img")
      .getAttribute("data-img");
  });
});

let search_btn = document.querySelectorAll(".products .box .icons .search-btn");

search_btn.forEach((search, index) => {
  search.addEventListener("click", () => {
    document.querySelectorAll(".products .box .icons")[index].style.opacity = 1;
  });
});

let btn_close_modal = document.querySelectorAll(
  ".products .box .icons .btn-close-modal"
);
let btn_close_modal1 = document.querySelectorAll(
  ".products .box .icons .btn-close-modal1"
);

btn_close_modal.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".products .box .icons")[index].style.opacity = 0;
  });
});

btn_close_modal1.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".products .box .icons")[index].style.opacity = 0;
  });
});

let imgs_modal = document.querySelectorAll(".box .icons .image img");

imgs_modal.forEach((img) => {
  img.addEventListener("click", () => {
    const box = img.closest(".box");

    const imageInBox = box.querySelector(".active");
    imageInBox.src = img.src;
  });
});

let plus_btn = document.querySelectorAll(
  ".products .box .modal .quantity .plus"
);
let minus_btn = document.querySelectorAll(
  ".products .box .modal .quantity .minus"
);

let count = 1;

plus_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".quantity").querySelector(".number").innerHTML = ++count;
  });
});

minus_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (count > 1)
      btn.closest(".quantity").querySelector(".number").innerHTML = --count;
  });
});

let arr_cart = [];
let cart_table = document.querySelector(".cart table");
let checkout_total = document.querySelector(".cart .checkout .total");

if (
  localStorage.getItem("cart") == "" ||
  localStorage.getItem("cart") == null
) {
  arr_cart = [];
  checkout_total.innerHTML = "Total:$0 ";
} else {
  arr_cart = JSON.parse(localStorage.getItem("cart"));

  arr_cart.forEach((cart) => {
    cart_table.innerHTML += `
    <tr class=${cart.id}>
        <td><i class="fa-solid fa-xmark"></i></td>
        <td>
          <img src="${cart.img}"alt=" ">
        </td>
        <td>${cart.product}</td>
        <td>$${cart.price}</td>
        <td>
          <span class="number">${cart.quantity}</span>
        </td>
        <td>${cart.price * cart.quantity} </td>
      </tr>
`;
  });

  checkout(arr_cart);
}

let cart_btn = document.querySelectorAll(".products .box .cart-btn");

let icons_delete = document.querySelectorAll(".cart i");

let success_icon = document.querySelector(".add-success .correct");
let success_data = document.querySelector(".add-success .data");

icons_delete.forEach((icon) => {
  icon.addEventListener("click", () => {
    delete_cart(icon);
  });
});

cart_btn.forEach((cart) => {
  cart.addEventListener("click", () => {
    let box = cart.closest(".box");
    create_cart(box);

    success_icon.classList.add("success");
    setTimeout(() => {
      success_icon.classList.remove("success");

      success_data.classList.add("success");
    }, 2000);

    setTimeout(() => {
      success_data.classList.remove("success");
    }, 5000);
  });
});

function create_cart(box) {
  let obj = {
    id: Date.now(),
    img: box.querySelector(".active").src,
    product: box.querySelector(".content .title").textContent.toLowerCase(),
    price: parseInt(
      box.querySelector(".content .price").textContent.replace("$", "")
    ),
    quantity: parseInt(
      box.querySelector(".content .quantity .number").textContent
    ),
  };

  cart_table.innerHTML += `
      <tr class=${obj.id} >
          <td><i class="fa-solid fa-xmark"></i></td>
          <td>
            <img src="${obj.img}"alt=" ">
          </td>
          <td>${obj.product}</td>
          <td>$${obj.price}</td>
          <td>
            <span class="number">${obj.quantity}</span>
          </td>
          <td>${obj.price * obj.quantity} </td>
        </tr>
  `;

  arr_cart.push(obj);

  checkout(arr_cart);

  localStorage.setItem("cart", JSON.stringify(arr_cart));
}

function delete_cart(icon) {
  arr_cart.forEach((arr, index) => {
    if (arr.id == icon.closest("tr").className) {
      arr_cart.splice(index, 1);
    }
  });
  icon.closest("tr").innerHTML = "";
  checkout(arr_cart);
  localStorage.setItem("cart", JSON.stringify(arr_cart));
}

function checkout(arr) {
  let count = 1;
  arr.forEach((item) => {
    count += item.quantity * item.price;
  });

  checkout_total.innerHTML = `Total : $${count}`;
}

let image_about = document.querySelector(".about .image img");
image_about.addEventListener("mouseover", () => {
  image_about.src = "./images/img5.jpg";
});
image_about.addEventListener("mouseout", () => {
  image_about.src = "./images/img4.jpg";
});

let progress_bar = document.querySelectorAll(".progress .progress-bar");
let ratio = document.querySelectorAll(".about .content .progress-box .ratio");

let nums = document.querySelectorAll(".about .numbers .num");

let scroll_btn = document.querySelector(".scroll-btn");

let flage = false;
let check = false;
window.addEventListener("scroll", () => {
  if (
    document.documentElement.scrollTop >=
      document.querySelector(".about .content").offsetHeight &&
    document.documentElement.scrollTop != 0 &&
    document.querySelector(".about .content").offsetHeight != 0 &&
    flage === false
  ) {
    for (let i = 0; i < progress_bar.length; i++) {
      progress_bar[i].style.width = progress_bar[i].getAttribute("data");
      ratio[i].style.left = progress_bar[i].getAttribute("data");
      let count = 1;

      let timer = setInterval(() => {
        ratio[i].innerHTML = `${count}%`;
        count++;
        if (
          count > Number(progress_bar[i].getAttribute("data").replace("%", ""))
        ) {
          clearInterval(timer);
        }
      }, 2000 / Number(progress_bar[i].getAttribute("data").replace("%", "")));
    }

    flage = true;
  }

  if (
    document.documentElement.scrollTop >=
      document.querySelector(".about .numbers").offsetHeight &&
    check == false &&
    document.documentElement.scrollTop != 0 &&
    document.querySelector(".about .numbers").offsetHeight != 0
  ) {
    check = true;

    nums.forEach((num) => {
      let count = 1;
      let timer = setInterval(() => {
        num.textContent = count++ + "+";
        if (count > Number(num.getAttribute("data"))) clearInterval(timer);
      }, 2000 / Number(num.getAttribute("data")));
    });
  }

  if (
    document.documentElement.scrollTop >= document.documentElement.clientHeight
  ) {
    scroll_btn.style.right = "20px";
    scroll_btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: "smooth", // Optional: for smooth scrolling
      });
    });
  } else if (
    document.documentElement.scrollTop < document.documentElement.clientHeight
  ) {
    scroll_btn.style.right = "-100%";
  }
});
