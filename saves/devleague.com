


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <title>(none)</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
    <style type="text/css">
        body {
        	font-family: Verdana, Arial, Helvetica, sans-serif;
        	font-size: 12px;
        	background-color:#367E8E;
        	scrollbar-base-color: #005B70;
        	scrollbar-arrow-color: #F3960B;
        	scrollbar-DarkShadow-Color: #000000;
        	color: #FFFFFF;
			margin:0;
        }
        a { color:#021f25; text-decoration:none}
        h1 {
        	font-size: 18px;
        	color: #FB9802;
        	padding-bottom: 10px;
        	background-image: url(sys_cpanel/images/bottombody.jpg);
        	background-repeat: repeat-x;
        	padding:5px 0 10px 15px;
			margin:0;
        }
        #body-content p {
        	padding-left: 25px;
        	padding-right: 25px;
        	line-height: 18px;
        	padding-top: 5px;
        	padding-bottom: 5px;
        }
        h2 {
        	font-size: 14px;
        	font-weight: bold;
        	color: #FF9900;
        	padding-left: 15px;
        }
    </style>
  </head>
  <body>
    <div id="body-content">  
<!-- start content-->

<!-- 
 instead of REQUEST_URI, we could show absolute URL via:
 http://HTTP_HOST/REQUEST_URI
    but what if its https:// or other protocol?
    
    SERVER_PORT_SECURE doesn't seem to be used
    SERVER_PORT logic would break if they use alternate ports
-->

<h1>(none)</h1>
<p>Your browser sent a request that this server could not understand:</p>
  <blockquote>
    (none)/ (port 80)
  </blockquote> 
<p>
    If you are the account owner, please submit ticket for further information.<br>
    <a href="http://support.a2hosting.com">
    Open Ticket</a>
</p>
<hr />


<!-- end content -->
    </div>
  </body>
</html>
