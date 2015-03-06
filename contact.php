<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="assets/ico/favicon.ico">

    <title>Lab 7 &mdash; Contact</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Static navbar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
            <a class="navbar-brand" href="index.html"><img src="../initialsLogoSmall.png" alt="overlapping letters: B and D">Beth Dellea</a>
        </div>
       <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li class="active"><a href="#">Top</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.php">Contact Me</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>


	<div id="contactwrap">
	    <div class="container">
			<div class="row">
				<div class="col-lg-6 col-lg-offset-3">
					<h1>CONTACT ME</h1>
				</div>
			</div><! --/row -->
	    </div> <!-- /container -->
	</div><! --/workwrap -->
	
	<section id="works"></section>
	<div class="container">
		<div class="row centered mt mb">
			<div class="col-lg-6 col-lg-offset-3">
				<h4>Email Me</h4>
                <p>Send emails using <a href="mailto:edellea1@ithaca.edu" class="btn btn-lg btn-primary btn-block">this link!</a> </p>
			</div>
			<div class="col-lg-6 contained">
                <br>
                <h3>Visitor Survey: </h3>
                <p><small>* indicates required field.</small></p>
                <br>
                <div id="forms">
                  <form action="contact.html" method="post" id="contactForm" data-parsley-validate>
                    <label for="fullname">Full Name * :</label>
                    <input type="text" name="fullname" required />
                   <label for="email">Email address * :</label>
                    <input type="email" name="email" data-parsley-trigger="change" required />
                    

                     <label for="heard">Found me through *:</label>
                      <select id="heard" required>
                        <option value="">Choose..</option>
                        <option value="wiki">Course Wiki</option>
                        <option value="net">Internet</option>
                        <option value="mouth">Word of mouth</option>
                        <option value="other">Other..</option>
                      </select>
                  <br>
                          
                          <label for="message">Comments (20 chars min, 300 max) :</label><br>
                          <textarea name="message" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="300" data-parsley-validation-threshold="10" data-parsley-minlength-message = "Come on! You need to enter at least a 20 caracters long comment.."></textarea>
                      <input type="submit" value="Submit">
                  </form>
                </div> <!--forms -->
            </div>
            <div class="col-lg-6">
                <h3>Comment Postings</h3>

                <?php
                    $filename = "comments.txt";

                    $fp = fopen($filename, 'a+');
                    if ($fp==false){
                        echo("Error: Could not open $filename");
                    }
                    else{
                        if(isset($_POST['comment']) && isset($_POST['uname'])){
                        date_default_timezone_set('America/New_York');
                        fwrite($fp, date('c').' &*& ');
                        fwrite($fp, $_POST['uname'].' &*& ');
                        fwrite($fp, $_POST['comment'].' &*& ');
                        fwrite($fp, ' %^% ');
                        fclose($fp);
                        }
                    }
                    $fp2 = file_get_contents($filename);
                    if(empty($fp2)){
                         echo("<div class=\"postbox cleared\">
                         <div class=\"infobox cleared\">
                        </div><!--infobox-->
                         <div class=\"commentbox\"><p><b>Be the first to comment!</b></p></div><!--commentbox-->
                         </div><!--posting-->");
                    }

                    else{
                         $posts = explode('%^%' , $fp2 );
                        for($i =count($posts)-2; $i>=0;$i--){
                            $postInfo = explode('&*&', $posts[$i]);
                            $dateTime = explode('T', $postInfo[0]);
                            $time = explode('-', $dateTime[1]);
                        echo ("
                        <div class=\"postbox cleared\">
                        <div class=\"infobox cleared\">
                            <p>On".$dateTime[0]." at ".$time[0]."</p>
                            <p><b>".$postInfo[1]."</b> posted:</p>
                        </div><!--infobox-->

                        <div class=\"commentbox\">
                            <p>".nl2br($postInfo[2])."</p>
                        </div><!--commentbox-->
                        </div><!--posting-->");
                        }
                    }

                ?>
            </div><!--col-lg-6-->
		</div><!--/row -->
	</div><!--/container -->
	


	<div id="footerwrap">
		<div class="container">
			<div class="row centered">
				<div class="col-lg-4">
						<p><b>
                            something witty
                            </b></p>
				</div>
				<div class="col-lg-4">
					<img src="../initialsLogoSmall.png" alt="overlapping letters: B and D" class="myLogo">
				</div>
                <div class="col-lg-4">
					<p>Living in Ithaca &amp; Boston. <br><small>(By parts)</small></p>
				</div>
			
			</div>
		
		</div>
	</div><!--/footerwrap -->
	


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/parsley.min.js"></script>
  </body>
</html>
