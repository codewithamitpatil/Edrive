const welcomeTemp = async (data) => {

    const {
        admin,
        product,
        uname
    } = data;
    const str = `<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {
            text-decoration: underline !important;
        }
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style=" max-width:670px;
                  margin:20px auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">


                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">

                                <tr>
                                    <td style="text-align:center;background:#fff">
                                        <br />
                                        <a href="https://github.com/codewithamitpatil" title="logo" target="_blank">
                                            <img width="260"
                                                src="https://raw.githubusercontent.com/codewithamitpatil/Api-Bucket-1.0/main/public/logo.png"
                                                title="logo" alt="logo">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1
                                            style="color:#1e1e2d61;; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                            Welcome To ${ product }</h1>

                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <h4 style="font-size: 17px;text-align: left;color:#1e1e2d61;">
                                            Hi,&nbsp;&nbsp;${ uname }</h4>

                                        <p style="font-size: 17px;text-align: left;color:#1e1e2d61;;">
                                            I???m ${ admin }, the founder of ${ product } and I???d like to personally thank
                                            you for signing up to our service.
                                        </p>

                                        <p style="font-size: 17px;text-align: left;color:#1e1e2d61;;">

                                            I???d love to hear what you think of ${ product } and if there is anything we
                                            can improve. If you have any questions,
                                            please reply to this email. I???m always happy to help!
                                        </p>
                                        <p style="text-align: left;color:#1e1e2d61;;">


                                        </p>

                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                        <p style=" font-size:16px;
                             color:#1e1e2d8f; line-height:18px;
                            margin:0 0 0;">
                                            &copy;
                                            <a style="text-decoration: none;"
                                                href="https://github.com/codewithamitpatil">
                                                <strong style="text-decoration: none;
                                        color:rgba(69, 80, 86, 0.7411764705882353);">Code
                                                    With Amit Patil</strong>
                                                </>
                                        </p>
                                        <br /> <br />
                                    </td>
                                </tr>


                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`;
    return str;
}

module.exports = welcomeTemp;