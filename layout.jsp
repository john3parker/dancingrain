<%@ page trimDirectiveWhitespaces="true"%> 
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<c:set var="unitSubscription" value="${currentUserContext.unitSubscription}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://gmpg.org/xfn/11">
	<title>Money Man</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<meta http-equiv="Pragma" content="no-cache"/>
	<meta http-equiv="Expires" content="-1"/>
	<meta http-equiv="X-UA-Compatible" content="IE=9" />
	<meta name="robots" content="follow, all"/>
	<meta name="language" content="en"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link rel="apple-touch-icon" href="${pageContext.request.contextPath}/images/apple-icon.png"/>
	<link rel="shortcut icon" href="${pageContext.request.contextPath}/favicon.ico"/>

	<!-- JQUERY and JSGRID -->
	<link type="text/css" rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
	<link type="text/css" rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
	<script src="//code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
	
	<!-- Bootstrap and Popper (required for dropdown menus in buttons) -->
	<link type="text/css" rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
	<script src="//unpkg.com/popper.js"></script>
	<script src="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/lscache/1.3.0/lscache.min.js"></script>

	<!-- JQuery UI CSS -->
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"/>
	 
	<!-- ChartJS -->
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css"/>

	<!-- JS COOKIE -->
	<script src="//cdn.jsdelivr.net/npm/js-cookie@beta/dist/js.cookie.min.js"></script>
	
	<!-- JQ GRID -->
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/js/lib/jqgrid/1.5.3/ui.jqgrid-bootstrap4.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/lib/jqgrid/1.5.3/grid.locale-en.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/lib/jqgrid/1.5.3/jquery.jqGrid.min.js"></script>
	
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.21/b-1.6.2/b-html5-1.6.2/fc-3.3.1/fh-3.1.7/kt-2.5.2/r-2.2.5/rg-1.1.2/datatables.min.css"/>
 	<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.21/b-1.6.2/b-html5-1.6.2/fc-3.3.1/fh-3.1.7/kt-2.5.2/r-2.2.5/rg-1.1.2/datatables.min.js"></script>

	<!--  MONEY CHART -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/bm/MoneyTable.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/bm/MoneyChart.js"></script>
	
	<!-- OPEN ICONIC -->
	<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css"/>
	
<shiro:authenticated>
	<script>
		lscache.set('attempts',0); // successful login @see login.jsp
	</script>
</shiro:authenticated>	

</head>
<body class="bg-main-body">
	<div class="container-fluid">
		<tiles:insertAttribute name="body" />
		<div>
			<tiles:insertAttribute name="footer" />
		</div>
	</div>	
</body>
</html>