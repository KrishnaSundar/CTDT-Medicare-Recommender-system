// Form will change from login to register and visa-versa based
// on if the user is already "registered"
// "Usernames" min-len is 5 chars

// These users "already exist"
// sample check using a list of user names in an array 
// later TODO : comment it and then add a post request to fetch users list from db

var users = [
{ name: 'swagath' },
{ name: 'krishna' },
{ name: 'prasanna' }
]

var loginform = {
  
  init: function() {
    this.bindUserBox();
  },
  
  bindUserBox: function() {

    var result = {};
    
    $(".form").delegate("input[name='un']", 'blur',  function() {
     
      var $self = $(this); 
      // this grep would be replaced by $.post to check the db for user that we find is there or not
      result = $.grep(users, function(elem, i){  
        return (elem.name == $self.val());
      });
      
      // This would be callback
      if (result.length === 1) {
        if( $("div.login-wrap").hasClass('register')) {
          loginform.revertForm();
          return;
        }
        else{
          return;
        }
      }
      
      if( !$("div.login-wrap").hasClass('register') ) {
        if ( $("input[name='un']").val().length > 4 )
            loginform.switchForm();
        else 
            alert( "Username must have atleast 5 characters !!!" );  
      }

    });

    function checkPassword( str ) {
      var result = true;
      result = result && (str ? (/[a-z]/.test(str)) : false);
      result = result && (str ? (/[A-Z]/.test(str)) : false);
      result = result && (str ? (/[0-9]/.test(str)) : false);
      return result;
    }

    // password handler
    $(".form").delegate("input[name='rpw']", 'blur',  function() {
    
      if( $("div.login-wrap").hasClass('register') ) {

        var passwordText = $("input[name='pw']").val(); 
        var retypePasswordText = $("input[name='rpw']").val();

        if ( passwordText.length == 0 ) {
            alert( "Password is required !!!" );
        }
        else if( passwordText.length < 8 ) {
            alert( "Password is too short needed atleast 8 characters !!!" );
        }
        else {
          if( !checkPassword( passwordText ) ) {
            alert( "Password must contain small and big alphabets and numbers !!!" );  
          }
        }

        if( passwordText !== retypePasswordText ) {
          alert( "password retype mismatch !!!" );  
        }      
      }

    });
  },

  switchForm: function() {
    var $html = $("div.login-wrap").addClass('register');
    $html.children('h2').html('Register');
    $html.find(".form input[name='pw']").after("<input type='password' placeholder='Re-type password' name='rpw' />");
    // TODO : add the extra fields for the form inplace here
    $html.find("button[name='nsignin']").html('Sign up');
    $html.find("button[name='asignin']").hide();
    //$html.find("button[name='asignin']").html('Sign up as Admin');
    $html.find('a p').html('Have an account? Sign in');
    $html.find('a p').attr( "onclick" , "loginform.revertForm()" );
  },

  revertForm: function() {
    var $html = $("div.login-wrap").removeClass('register');
    $html.children('h2').html('Login');
    $html.find(".form input[name='rpw']").remove();
    $html.find("button[name='nsignin']").html('Sign in');
    $html.find("button[name='asignin']").show();
    //$html.find("button[name='asignin']").html('Sign in as Admin');
    $html.find('a p').html("Don't have an account? Register");
    $html.find('a p').attr( "onclick" , "loginform.switchForm()" );
  },
} // loginform {}

// Init login form
loginform.init();

// vertical align box   
(function(elem){ 
    elem.css("margin-top", Math.floor( ( $(window).height() / 2 ) - ( elem.height() / 2 ) ) );
}($(".login-wrap")));

$(window).resize(function(){
    $(".login-wrap").css("margin-top", Math.floor( ( $(window).height() / 2 ) - ( $(".login-wrap").height() / 2 ) ) );
});
