document.querySelector('.google-6adxtmm530').addEventListener('click',function(){
    chrome.runtime.sendMessage({cmd: 'getAuthorize'}, function (signedIn) {
        if(signedIn){
            document.querySelector('.ji2tnzm452').style.display = 'none';
            document.querySelector('.upito3e84n').style.display = 'block';
            document.querySelector('.p6ehrhiav2').onclick = signOutClick;
        }else{
            document.querySelector('.ji2tnzm452').style.display = 'block';
            document.querySelector('.upito3e84n').style.display = 'none';

        }
    });
})

chrome.storage.local.get(['tokens'], function(result) {
 if(result.tokens){
    document.querySelector('.ji2tnzm452').style.display = 'none';
    document.querySelector('.upito3e84n').style.display = 'block';
    document.querySelector('.p6ehrhiav2').onclick = signOutClick;
 }else{
    document.querySelector('.ji2tnzm452').style.display = 'block';
    document.querySelector('.upito3e84n').style.display = 'none';

 }
  });

function signOutClick(event){
    chrome.runtime.sendMessage({cmd: 'signOut'}, function () {
     console.log('works');
     document.querySelector('.ji2tnzm452').style.display = 'block';
     document.querySelector('.upito3e84n').style.display = 'none';  
        
});
}

let allDate = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"});
$('.x9v42lx9m9').html(allDate);
$( ".umma37171x" ).click(function() {
    let ul =  $('ul');
    let val = $('.pq4q5qh3a6').val();
    let textArea = $('.h8k60bye3t').val();
    let divDate = $('.x9v42lx9m9').html();
    if(val.length > 0){
       let itemList = `
       <div class="qb9o8ilb1e">
       <div class="xne3h28zs6">${allDate}</div>
       <div><li class="movo5t4827"><span style="margin-left:10px">${val}</span></li></div>
       <div class="qqpsha6z32""></div>
       <div class="b3eo410mee"></div>
       </div>`;  

       ul.append(itemList);

       let fullDiv = `<div class="chkhka194i">
       <div class="f12sydxo1o">
          <div class="t55msxe89i">
             <div class="fpivagxypk">
                <div class="dyiqyuhcmd">${val}</div>
                <div class="lzvaonijkz">
                <textarea class="ep2qf2fwy6" disabled>${textArea}</textarea>
             </div>
             </div>
          </div>
          <div class="hvafvg7g06">
            <div class="u0fh0j9ps6">${allDate}</div>
            <div class="apmgvv8am4"><img src="../images/back.png"></div> 
          </div>
       </div>
       </div>`;
       
       $('.mfqqihmd9p').append(fullDiv);
       $(".b3eo410mee").click(function () {
       let index2 = $(this).parent().index();
       console.log(index2);
       document.querySelectorAll('.chkhka194i')[index2].remove();
       $(this).parent().remove();
       });
        
      $('.qqpsha6z32').click(function(){  
      let ind = $(this).parent().index();
      let div =  document.querySelectorAll('.chkhka194i')[ind].innerText;
      console.log(div)
      const el = document.createElement('textarea');
      el.value = div;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      console.log(ind);  
     })
       $(".movo5t4827").click(function () {
       $(this).parent().parent().parent().css("display", "none"); 
       let index3 = $(this).parent().parent().index();
       document.querySelectorAll('.chkhka194i')[index3].classList.add("hhhvlbqlhm");
       let fsdsd = $('.ep2qf2fwy6').text();
       fsdsd.trim()
       console.log(fsdsd)
       setTimeout(() =>{  
        $('.f12sydxo1o').addClass( "bazv1l3n6z" );
       }, 10);

        $( ".apmgvv8am4" ).click(function() {
            setTimeout(() =>{  
            $('.chkhka194i').removeClass( "hhhvlbqlhm" )
            }, 1000);
            $('.f12sydxo1o').removeClass( "bazv1l3n6z" );
            setTimeout(() =>{
                $('.v3bxepp98i').css("display", "block")
            },1000);
        });
    });
       
    }
    else{
        console.log('not write')
    }
   
    let val2 = $('.pq4q5qh3a6');
    val2.val('');
    let TeaxtArea2 = $('.h8k60bye3t');
    TeaxtArea2.val('');
  });



