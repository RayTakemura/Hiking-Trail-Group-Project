
// document.querySelectorAll('.col-lg-4').forEach(card => {
//     card.addEventListener('click', event =>{
//         event.preventDefault();
//         const id = $(this).attr('id');
//         console.log(id);
//     })
// });


// $('.col-lg-4').click( function(event) {
//     event.preventDefault();
//     const id = $(this).attr('id');
//     console.log(id);
// }); 

function reply_click(clicked_id){
    console.log(clicked_id);
    goToSingleTrail(clicked_id);
}

function goToSingleTrail(clicked_id) {
    document.location.replace('/trail/' + clicked_id);

};