document.querySelectorAll(".price").forEach(function(e){e.textContent=new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(e.textContent)});